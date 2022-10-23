import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';
import { v4 as uuid } from 'uuid';
const bcrypt = require('bcrypt');

import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

export class SigninData extends PartialType(CreateUserDto) {}

export class UserData extends PartialType(User) {}

const createDBUserData = async (data: CreateUserDto) => {
  const res = { ...data, id: uuid() };
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  res.password = hashedPassword;

  return res;
};

export const validateUserPassword = async (user: User, password: string): Promise<boolean> => {
  const result: boolean = await bcrypt.compare(password, user.password);

  return result;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

  public async create(data: CreateUserDto): Promise<User> {
    const createUserData = await createDBUserData(data);
    const newUser: UserDocument = new this.UserModel(createUserData);

    await newUser.save();

    return newUser.toObject() as User;
  }

  public async getUsers(): Promise<User[]> {
    const users: User[] = await this.UserModel.find({});

    return users;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const target: UserDocument = await this.UserModel.findOne({ email });

    return target.toObject() as User || null;
  }
}

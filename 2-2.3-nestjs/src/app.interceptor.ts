import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import { BookDocument } from './books/schemas/book.schema'
import { Observable, map, catchError, throwError } from 'rxjs';

interface Result {
  status: string;
  data: string | BookDocument;
}

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  constructor() {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<Result | never> {
    return next
      .handle()
      .pipe(
        map((data) => {
          return {
            status: 'success',
            data,
          };
        }),
        catchError((err) => {
          return throwError(() => new HttpException({ status: 'fail', data: err.message }, HttpStatus.INTERNAL_SERVER_ERROR));
        }),
      );
  }
}

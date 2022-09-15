import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        code: status,
        timestamp: new Date().toISOString(),
        data: exception.getResponse(),
        status: 'fail',
      });
  }
}
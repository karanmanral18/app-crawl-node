import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { EmptyResultError } from 'sequelize';

@Injectable()
export class SequelizeToNotFoundInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (
          err instanceof EmptyResultError ||
          err.name === 'SequelizeEmptyResultError'
        ) {
          return throwError(() => new NotFoundException());
        }

        return throwError(() => err);
      }),
    );
  }
}

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import isArray from 'lodash-es/isArray';
import {CustomSnackbarService} from '../service/custom-snackbar.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    public snackbarService: CustomSnackbarService,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        let status = 0;
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.message}`;
        } else {
          // server-side error
          status = error.status;
          if (status === 500) {
            errorMessage = 'ERROR SYSTEM';
          } else {
            if (isArray(error)) {
              errorMessage = error[0].message;
            } else {
              errorMessage = error.message;
            }
          }

        }
        this.snackbarService.warning(errorMessage, status);
        return throwError(errorMessage);
      })
    );
  }
}

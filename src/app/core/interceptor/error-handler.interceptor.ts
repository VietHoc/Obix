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


import {Router} from '@angular/router';

import isArray from 'lodash-es/isArray';
import {CustomSnackbarService} from '../service/custom-snackbar.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    public snackbarService: CustomSnackbarService,
    private router: Router,
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
        let codeError = 0;
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {


          // server-side error
          status = error.status;
          if (status === 500) {
            errorMessage = 'ERROR SYSTEM';
          } else {
            if (isArray(error.error.errors)) {
              codeError = error.error.errors[0].code;
              errorMessage = error.error.errors[0].message;
            } else {
              codeError = error.error.errors.code;
              errorMessage = error.error.errors.message;
            }
          }
          this.handleCodeError(codeError);

        }
        this.snackbarService.warning(errorMessage, status);
        return throwError(errorMessage);
      })
    );
  }

  handleCodeError(codeError: number) {
    switch (codeError) {
      default:
        break;
    }
  }

  private redirectToLogin() {
  }

  private redirectToLoginCompany() {
  }
}

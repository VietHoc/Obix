import { SnackBarComponent } from './../../shared/components/snack-bar/snack-bar.component';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  autoHide = 3000;

  constructor(public snackbar: MatSnackBar) {}

  public openSnackBar(status, message: string, classSnack: string) {
    this.snackbar.openFromComponent(SnackBarComponent, {
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
      duration: this.autoHide,
      panelClass: [classSnack],
      data: {
        status,
        message
      }
    });
  }

  public success(message: string) {
    this.openSnackBar('200', message, 'green-snackbar');
  }

  public warning(message: string, status: string | number = '400') {
    this.openSnackBar(status, message, 'red-snackbar');
  }
}

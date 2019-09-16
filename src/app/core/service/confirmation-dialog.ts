import { MatDialog } from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../shared/components/comfirmation-dialog/confirmation-dialog.component';
import {STYLE} from '../../constant/style';

export class ConfirmationDialog {
  static show(dialog: MatDialog, message: string, title: string = 'Thông báo',
              width = STYLE.WIDTH_DIALOG_DELETE) {
    const dialogRef = dialog.open(ConfirmationDialogComponent, {
      data: {
        title,
        message,
      },
      width,
    });

    return dialogRef.afterClosed();
  }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TableAutomateRoomComponent} from './components/table-automate-room/table-automate-room.component';
import {MatCardModule, MatDatepickerModule} from '@angular/material';
import {InputFieldComponent} from './components/input-field/input-field.component';
import {ErrorLabelComponent} from './components/error-label/error-label.component';
import {ErrorMessagesPipe} from './pipes/error-messages.pipe';
import { ShowStringMaxLenPipe } from './pipes/show-string-max-len.pipe';

@NgModule({
  declarations: [
    SnackBarComponent,
    ConfirmationDialogComponent,
    TableAutomateRoomComponent,
    InputFieldComponent,
    ErrorLabelComponent,
    ErrorMessagesPipe,
    ShowStringMaxLenPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    TableAutomateRoomComponent,
    InputFieldComponent,
    ShowStringMaxLenPipe,
  ],
  entryComponents: [
    SnackBarComponent,
    ConfirmationDialogComponent
  ]
})
export class SharedModule {
}

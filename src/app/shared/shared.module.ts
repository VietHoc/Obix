import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material/material.module';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {ConfirmationDialogComponent} from './components/comfirmation-dialog/confirmation-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import { TableAutomateRoomComponent } from './components/table-automate-room/table-automate-room.component';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    SnackBarComponent,
    ConfirmationDialogComponent,
    TableAutomateRoomComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    TableAutomateRoomComponent
  ],
  entryComponents: [
    SnackBarComponent,
    ConfirmationDialogComponent
  ],
})
export class SharedModule { }

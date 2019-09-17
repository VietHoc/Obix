import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material/material.module';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {ConfirmationDialogComponent} from './components/comfirmation-dialog/confirmation-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SnackBarComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SnackBarComponent,
    ConfirmationDialogComponent
  ],
})
export class SharedModule { }

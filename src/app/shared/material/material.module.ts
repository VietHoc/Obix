import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule, MatSidenavModule,
  MatSnackBarModule,
  MatSortModule, MatTableModule, MatToolbarModule, ShowOnDirtyErrorStateMatcher
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    // Material
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class MaterialModule { }

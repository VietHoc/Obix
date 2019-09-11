import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-automate-dialog',
  templateUrl: './automate-dialog.component.html',
  styleUrls: ['./automate-dialog.component.scss']
})
export class AutomateDialogComponent implements OnInit {
  formServer: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AutomateDialogComponent>,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formServer = this.formBuilder.group({
      name: [''],
      ip: [''],
      uri: [''],
      active: [true]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


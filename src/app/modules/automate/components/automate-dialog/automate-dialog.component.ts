import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Automate} from '../../../../shared/models/Automate';

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
    @Inject(MAT_DIALOG_DATA) public automate: Automate
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formServer = this.formBuilder.group({
      name: [this.automate.name],
      ip: [this.automate.ip],
      uri: [this.automate.uri],
      active: [this.automate.active]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


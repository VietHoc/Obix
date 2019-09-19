import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Automate} from '../../../../shared/models/automate';
import {CustomValidators} from '../../../../shared/validators/custom-validators';

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
      id: [this.automate.id],
      name: [this.automate.name, [Validators.required, Validators.maxLength(50)]],
      ip: [this.automate.ip, [Validators.required, CustomValidators.ip, Validators.maxLength(50)]],
      uri: [this.automate.uri, [Validators.required, Validators.maxLength(50)]],
      floor: [this.automate.floor, [Validators.required, Validators.max(50)]],
      active: [this.automate.active, [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


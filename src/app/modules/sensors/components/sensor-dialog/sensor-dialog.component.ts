import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AutomateDialogComponent} from '../../../automates/components/automate-dialog/automate-dialog.component';
import {Sensor} from '../../../../shared/models/sensor';

@Component({
  selector: 'app-sensor-dialog',
  templateUrl: './sensor-dialog.component.html',
  styleUrls: ['./sensor-dialog.component.scss']
})
export class SensorDialogComponent implements OnInit {
  formSensor: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AutomateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sensor: Sensor
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formSensor = this.formBuilder.group({
      id: [this.sensor.id],
      automateId: [this.sensor.automateId],
      sensorTypeId: [this.sensor.sensorTypeId],
      uri: [this.sensor.uri],
      name: [this.sensor.name],
      locationName: [this.sensor.locationName],
      locationIdentifier: [this.sensor.locationIdentifier, [Validators.required, Validators.maxLength(50)]],
      isActive: [this.sensor.isActive, [Validators.required]],
      creationDate: [this.sensor.creationDate],
      modificationDate: [this.sensor.modificationDate],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

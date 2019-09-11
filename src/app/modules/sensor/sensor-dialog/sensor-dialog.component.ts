import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AutomateDialogComponent} from '../../automate/components/automate-dialog/automate-dialog.component';
import {Sensor} from '../../../shared/models/Sensor';

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
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formSensor = this.formBuilder.group({
      automateId: [this.sensor.automateId],
      sensortypeId: [this.sensor.sensortypeId],
      uri: [this.sensor.uri],
      name: [this.sensor.name],
      locationName: [this.sensor.locationName],
      locationIdentifier: [this.sensor.locationIdentifier],
      status: [this.sensor.status],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

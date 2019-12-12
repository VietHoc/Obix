import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AutomateDetail} from '../../models/automate';
import { Sensor } from '../../models/sensor';
import { Router, ActivatedRoute } from '@angular/router';
import { SensorData } from '../../models/sensor-data';

@Component({
  selector: 'app-table-automate-room',
  templateUrl: './table-automate-room.component.html',
  styleUrls: ['./table-automate-room.component.scss']
})
export class TableAutomateRoomComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value'];
  dataSource = new MatTableDataSource();
  isOpen = true;

  @Input() automateDetail: AutomateDetail;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.dataSource.data = this.automateDetail.sensorsData;
  }

  redirectToSensorChart(sensor: SensorData) {
    // tslint:disable-next-line: max-line-length
    this.router.navigate([`/sensors/${sensor.sensorId}/charts`], {relativeTo: this.route, queryParams: {sensorName: sensor.name, sensorTypeName: sensor.sensorTypeName}}).then(_ => {
    });
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {SensorService} from '../../core/http/sensor.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {Sensor} from '../../shared/models/Sensor';
import {SensorDialogComponent} from './sensor-dialog/sensor-dialog.component';
import {remove, assign} from 'lodash-es';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  sensors: Sensor[];
  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'automateId', 'sensortypeId', 'uri', 'sensorName', 'locationName', 'locationIdentifier', 'status', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private sensorHttp: SensorService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getListSensor();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getListSensor() {
      console.log(this.paginator);
      this.sensorHttp.getListSensors().subscribe(res => {
          this.sensors = res;
          this.setDataTable();
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSensor(id: number) {
    this.sensorHttp.deleteSensor(id).subscribe(_ => {
      remove(this.sensors, item  => item.id === id);
      this.setDataTable();
    });
  }


  openDialogUpdateSensor(sensor: Sensor) {
    const dialogRef = this.dialog.open(SensorDialogComponent, {
      width: '500px',
      data: sensor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateSensor(sensor.id, result);
      } else {
        console.log('Cancel');
      }
    });
  }

  public changeStatusSensor(sensor: Sensor, status: number) {
    sensor.status = status
    this.sensorHttp.updateSensor(sensor.id, sensor).subscribe(res => {
        assign(this.sensors.find(item => item.id === sensor.id), res);
        this.setDataTable();
      });
  }

  private updateSensor(id: number, sensor: Sensor) {
      this.sensorHttp.updateSensor(id, sensor).subscribe(res => {
        assign(this.sensors.find(item => item.id === id), res);
        this.setDataTable();
      });
  }

  private setDataTable() {
      this.dataSource.data = this.sensors;
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {SensorService} from '../../core/http/sensor.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Sensor} from '../../shared/models/Sensor';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'automateId', 'sensortypeId', 'uri', 'sensorName', 'locationName', 'locationIdentifier', 'status'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private sensorHttp: SensorService
  ) { }

  ngOnInit() {
    this.getListSensor();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getListSensor() {
      this.sensorHttp.getListSensors().subscribe(res => {
          this.dataSource.data = res;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

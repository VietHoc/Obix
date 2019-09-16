import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SensorService} from '../../core/http/sensor.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Sensor} from '../../shared/models/sensor';
import {SensorDialogComponent} from './sensor-dialog/sensor-dialog.component';
import {remove, assign} from 'lodash-es';
import {BehaviorSubject, merge, of as observableOf} from 'rxjs';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {STYLE} from '../../constant/style';
import {ConfirmationDialog} from '../../core/service/confirmation-dialog';
import {DIALOG} from '../../constant/string';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit, AfterViewInit {
  sensors: Sensor[];
  displayedColumns: string[] = ['id', 'automateId', 'sensortypeId', 'uri', 'name', 'locationName', 'locationIdentifier', 'status', 'action'];
  dataSource = new MatTableDataSource();
  searchChange$ = new BehaviorSubject<string>('');

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private sensorHttp: SensorService,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.searchChange$)
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.sensorHttp.getListSensors(
                this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.searchChange$.getValue());
        }),

        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.sensors = data as Sensor[]);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.searchChange$.next(filterValue);
  }

  deleteSensor(sensor: Sensor) {
     ConfirmationDialog.show(this.dialog, `${DIALOG.MESSAGE_DELETE} ${sensor.name}?` , DIALOG.TITLE_DELETE_SENSOR)
      .subscribe(result => {
        if (result) {
          this.sensorHttp.deleteSensor(sensor.id).subscribe(_ => {
            remove(this.sensors, item => item.id === sensor.id);
            this.setDataTable();
           });
        }
      });
  }

  openDialogUpdateSensor(sensor: Sensor) {
    const dialogRef = this.dialog.open(SensorDialogComponent, {
      width: STYLE.WIDTH_DIALOG_UPDATE,
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

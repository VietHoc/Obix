import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {SensorDataService} from '../../../../core/http/sensor-data.service';

@Component({
  selector: 'app-sensor-chart',
  templateUrl: './sensor-chart.component.html',
  styleUrls: ['./sensor-chart.component.scss']
})
export class SensorChartComponent implements OnInit {
  currentSensorId: number;
  sensorName: string;
  formDate: FormGroup;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Number';
  multi: any[];
  autoScale = true;
  legendTitle = 'Sensor Name';
  xScaleMin = 50;
  roundDomains = true;

  colorScheme = {
    domain: ['#5AA454']
  };

  timeZoom = [
    {
      name: '1d',
      value: 1
    },
     {
      name: '7d',
      value: 7
    },
     {
      name: '1y',
      value: 365
    },
     {
      name: 'All',
      value: 10000
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sensorDataHttp: SensorDataService,
  ) {
  }

  ngOnInit() {
    this.currentSensorId = this.route.snapshot.params.sensor_id;
    this.sensorName = this.route.snapshot.queryParamMap.get('sensorName');
    this.buildForm();
    this.dateZoomChange(null);
  }

  buildForm() {
    this.formDate = this.formBuilder.group({
      start: [''],
      end: ['']
    });
  }

  dateZoomChange($event) {
    this.formDate.value.start = this.formDate.value.start !== '' ? this.formDate.value.start.format('DD/MM/YYYY HH:mm:ss') : '';
    this.formDate.value.end = this.formDate.value.end !== '' ? this.formDate.value.end.format('DD/MM/YYYY HH:mm:ss') : '';
    this.getHistoryOfSensorByTime(this.currentSensorId, this.formDate.value);
  }

  private getHistoryOfSensorByTime(sensorId: number, time) {
    this.sensorDataHttp.getHistoryOfSensorByTime(sensorId, time).subscribe(res => {
      const data = [
        {
          name: this.sensorName,
          series: res
        }
      ];
      this.multi = [...data];
    });
  }

  formatPercent(val) {
    return moment(val).format('llll');
  }

  changeDateZoom(time) {
    const end = moment();
    const start = moment(end).subtract(time.value, 'days');
    this.formDate.patchValue({
      start,
      end
      });
    this.dateZoomChange(null);
  }
}

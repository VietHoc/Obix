import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {SensorDataService} from '../../../../core/http/sensor-data.service';
import * as Highcharts from 'highcharts';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-sensor-chart',
  templateUrl: './sensor-chart.component.html',
  styleUrls: ['./sensor-chart.component.scss']
})
export class SensorChartComponent implements OnInit {
  currentSensorId: number;
  sensorName: string;
  formDate: FormGroup;
  isLoadingResults = true;
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
  ];

  public options: any = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'History data chart'
    },
    // subtitle: {
    //   text: 'Using the Boost module'
    // },
    tooltip: {
      valueDecimals: 2
    },
    xAxis: {
      type: 'datetime'
    },
    series: [
      {
        name: '',
        lineWidth: 0.5,
        data: []
      },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sensorDataHttp: SensorDataService,
  ) {
  }

  ngOnInit() {
    this.currentSensorId = this.route.snapshot.params.sensor_id;
    this.sensorName = this.options.series[0].name = this.route.snapshot.queryParamMap.get('sensorName');
    this.buildForm();
    // get timeZoom All
    this.changeDateZoom(this.timeZoom[this.timeZoom.length - 1]);
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
    this.isLoadingResults = true;
    this.sensorDataHttp.getHistoryOfSensorByTime(sensorId, time).subscribe(data => {
      const updatedNormalData = [];
      data.forEach(res => {
        const term = [
          new Date(res.name).getTime(),
          res.value
        ];
        updatedNormalData.push(term);
      });
      this.options.series[0].data = updatedNormalData;
      this.isLoadingResults = false;
      Highcharts.chart('container', this.options);
    });
  }

  formatXAxis(val) {
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

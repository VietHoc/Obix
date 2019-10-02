import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {SensorDataService} from '../../../../core/http/sensor-data.service';
import {StockChart} from 'angular-highcharts';

@Component({
  selector: 'app-sensor-chart',
  templateUrl: './sensor-chart.component.html',
  styleUrls: ['./sensor-chart.component.scss']
})
export class SensorChartComponent implements OnInit {
  currentSensorId: number;
  sensorName;
  sensorTypeName: string;
  isLoadingResults = true;
  stockChart: StockChart;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sensorDataHttp: SensorDataService,
  ) {
  }

  ngOnInit() {
    this.currentSensorId = this.route.snapshot.params.sensor_id;
    this.sensorName = this.route.snapshot.queryParamMap.get('sensorName');
    this.sensorTypeName = this.route.snapshot.queryParamMap.get('sensorTypeName');
    this.getHistoryOfSensorByTime(this.currentSensorId);
  }

  private getHistoryOfSensorByTime(sensorId: number) {
    this.isLoadingResults = true;
    this.sensorDataHttp.getHistoryOfSensorByTime(sensorId).subscribe(data => {
      const fomartSensorHistoryData = [];
      data.forEach(res => {
        fomartSensorHistoryData.push([
          new Date(res.name).getTime(),
          res.value
        ]);
      });
      let seriesName = '';
      let seriesValueSuffix = '';
      switch (this.sensorTypeName) {
        case 'TEMPERATURE':
          seriesName = 'Temperature',
            seriesValueSuffix = '°C';
          break;
        case 'CO2':
          seriesName = 'CO2',
            seriesValueSuffix = 'ppm';
          break;
        case 'HUMIDITY':
          seriesName = 'Humidity',
            seriesValueSuffix = 'gm Water/gm ol Dry Air';
          break;
        default:
          seriesName = 'Value',
            seriesValueSuffix = '';
          break;
      }
      this.stockChart = new StockChart({
        chart: {
          height: 600,
          zoomType: 'x',
          type: 'scatter',
        },

        rangeSelector: {
          buttons: [{
            type: 'day',
            count: 3,
            text: '3d'
          }, {
            type: 'week',
            count: 1,
            text: '1w'
          }, {
            type: 'month',
            count: 1,
            text: '1m'
          }, {
            type: 'month',
            count: 3,
            text: '3m'
          }, {
            type: 'year',
            count: 1,
            text: '1y'
          }, {
            type: 'all',
            text: 'All'
          }],
          selected: 1
        },

        title: {
          text: `Line chart of sensor ${this.sensorName}`
        },

        credits: {
          enabled: false
        },

        series: [
          {
            name: seriesName,
            data: fomartSensorHistoryData,
            type: 'spline',
            tooltip: {
              valueDecimals: 2,
              valueSuffix: seriesValueSuffix
            }
          }
        ]
      });
      this.isLoadingResults = false;
    });
  }
}

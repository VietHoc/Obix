import { ValueLineChart } from './../../../../shared/models/value-line-chart';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorDataService } from '../../../../core/http/sensor-data.service';
import { StockChart } from 'angular-highcharts';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sensor-chart',
  templateUrl: './sensor-chart.component.html',
  styleUrls: ['./sensor-chart.component.scss']
})
export class SensorChartComponent implements OnInit {
  currentSensorId: number;
  sensorName;
  sensorTypeName: string;
  isLoadingResults = false;
  stockChart: StockChart;
  formatSensorHistoryData = [];
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  constructor(
    private route: ActivatedRoute,
    private sensorDataHttp: SensorDataService,
  ) {
  }

  ngOnInit() {
    this.currentSensorId = this.route.snapshot.params.sensor_id;
    this.sensorName = this.route.snapshot.queryParamMap.get('sensorName');
    this.sensorTypeName = this.route.snapshot.queryParamMap.get('sensorTypeName');
    this.initChart();
  }

  initChart() {
    let start = new Date();
    start.setDate(start.getDate() - 7);
    this.startDate = new FormControl(start);
    this.changeDate();
  }

  changeDate() {
    this.getHistoryOfSensorByTime(this.currentSensorId, this.startDate.value, this.endDate.value);
  }

  getAllHistories() {
    this.getHistoryOfSensorByTime(this.currentSensorId);
  }

  private getHistoryOfSensorByTime(sensorId: number, startDate?: string, endDate?: string) {
    this.isLoadingResults = true;
    // tslint:disable-next-line: max-line-length
    this.sensorDataHttp.getHistoryOfSensorByTime(sensorId, startDate ? moment(startDate).format('DD/MM/YYYY HH:mm:ss') : '', endDate ? moment(endDate).format('DD/MM/YYYY HH:mm:ss') : '').subscribe(data => {
      this.isLoadingResults = false;
      if (data.length > 0) {
        this.handleDataToRenderChart(data);
      }
    });
  }

  handleDataToRenderChart(data: ValueLineChart[]) {
    this.formatSensorHistoryData = [];
    data.forEach(res => {
      this.formatSensorHistoryData.push([
        new Date(res.valueDate).getTime(),
        res.value
      ]);
    });

    this.renderDataToStockChart(this.formatSensorHistoryData, this.setSeriesNameAndSeriesValueSuffix());
  }

  setSeriesNameAndSeriesValueSuffix() {
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
    return {
      seriesName,
      seriesValueSuffix
    };
  }
  renderDataToStockChart(fomartSensorHistoryData, { seriesName, seriesValueSuffix }) {
    this.stockChart = new StockChart({
      chart: {
        height: 500,
        zoomType: 'x',
        type: 'scatter',
      },

      rangeSelector: {
        enabled: false
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
  }

}

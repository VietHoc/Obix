import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {SensorDataService} from '../../../../core/http/sensor-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sensor-chart',
  templateUrl: './sensor-chart.component.html',
  styleUrls: ['./sensor-chart.component.scss']
})
export class SensorChartComponent implements OnInit {
  currentSensorId: number;
  sensorName;
  sensorTypeName: string;
  options: any;
  formatSensorHistoryData = [];
  isLoadingResults = false;

  constructor(
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sensorDataHttp: SensorDataService,
  ) {
  }

  ngOnInit() {
    this.currentSensorId = this.route.snapshot.params.sensor_id;
    this.sensorName = this.route.snapshot.queryParamMap.get('sensorName');
    this.sensorTypeName = this.route.snapshot.queryParamMap.get('sensorTypeName');
    this.getHistoryOfSensorByTime(moment().subtract(3, 'days').format('DD/MM/YYYY HH:mm:ss'), moment().format('DD/MM/YYYY HH:mm:ss'));
  }

  setupOptionSeriesNameAndSeriesValueSuffix() {
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

  onAfterSetExtremesX(e) {
    this.getHistoryOfSensorByTime(moment(e.context.min).format('DD/MM/YYYY HH:mm:ss'), moment(e.context.max).format('DD/MM/YYYY HH:mm:ss'));
  }

  getHistoryOfSensorByTime(start, end) {
    console.log(moment(start).format('DD/MM/YYYY HH:mm:ss'));
    this.isLoadingResults = true;
    this.ngZone.run(() => {
      this.sensorDataHttp.getHistoryOfSensorByTime(this.currentSensorId, start, end).subscribe(data => {
        this.isLoadingResults = false;
        data.forEach(res => {
          this.formatSensorHistoryData.push([
            new Date(res.valueDate).getTime(),
            res.value
          ]);
        });
        this.setupOptionChart(this.formatSensorHistoryData, this.setupOptionSeriesNameAndSeriesValueSuffix());
      });
    });
  }

  setupOptionChart(fomartSensorHistoryData, {seriesName, seriesValueSuffix}) {
    this.options = {
    chart: {
      height: 600,
      zoomType: 'x',
      type: 'candlestick',
    },

    navigator: {
      adaptToUpdatedData: false,
      series: {
        data: []
      }
    },

    scrollbar: {
      liveRedraw: false
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
      // selected: 6
    },

    title: {
      text: `Line chart of sensor ${this.sensorName}`
    },

    credits: {
      enabled: false
    },

    yAxis: {
      floor: 0
    },

    series: [
      {
        name: seriesName,
        data: fomartSensorHistoryData,
        type: 'spline',
        tooltip: {
          valueDecimals: 2,
          valueSuffix: seriesValueSuffix
        },
      }
    ]
  };
  }

}

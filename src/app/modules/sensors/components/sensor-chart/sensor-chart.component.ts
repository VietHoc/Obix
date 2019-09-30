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
          series: [
            {
              id: 2267568.0,
              sensorId: 2240.0,
              value: 1105.28,
              name: '2019-09-23T05:29:46.927'
            },
            {
              id: 2267702.0,
              sensorId: 2240.0,
              value: 1102.72,
              name: '2019-09-23T05:30:01.293'
            },
            {
              id: 2267810.0,
              sensorId: 2240.0,
              value: 1105.28,
              name: '2019-09-23T05:30:14.833'
            },
            {
              id: 2268015.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T05:30:41.01'
            },
            {
              id: 2268122.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:30:54.223'
            },
            {
              id: 2268228.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:31:07.233'
            },
            {
              id: 2268551.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T05:31:47.733'
            },
            {
              id: 2268664.0,
              sensorId: 2240.0,
              value: 1105.92,
              name: '2019-09-23T05:32:01.07'
            },
            {
              id: 2268762.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:32:14.097'
            },
            {
              id: 2268961.0,
              sensorId: 2240.0,
              value: 1112.96,
              name: '2019-09-23T05:32:40.227'
            },
            {
              id: 2269054.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T05:32:53.16'
            },
            {
              id: 2269141.0,
              sensorId: 2240.0,
              value: 1105.92,
              name: '2019-09-23T05:33:05.81'
            },
            {
              id: 2269227.0,
              sensorId: 2240.0,
              value: 1105.92,
              name: '2019-09-23T05:33:18.493'
            },
            {
              id: 2269318.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T05:33:31.393'
            },
            {
              id: 2269415.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T05:33:44.343'
            },
            {
              id: 2269520.0,
              sensorId: 2240.0,
              value: 1102.08,
              name: '2019-09-23T05:33:57.477'
            },
            {
              id: 2269621.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:34:10.333'
            },
            {
              id: 2269725.0,
              sensorId: 2240.0,
              value: 1112.96,
              name: '2019-09-23T05:34:23.53'
            },
            {
              id: 2269837.0,
              sensorId: 2240.0,
              value: 1102.08,
              name: '2019-09-23T05:34:36.883'
            },
            {
              id: 2269942.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:34:49.91'
            },
            {
              id: 2270133.0,
              sensorId: 2240.0,
              value: 1112.96,
              name: '2019-09-23T05:35:15.663'
            },
            {
              id: 2270224.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:35:28.643'
            },
            {
              id: 2270322.0,
              sensorId: 2240.0,
              value: 1105.92,
              name: '2019-09-23T05:35:41.593'
            },
            {
              id: 2270501.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:36:07.177'
            },
            {
              id: 2270591.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:36:20.03'
            },
            {
              id: 2270983.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T05:37:12.617'
            },
            {
              id: 2271069.0,
              sensorId: 2240.0,
              value: 1102.08,
              name: '2019-09-23T05:37:25.363'
            },
            {
              id: 2271153.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:37:38'
            },
            {
              id: 2271336.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:38:03.613'
            },
            {
              id: 2271424.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:38:16.423'
            },
            {
              id: 2271624.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:38:42.24'
            },
            {
              id: 2271826.0,
              sensorId: 2240.0,
              value: 1105.92,
              name: '2019-09-23T05:39:08.353'
            },
            {
              id: 2271911.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T05:39:21.147'
            },
            {
              id: 2272015.0,
              sensorId: 2240.0,
              value: 1105.28,
              name: '2019-09-23T05:39:34.267'
            },
            {
              id: 2272113.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:39:47.37'
            },
            {
              id: 2272215.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:40:00.723'
            },
            {
              id: 2272316.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:40:13.843'
            },
            {
              id: 2272391.0,
              sensorId: 2240.0,
              value: 1105.28,
              name: '2019-09-23T05:40:26.493'
            },
            {
              id: 2272505.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T05:40:39.817'
            },
            {
              id: 2272604.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:40:52.907'
            },
            {
              id: 2272703.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:41:05.823'
            },
            {
              id: 2272793.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T05:41:18.753'
            },
            {
              id: 2272890.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:41:31.78'
            },
            {
              id: 2272968.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:41:44.26'
            },
            {
              id: 2273070.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T05:41:57.35'
            },
            {
              id: 2273166.0,
              sensorId: 2240.0,
              value: 1105.28,
              name: '2019-09-23T05:42:10.173'
            },
            {
              id: 2273265.0,
              sensorId: 2240.0,
              value: 1105.28,
              name: '2019-09-23T05:42:23.353'
            },
            {
              id: 2273375.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T05:42:36.457'
            },
            {
              id: 2273456.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:42:49.14'
            },
            {
              id: 2273563.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:43:02.323'
            },
            {
              id: 2273654.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:43:15.147'
            },
            {
              id: 2273740.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:43:28.033'
            },
            {
              id: 2273835.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:43:40.76'
            },
            {
              id: 2273936.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:43:53.927'
            },
            {
              id: 2274034.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:44:06.75'
            },
            {
              id: 2274109.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:44:19.307'
            },
            {
              id: 2274319.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:44:45.89'
            },
            {
              id: 2274597.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:45:24.98'
            },
            {
              id: 2274777.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T05:45:50.72'
            },
            {
              id: 2274876.0,
              sensorId: 2240.0,
              value: 1102.72,
              name: '2019-09-23T05:46:03.683'
            },
            {
              id: 2274975.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:46:16.583'
            },
            {
              id: 2275158.0,
              sensorId: 2240.0,
              value: 1112.96,
              name: '2019-09-23T05:46:42.197'
            },
            {
              id: 2275260.0,
              sensorId: 2240.0,
              value: 1112.96,
              name: '2019-09-23T05:46:55.427'
            },
            {
              id: 2275357.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:47:08.263'
            },
            {
              id: 2275437.0,
              sensorId: 2240.0,
              value: 1104.00,
              name: '2019-09-23T05:47:20.93'
            },
            {
              id: 2275532.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:47:34.003'
            },
            {
              id: 2275642.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T05:47:47.2'
            },
            {
              id: 2275740.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:48:00.163'
            },
            {
              id: 2275832.0,
              sensorId: 2240.0,
              value: 1104.00,
              name: '2019-09-23T05:48:12.983'
            },
            {
              id: 2275930.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:48:26.027'
            },
            {
              id: 2276115.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T05:48:51.61'
            },
            {
              id: 2276198.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:49:04.243'
            },
            {
              id: 2276283.0,
              sensorId: 2240.0,
              value: 1105.92,
              name: '2019-09-23T05:49:16.973'
            },
            {
              id: 2276379.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T05:49:30'
            },
            {
              id: 2276568.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:49:55.803'
            },
            {
              id: 2276666.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:50:08.657'
            },
            {
              id: 2276868.0,
              sensorId: 2240.0,
              value: 1112.96,
              name: '2019-09-23T05:50:34.943'
            },
            {
              id: 2276951.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T05:50:47.623'
            },
            {
              id: 2277127.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T05:51:15.377'
            },
            {
              id: 2277309.0,
              sensorId: 2240.0,
              value: 1105.92,
              name: '2019-09-23T05:51:41.227'
            },
            {
              id: 2277399.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T05:51:54.063'
            },
            {
              id: 2277755.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T05:52:45.217'
            },
            {
              id: 2277850.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:52:58.147'
            },
            {
              id: 2277934.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:53:10.863'
            },
            {
              id: 2278026.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T05:53:23.84'
            },
            {
              id: 2278198.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:53:49.58'
            },
            {
              id: 2278302.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:54:02.73'
            },
            {
              id: 2278395.0,
              sensorId: 2240.0,
              value: 1116.80,
              name: '2019-09-23T05:54:15.697'
            },
            {
              id: 2278491.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T05:54:28.847'
            },
            {
              id: 2278693.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T05:54:55.193'
            },
            {
              id: 2278781.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:55:07.893'
            },
            {
              id: 2278865.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T05:55:20.56'
            },
            {
              id: 2278963.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:55:33.82'
            },
            {
              id: 2279065.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T05:55:46.893'
            },
            {
              id: 2279346.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:56:26.05'
            },
            {
              id: 2279440.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:56:38.827'
            },
            {
              id: 2279528.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:56:51.663'
            },
            {
              id: 2279608.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T05:57:04.457'
            },
            {
              id: 2279692.0,
              sensorId: 2240.0,
              value: 1107.20,
              name: '2019-09-23T05:57:17.217'
            },
            {
              id: 2279784.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T05:57:30.273'
            },
            {
              id: 2279864.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T05:57:42.957'
            },
            {
              id: 2280047.0,
              sensorId: 2240.0,
              value: 1105.28,
              name: '2019-09-23T05:58:08.743'
            },
            {
              id: 2280130.0,
              sensorId: 2240.0,
              value: 1105.28,
              name: '2019-09-23T05:58:21.503'
            },
            {
              id: 2280216.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:58:34.11'
            },
            {
              id: 2280303.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:58:46.87'
            },
            {
              id: 2280393.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T05:58:59.74'
            },
            {
              id: 2280484.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T05:59:12.517'
            },
            {
              id: 2280665.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T05:59:38.257'
            },
            {
              id: 2280763.0,
              sensorId: 2240.0,
              value: 1102.72,
              name: '2019-09-23T05:59:51.267'
            },
            {
              id: 2280854.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T06:00:04.06'
            },
            {
              id: 2280942.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T06:00:17.117'
            },
            {
              id: 2281040.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T06:00:30.25'
            },
            {
              id: 2281121.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T06:00:42.777'
            },
            {
              id: 2281206.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T06:00:55.803'
            },
            {
              id: 2281283.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T06:01:08.41'
            },
            {
              id: 2281537.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T06:01:46.643'
            },
            {
              id: 2281630.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T06:01:59.593'
            },
            {
              id: 2281711.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T06:02:12.383'
            },
            {
              id: 2281801.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T06:02:25.317'
            },
            {
              id: 2281892.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T06:02:38.047'
            },
            {
              id: 2281970.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T06:02:50.59'
            },
            {
              id: 2282061.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T06:03:03.567'
            },
            {
              id: 2282337.0,
              sensorId: 2240.0,
              value: 1121.92,
              name: '2019-09-23T06:03:42.193'
            },
            {
              id: 2282425.0,
              sensorId: 2240.0,
              value: 1112.96,
              name: '2019-09-23T06:03:55.22'
            },
            {
              id: 2282597.0,
              sensorId: 2240.0,
              value: 1112.96,
              name: '2019-09-23T06:04:20.773'
            },
            {
              id: 2282784.0,
              sensorId: 2240.0,
              value: 1112.96,
              name: '2019-09-23T06:04:47.153'
            },
            {
              id: 2282880.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T06:05:00.147'
            },
            {
              id: 2282967.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T06:05:12.83'
            },
            {
              id: 2283061.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T06:05:25.933'
            },
            {
              id: 2283164.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T06:05:39.38'
            },
            {
              id: 2283263.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T06:05:53.11'
            },
            {
              id: 2283436.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T06:06:18.52'
            },
            {
              id: 2283533.0,
              sensorId: 2240.0,
              value: 1118.72,
              name: '2019-09-23T06:06:31.593'
            },
            {
              id: 2283631.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T06:06:44.683'
            },
            {
              id: 2283728.0,
              sensorId: 2240.0,
              value: 1116.80,
              name: '2019-09-23T06:06:57.74'
            },
            {
              id: 2283809.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T06:07:10.343'
            },
            {
              id: 2283889.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T06:07:23.167'
            },
            {
              id: 2283984.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T06:07:36.07'
            },
            {
              id: 2284082.0,
              sensorId: 2240.0,
              value: 1118.72,
              name: '2019-09-23T06:07:48.94'
            },
            {
              id: 2284184.0,
              sensorId: 2240.0,
              value: 1118.72,
              name: '2019-09-23T06:08:02.137'
            },
            {
              id: 2284271.0,
              sensorId: 2240.0,
              value: 1116.80,
              name: '2019-09-23T06:08:14.82'
            },
            {
              id: 2284361.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T06:08:27.627'
            },
            {
              id: 2284458.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T06:08:40.497'
            },
            {
              id: 2284549.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T06:08:53.507'
            },
            {
              id: 2284729.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T06:09:19.06'
            },
            {
              id: 2284831.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T06:09:32.18'
            },
            {
              id: 2284927.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T06:09:45.033'
            },
            {
              id: 2285371.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T06:10:49.773'
            },
            {
              id: 2285456.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T06:11:03.113'
            },
            {
              id: 2285551.0,
              sensorId: 2240.0,
              value: 1118.72,
              name: '2019-09-23T06:11:16.823'
            },
            {
              id: 2285658.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T06:11:30.037'
            },
            {
              id: 2285749.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T06:11:42.847'
            },
            {
              id: 2285847.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T06:11:56.073'
            },
            {
              id: 2285942.0,
              sensorId: 2240.0,
              value: 1107.84,
              name: '2019-09-23T06:12:08.96'
            },
            {
              id: 2286035.0,
              sensorId: 2240.0,
              value: 1105.28,
              name: '2019-09-23T06:12:22.08'
            },
            {
              id: 2286133.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T06:12:35.09'
            },
            {
              id: 2286232.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T06:12:48.49'
            },
            {
              id: 2286415.0,
              sensorId: 2240.0,
              value: 1114.24,
              name: '2019-09-23T06:13:14.353'
            },
            {
              id: 2286618.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T06:13:40.64'
            },
            {
              id: 2286719.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T06:13:53.777'
            },
            {
              id: 2286812.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T06:14:06.583'
            },
            {
              id: 2286902.0,
              sensorId: 2240.0,
              value: 1109.76,
              name: '2019-09-23T06:14:19.5'
            },
            {
              id: 2286991.0,
              sensorId: 2240.0,
              value: 1112.32,
              name: '2019-09-23T06:14:32.463'
            },
            {
              id: 2287189.0,
              sensorId: 2240.0,
              value: 1109.12,
              name: '2019-09-23T06:14:58.75'
            },
            {
              id: 2287288.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T06:15:12.167'
            },
            {
              id: 2287478.0,
              sensorId: 2240.0,
              value: 1118.08,
              name: '2019-09-23T06:15:38.327'
            },
            {
              id: 2287666.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T06:16:04.207'
            },
            {
              id: 2287865.0,
              sensorId: 2240.0,
              value: 1116.16,
              name: '2019-09-23T06:16:30.51'
            },
            {
              id: 2288037.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T06:16:56.093'
            },
            {
              id: 2288221.0,
              sensorId: 2240.0,
              value: 1120.00,
              name: '2019-09-23T06:17:22.083'
            },
            {
              id: 2288321.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T06:17:35.56'
            },
            {
              id: 2288584.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T06:18:14.187'
            },
            {
              id: 2289543.0,
              sensorId: 2240.0,
              value: 1114.88,
              name: '2019-09-23T06:20:24.96'
            },
            {
              id: 2289918.0,
              sensorId: 2240.0,
              value: 1111.04,
              name: '2019-09-23T06:21:17.097'
            },
          ]
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

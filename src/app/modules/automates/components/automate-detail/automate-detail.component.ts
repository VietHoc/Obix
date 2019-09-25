import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AutomateDetail} from '../../../../shared/models/automate';
import {interval, Subscription} from 'rxjs';
import {TIME_CSS_UPDATE_SENSORS_VALUE, TIME_REQUEST_UPDATE_SENSORS_VALUE} from '../../../../constant/string';
import {SensorDataService} from '../../../../core/http/sensor-data.service';
import {SensorType} from '../../../../shared/models/sensor-type';
import {SensorTypeService} from '../../../../core/http/sensor-type.service';
import * as moment from 'moment';
import {SensorData} from '../../../../shared/models/sensor-data';

@Component({
  selector: 'app-automate-detail',
  templateUrl: './automate-detail.component.html',
  styleUrls: ['./automate-detail.component.scss']
})
export class AutomateDetailComponent implements OnInit, OnDestroy {
  currentAutomateId: number;
  automateName: string;
  automateDetails;
  automateDetailsSensorData: AutomateDetail[];
  sensorsDetailGroup: AutomateDetail[][] = [];
  sensorTypes: SensorType[];
  currentSensorTypeIds = [];
  intervalUpdateDataSensor: Subscription;

  constructor(
    private route: ActivatedRoute,
    private sensorDataHttp: SensorDataService,
    private sensorTypeHttp: SensorTypeService,
  ) {
  }

  secondsCounter = interval(TIME_REQUEST_UPDATE_SENSORS_VALUE * 1000);

  ngOnInit() {
    this.currentAutomateId = this.route.snapshot.params.automate_id;
    this.automateName = this.route.snapshot.queryParamMap.get('automateName');
    this.getSensorListOfAutomate(this.currentAutomateId);
    this.intervalUpdateDataSensor = this.secondsCounter.subscribe(_ => {
      const valueDate = moment().subtract(TIME_REQUEST_UPDATE_SENSORS_VALUE, 'seconds').format('DD/MM/YYYY HH:mm:ss');
      this.updateSensorsValue(this.currentAutomateId, valueDate);
    });
    this.getSensorTypes();
  }

  ngOnDestroy(): void {
    this.intervalUpdateDataSensor.unsubscribe();
  }

  private getSensorListOfAutomate(automateId: number) {
    this.sensorDataHttp.detailAutomate(automateId).subscribe(res => {
      this.automateDetails = res;
      this.automateDetailsSensorData = res;
      this.groupSensorDetail();
    });
  }

  private getSensorTypes() {
    this.sensorTypeHttp.getAllSensorType().subscribe(res => {
      this.sensorTypes = res;
    });
  }

  private updateSensorsValue(automateId: number, valueDate: any) {
    this.sensorDataHttp.updateDetailAutomate(automateId, valueDate).subscribe(res => {
      if (res !== null && res.length > 0) {
        this.updateAutomateDetails(res);
      }
    });
  }

  private updateAutomateDetails(newDetail: SensorData[]) {
    this.automateDetails.map(room => {
      room.sensorsData.map(sensorData => {
        const termNewSensorData = newDetail.find(res => res.id === sensorData.id);
        if (termNewSensorData != null) {
          sensorData.value = termNewSensorData.value;
          sensorData.isUpdate = true;
        }
      });
    });
    this.automateDetailsSensorData = [...this.automateDetails];
    this.filterSensorsByType(this.currentSensorTypeIds);
    setTimeout(() => {
      this.automateDetailsSensorData.map(room => {
        room.sensorsData.map(sensorData => {
          sensorData.isUpdate = false;
        });
      });
    }, TIME_CSS_UPDATE_SENSORS_VALUE);
  }

  groupSensorDetail() {
    this.sensorsDetailGroup = [];
    const termAutomateDetail = JSON.parse(JSON.stringify(this.automateDetailsSensorData)) as AutomateDetail[];
    termAutomateDetail.sort((a, b) => b.sensorsData.length - a.sensorsData.length);
    const lengthSensorDetails = termAutomateDetail.length;
    console.log(termAutomateDetail);
    const maxElementColumn = lengthSensorDetails / 4;
    console.log(maxElementColumn);
    for (let i = 0; i < 4; i++) {
      this.sensorsDetailGroup.push(termAutomateDetail.slice((i * maxElementColumn), (i + 1) * maxElementColumn));
    }

    // let heightMin = 0;
    // this.sensorsDetailGroup[3].forEach(room => {
    //   if (room.sensorsData.length < 6) {
    //     heightMin += 1;
    //   }
    // });
    // console.log(heightMin);
    // if (heightMin > 2 && heightMin < 5) {
    // for (let i = 0; i < 3; i++) {
    //   this.sensorsDetailGroup[3].push(this.sensorsDetailGroup[i].slice(-1).pop());
    //   this.sensorsDetailGroup[i].splice(-1, 1);
    // }
    // }
    console.log(this.sensorsDetailGroup);
  }

  filterSensorsByType(sensorTypeIds: number[]) {
    this.currentSensorTypeIds = sensorTypeIds;
    let termAutomateDetail = JSON.parse(JSON.stringify(this.automateDetails)) as AutomateDetail[];
    termAutomateDetail = termAutomateDetail.map(element => {
      return Object.assign(element, {
        sensorsData: element.sensorsData.filter(res =>  sensorTypeIds.indexOf(res.sensortypeId) !== -1)
      });
    });

    termAutomateDetail = termAutomateDetail.filter(room => {
      return room.sensorsData.length > 0;
    })

    this.automateDetailsSensorData = termAutomateDetail;

    if (sensorTypeIds.length === 0) {
      this.automateDetailsSensorData = this.automateDetails;
    }

    this.groupSensorDetail();
  }

  getHeightMax(): string {
    let maxLength = 0;
    if (this.automateDetailsSensorData === undefined ) {
      return '300px';
    }
    this.automateDetailsSensorData.forEach(room => {
      if (room.sensorsData.length > maxLength) {
        maxLength = room.sensorsData.length;
      }
    });
    let maxHeight = 30 * maxLength + 50;
    maxHeight = maxHeight > 300 ? 300 : maxHeight;
    return `${maxHeight}px`;
  }
}

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
  automateDetails; automateDetailsSensorData: AutomateDetail[];
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
      this.automateDetails = this.automateDetailsSensorData = res;
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

  private updateAutomateDetails(newSensorDetails: SensorData[]) {
    this.automateDetails.forEach(room => {
      room.sensorsData.forEach(sensorData => {
        const termNewSensorData = newSensorDetails.find(newSensorDetail => newSensorDetail.id === sensorData.id);
        if (termNewSensorData != null && sensorData.value !== termNewSensorData.value) {
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

  filterSensorsByType(sensorTypeIds: number[]) {
    this.currentSensorTypeIds = sensorTypeIds;
    let termAutomateDetail = JSON.parse(JSON.stringify(this.automateDetails)) as AutomateDetail[];
    termAutomateDetail.forEach(room => {
       room.sensorsData = room.sensorsData.filter(sensorData =>  sensorTypeIds.indexOf(sensorData.sensortypeId) !== -1);
    });
    termAutomateDetail = termAutomateDetail.filter(room => room.sensorsData.length > 0);

    this.automateDetailsSensorData = [...termAutomateDetail];
    if (sensorTypeIds.length === 0) {
      this.automateDetailsSensorData = [...this.automateDetails];
    }
  }
}

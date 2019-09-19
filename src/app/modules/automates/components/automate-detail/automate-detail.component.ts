import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AutomateDetail} from '../../../../shared/models/automate';
import {interval} from 'rxjs';
import {assign} from 'lodash-es';
import {TIME_REQUEST_UPDATE_SENSORS_VALUE} from '../../../../constant/string';
import {SensorDataService} from '../../../../core/http/sensor-data.service';
import {SensorType} from '../../../../shared/models/sensor-type';
import {SensorTypeService} from '../../../../core/http/sensor-type.service';
import * as moment from 'moment';

@Component({
  selector: 'app-automate-detail',
  templateUrl: './automate-detail.component.html',
  styleUrls: ['./automate-detail.component.scss']
})
export class AutomateDetailComponent implements OnInit {
  currentAutomateId: number;
  automateName: string;
  automateDetails; automateDetailsSensorData: AutomateDetail[];
  sensorTypes: SensorType[];
  currentSensorTypeId = 0;
  constructor(
    private route: ActivatedRoute,
    private sensorDataHttp: SensorDataService,
    private sensorTypeHttp: SensorTypeService,
  ) {}

  secondsCounter = interval(TIME_REQUEST_UPDATE_SENSORS_VALUE * 1000);

  ngOnInit() {
    this.currentAutomateId = this.route.snapshot.params.automate_id;
    this.automateName = this.route.snapshot.queryParamMap.get('automateName');
    this.getSensorListOfAutomate(this.currentAutomateId);
    this.secondsCounter.subscribe(_ => {
      const valueDate = moment().subtract(TIME_REQUEST_UPDATE_SENSORS_VALUE, 'seconds').format('DD-MM-YYYY hh:mm:ss');
      this.updateSensorsValue(this.currentAutomateId, valueDate);
    });
    this.getSensorTypes();
  }

  private getSensorListOfAutomate(automateId: number) {
    this.sensorDataHttp.detailAutomate(automateId).subscribe(res => {
        this.automateDetails = res;
        this.automateDetailsSensorData = res;
    });
  }

  private getSensorTypes() {
    this.sensorTypeHttp.getAllSensorType().subscribe(res => {
      this.sensorTypes = res;
    });
  }

  private updateSensorsValue(automateId: number, valueDate: any) {
    this.sensorDataHttp.updateDetailAutomate(automateId, valueDate).subscribe(res => {
        if (res.length > 0) {
          this.updateAutomateDetails(res);
        }
    });
  }

  private updateAutomateDetails(newDetail: AutomateDetail[]) {
    this.automateDetails.forEach(element => {
      element.sensorsData.forEach(
        sensorData => {
          newDetail.forEach(
            term => {
              assign(sensorData, term.sensorsData.find(res => res.sensorId === sensorData.sensorId));
            }
          );
        }
      );
    });
  }

  filterSensorsByType(sensorTypeId: number) {
    let termAutomateDetail = JSON.parse(JSON.stringify(this.automateDetails)) as AutomateDetail[];
    termAutomateDetail = termAutomateDetail.map(element => {
        return Object.assign(element, { sensorsData: element.sensorsData.filter(res => res.sensortypeId === sensorTypeId)});
    });
    this.automateDetailsSensorData = termAutomateDetail;
  }
}

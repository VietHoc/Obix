import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AutomateDetail} from '../../../../shared/models/automate';
import {interval} from 'rxjs';
import {assign} from 'lodash-es';
import {TIME_REQUEST_UPDATE_SENSORS_VALUE} from '../../../../constant/string';
import {SensorDataService} from '../../../../core/http/sensor-data.service';

@Component({
  selector: 'app-automate-detail',
  templateUrl: './automate-detail.component.html',
  styleUrls: ['./automate-detail.component.scss']
})
export class AutomateDetailComponent implements OnInit {
  currentAutomateId: number;
  automateDetails: AutomateDetail[];
  constructor(
    private route: ActivatedRoute,
    private sensorDataHttp: SensorDataService,
  ) {}

  secondsCounter = interval(TIME_REQUEST_UPDATE_SENSORS_VALUE);

  ngOnInit() {
    this.currentAutomateId = this.route.snapshot.params.automate_id;
    this.getSensorListOfAutomate(this.currentAutomateId);
    this.secondsCounter.subscribe(_ => {
      this.updateSensorsValue(this.currentAutomateId);
    });
  }

  private getSensorListOfAutomate(automateId: number) {
    this.sensorDataHttp.detailAutomate(automateId).subscribe(res => {
        console.log(res);
        this.automateDetails = res;
    });
  }

  private updateSensorsValue(automateId: number) {
    this.sensorDataHttp.updateDetailAutomate(automateId).subscribe(res => {
        console.log('update: ', res);
        if (res.length > 0) {
          this.updateAutomateDetails(res);
        }
    });
  }

  private updateAutomateDetails(newDetail: AutomateDetail[]) {
    // remove later
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
}

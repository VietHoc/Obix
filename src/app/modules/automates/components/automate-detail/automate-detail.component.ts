import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AutomateService} from '../../../../core/http/automate.service';
import {AutomateDetail} from '../../../../shared/models/automate';
import {interval} from 'rxjs';
import {assign} from 'lodash-es';
import {TIME_REQUEST_UPDATE_SENSORS_VALUE} from '../../../../constant/string';
import {SensorData} from '../../../../shared/models/sensorData';

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
    private automateHttp: AutomateService,
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
    this.automateHttp.detailAutomate(automateId).subscribe(res => {
        console.log(res);
        this.automateDetails = res;
    });
  }

  private updateSensorsValue(automateId: number) {
    this.automateHttp.detailAutomate(automateId).subscribe(res => {
        console.log('update: ', res);
        if (res.length > 0) {
          this.updateAutomateDetails(res);
        }
    });
  }

  private updateAutomateDetails(newDetail: AutomateDetail[]) {
    // remove later
    newDetail[0].sensorsData[0].value = '1111';
    console.log(newDetail);
    this.automateDetails.forEach(element => {
      element.sensorsData.forEach(
        sensorData => {
          newDetail.forEach(
            term => {
              // change name => sensorId
              assign(sensorData, term.sensorsData.find(res => res.name === sensorData.name));
            }
          );
        }
      );
    });
  }
}

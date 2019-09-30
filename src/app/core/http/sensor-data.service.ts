import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {AutomateDetail} from '../../shared/models/automate';
import {map} from 'rxjs/operators';
import {SensorData} from '../../shared/models/sensor-data';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  readonly uri = 'sensor-data';
  constructor(
    private apiService: ApiService,
  ) {}

  detailAutomate(id: number): Observable<AutomateDetail[]> {
    return this.apiService.getList<SensorData>(`${this.uri}/monitor?automateId=${id}`).pipe(
      map(
        res => {
          return this.transform(res, 'locationIdentifier');
        }
      )
    );
  }

  getInterval() {
    return this.apiService.get<number>(`${this.uri}/interval`);
  }

  updateDetailAutomate(id: number): Observable<SensorData[]> {
    return this.apiService.getList<SensorData>(`${this.uri}/updated-monitor?automateId=${id}`);
  }

  private transform(collection: SensorData[], property: string): AutomateDetail[] {
    if (!collection) {
            return null;
    }
    const groupedCollection = collection.reduce((previous, current) => {
            if (!previous[current[property]]) {
                previous[current[property]] = [current];
            } else {
                previous[current[property]].push(current);
            }

            return previous;
        }, {});

    return Object.keys(groupedCollection).map(key => ({ locationIdentifier: key, sensorsData: groupedCollection[key] as SensorData[]}));
  }

  getHistoryOfSensorByTime(sensorId: number, time): Observable<any> {
    return this.apiService.get(`${this.uri}/histories/${sensorId}`, time);
  }
}

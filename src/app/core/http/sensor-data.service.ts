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

  readonly uri = 'sensor-data/monitor';
  constructor(
    private apiService: ApiService,
  ) {}

  detailAutomate(id: number): Observable<AutomateDetail[]> {
    return this.apiService.get(`${this.uri}?automateId=${id}`).pipe(
      map(
        res => {
          return this.transform(res, 'locationIdentifier');
        }
      )
    );
  }

  updateDetailAutomate(id: number, valueDate: any): Observable<AutomateDetail[]> {
    return this.apiService.get(`${this.uri}/update?automateId=${id}&valueDate=${valueDate}`).pipe(
      map(
        res => {
          return this.transform(res, 'locationIdentifier');
        }
      )
    );
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
}

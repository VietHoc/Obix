import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Automate, AutomateDetail} from '../../shared/models/automate';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {SensorData} from '../../shared/models/sensorData';


@Injectable({
  providedIn: 'root'
})
export class AutomateService {
  uri = 'automates';
  constructor(
    private apiService: ApiService,
  ) {}

  getListAutomates(): Observable<Automate[]> {
    return this.apiService.get(this.uri);
  }

  addAutomate(automate: Automate): Observable<Automate> {
    return this.apiService.post(this.uri, automate);
  }

  updateAutomate(id: number, automate: Automate): Observable<Automate> {
    const uriUpdate = this.uri + `/update/${id}`
    return this.apiService.post(uriUpdate, automate);
  }

  deleteAutomate(id: number): Observable<null> {
    const uriDelete = this.uri + `/delete/${id}`
    return this.apiService.post(uriDelete);
  }

  detailAutomate(id: number): Observable<AutomateDetail[]> {
    return this.apiService.get(`${this.uri}/${id}`).pipe(
      map(
        res => {
          return this.transform(res, 'locationName');
        }
      )
    );
  }

  updateDetailAutomate(id: number): Observable<AutomateDetail[]> {
    // change later
    return this.apiService.get(`${this.uri}/${id}`).pipe(
      map(
        res => {
          return this.transform(res, 'locationName');
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

    return Object.keys(groupedCollection).map(key => ({ locationName: key, sensorsData: groupedCollection[key] as SensorData[]}));
  }
}

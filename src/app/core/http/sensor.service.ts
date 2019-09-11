import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Sensor} from '../../shared/models/Sensor';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  uri = 'sensors';
  constructor(
    private apiService: ApiService,
  ) {}

  getListSensors(): Observable<Sensor[]> {
    return this.apiService.get(this.uri);
  }

  updateSensor(id: number, sensor: Sensor): Observable<Sensor> {
    const uriUpdate = this.uri + `/${id}`
    return this.apiService.put(uriUpdate, sensor);
  }

  deleteSensor(id: number): Observable<null> {
    const uriDelete = this.uri + `/${id}`
    return this.apiService.delete(uriDelete);
  }
}

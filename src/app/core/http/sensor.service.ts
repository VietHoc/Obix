import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Sensor, SensorResponse} from '../../shared/models/Sensor';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  uri = 'sensors';
  constructor(
    private apiService: ApiService,
  ) {}

  getListSensors(sort: string, order: string, page: number, pageSize: number): Observable<SensorResponse> {
    return this.apiService.get(`${this.uri}?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}`);
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

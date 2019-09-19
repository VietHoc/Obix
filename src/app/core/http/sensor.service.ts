import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Sensor, SensorResponse} from '../../shared/models/sensor';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  readonly uri = 'sensors';
  constructor(
    private apiService: ApiService,
  ) {}

  getListSensors(sort: string, order: string, page: number, pageSize: number, search: string): Observable<SensorResponse> {
    return this.apiService.get(`${this.uri}?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}&search=${search}`);
  }

  updateSensor(sensor: Sensor): Observable<Sensor> {
    const uriUpdate = this.uri + `/update`;
    return this.apiService.post(uriUpdate, sensor);
  }
}

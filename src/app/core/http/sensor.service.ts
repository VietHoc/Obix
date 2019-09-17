import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Sensor, SensorResponse} from '../../shared/models/sensor';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  uri = 'sensors';
  constructor(
    private apiService: ApiService,
  ) {}

  getListSensors(sort: string, order: string, page: number, pageSize: number, search: string): Observable<SensorResponse> {
    return this.apiService.get(`${this.uri}?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}&search=${search}`);
  }

  updateSensor(id: number, sensor: Sensor): Observable<Sensor> {
    const uriUpdate = this.uri + `/update/${id}`
    return this.apiService.post(uriUpdate, sensor);
  }

  deleteSensor(id: number): Observable<null> {
    const uriDelete = this.uri + `/delete/${id}`
    return this.apiService.post(uriDelete);
  }
}

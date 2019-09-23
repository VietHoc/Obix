import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {SensorType} from '../../shared/models/sensor-type';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorTypeService {
  readonly uri = 'sensor-types';

  constructor(
    private apiService: ApiService,
  ) {}

  getAllSensorType(): Observable<SensorType[]> {
    return this.apiService.getList<SensorType>(this.uri);
  }
}

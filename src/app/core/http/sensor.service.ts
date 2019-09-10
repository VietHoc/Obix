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
}

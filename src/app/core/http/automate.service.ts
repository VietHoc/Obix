import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Automate, AutomateDetail} from '../../shared/models/automate';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {SensorData} from '../../shared/models/sensor-data';


@Injectable({
  providedIn: 'root'
})
export class AutomateService {
  readonly uri = 'automates';
  constructor(
    private apiService: ApiService,
  ) {}

  getListAutomates(): Observable<Automate[]> {
    return this.apiService.getList(this.uri);
  }

  addAutomate(automate: Automate): Observable<Automate> {
    return this.apiService.post<Automate>(this.uri, automate);
  }

  updateAutomate(automate: Automate): Observable<Automate> {
    const uriUpdate = `${this.uri}/update/${automate.id}`;
    return this.apiService.post<Automate>(uriUpdate, automate);
  }
}

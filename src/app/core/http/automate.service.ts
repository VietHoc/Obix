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
}

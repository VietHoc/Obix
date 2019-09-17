import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Automate} from '../../shared/models/automate';
import {ApiService} from './api.service';


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
    const uriUpdate = this.uri + `/${id}`
    return this.apiService.put(uriUpdate, automate);
  }

  deleteAutomate(id: number): Observable<null> {
    const uriDelete = this.uri + `/${id}`
    return this.apiService.delete(uriDelete);
  }
}

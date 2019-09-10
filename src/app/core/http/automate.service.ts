import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Automate} from '../../shared/models/Automate';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';


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
}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {CustomSnackbarService} from '../service/custom-snackbar.service';
import {Message} from '../../constant/string';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  appUrl = environment.api_url + '/api/';
  constructor(
    private http: HttpClient,
    private customSnackbarService: CustomSnackbarService
  ) {}

  getList<T>(path: string, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T[]> {
    return this.http
      .get<T[]>(`${this.appUrl}${path}`, { headers, params })
      .pipe(map((response: any) => response));
  }

  get<T>(path: string, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<T> {
    return this.http
      .get<T>(`${this.appUrl}${path}`, { headers, params })
      .pipe(map((response: any) => response));
  }


  put(path: string, body: Object = {}): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    return this.http
      .put(`${this.appUrl}${path}`, JSON.stringify(body), {headers})
      .pipe(
        map((response: any) => {
          this.customSnackbarService.success(Message.successful);
          return response;
        })
      );
  }

  // tslint:disable-next-line:ban-types
  post<T>(path: string, body: T): Observable<any> {
    const instance = body.constructor.name;
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    return this.http
      .post(`${this.appUrl}${path}`, JSON.stringify(body), {headers})
      .pipe(
        map((response: any) => {
          const action = path.indexOf('update') === -1 ? 'Add' : 'Update';
          this.customSnackbarService.success(`${action} ${instance} ${Message.successful}`);
          return response;
        })
      );
  }

  delete(path): Observable<any> {
    return this.http.delete(`${this.appUrl}${path}`).pipe(
      map((response: any) => {
        this.customSnackbarService.success(Message.successful);
        return response;
      })
    );
  }
}

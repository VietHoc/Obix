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
  ) {

  }

  get(path: string, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<any> {
    return this.http
      .get(`${this.appUrl}${path}`, { headers, params })
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
  post(path: string, body: Object = {}): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    return this.http
      .post(`${this.appUrl}${path}`, JSON.stringify(body), {headers})
      .pipe(
        map((response: any) => {
          this.customSnackbarService.success(Message.successful);
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

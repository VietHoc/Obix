import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  get(path: string, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { headers, params })
      .pipe(map((response: any) => response));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  // tslint:disable-next-line:ban-types
  post(path: string, body: Object = {}, options?): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), options)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  delete(path): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}

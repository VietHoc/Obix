import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize, map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {

      if (environment.production) {
        return next.handle(request);
      }

      if (request.method === 'POST') {
        console.log('  AND Data:: ' + request.body);
      }
      console.log(request.url);
      if (request.url.match(/\/automates$/) && request.method === 'GET') {
        return this.getFakeData('automates');
      }

      if (request.url.match(/\/sensors\?sort\=/) && request.method === 'GET') {
        return this.getFakeData('sensors');
      }

      if (request.url.match(/\/histories\?sensorId\=/) && request.method === 'GET') {
        return this.getFakeData('temperature-history');
      }

      if (request.url.match(/\/monitor\?automateId\=/) && request.method === 'GET') {
        return this.getFakeData('monitors');
      }

      if (request.url.match(/\/interval$/) && request.method === 'GET') {
        return this.getFakeData('interval');
      }

      if (request.url.match(/\/sensor-types$/) && request.method === 'GET') {
        return this.getFakeData('sensor-types');
      }

      if (request.url.match(/\/updated-monitor\?automateId\=/) && request.method === 'GET') {
        return this.getFakeData('updated-monitor');
      }

      if (request.url.match(/\/sensors\/update\/\d+$/) && request.method === 'POST') {
        return this.getFakeData('update-sensor');
      }

      return next.handle(request);

    }))
      .pipe(materialize())
      .pipe(delay(0))
      .pipe(dematerialize());
  }

  // tslint:disable-next-line:ban-types
  private getFakeData(serviceName: string): Observable<HttpResponse<Object>> {
    const FAKE_URL_FORMAT = 'assets/mocks/';
    return this.http.get(FAKE_URL_FORMAT + serviceName + '.json').pipe(map(data => {
      return new HttpResponse({
        status: 200, body: data
      });
    }));
  }
}

export let FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

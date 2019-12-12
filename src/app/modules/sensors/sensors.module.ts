import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorListComponent} from './pages/sensor-list.component';
import {SensorDialogComponent} from './components/sensor-dialog/sensor-dialog.component';
import {SensorsRoutingModule} from './sensors-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { MatCardModule, MatGridListModule, MatDatepickerModule } from '@angular/material';
import { SensorChartComponent } from './components/sensor-chart/sensor-chart.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import more from 'highcharts/highcharts-more.src';
import exporting from 'highcharts/modules/exporting.src';
import stock from 'highcharts/modules/stock.src';

@NgModule({
  declarations: [
    SensorListComponent,
    SensorDialogComponent,
    SensorChartComponent
  ],
  imports: [
    CommonModule,
    SensorsRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    ChartModule,
    MatDatepickerModule
  ],
  entryComponents: [
    SensorDialogComponent
  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [stock, more, exporting] }],
})
export class SensorsModule {
}

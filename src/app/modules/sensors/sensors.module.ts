import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorListComponent} from './pages/sensor-list.component';
import {SensorDialogComponent} from './components/sensor-dialog/sensor-dialog.component';
import {SensorsRoutingModule} from './sensors-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MatCardModule, MatGridListModule} from '@angular/material';
import { SensorChartComponent } from './components/sensor-chart/sensor-chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';

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
    NgxChartsModule
  ],
  entryComponents: [
    SensorDialogComponent
  ],
})
export class SensorsModule {
}

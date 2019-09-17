import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SensorComponent} from './pages/sensor.component';
import {SensorDialogComponent} from './components/sensor-dialog/sensor-dialog.component';
import {SensorsRoutingModule} from './sensors-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    SensorComponent,
    SensorDialogComponent
  ],
  imports: [
    CommonModule,
    SensorsRoutingModule,
    SharedModule
  ],
  entryComponents: [
    SensorDialogComponent
  ],
})
export class SensorsModule { }

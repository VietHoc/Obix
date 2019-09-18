import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SensorListComponent} from './pages/sensor-list.component';
import {SensorDialogComponent} from './components/sensor-dialog/sensor-dialog.component';
import {SensorsRoutingModule} from './sensors-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    SensorListComponent,
    SensorDialogComponent
  ],
  imports: [
    CommonModule,
    SensorsRoutingModule,
    SharedModule,
    MatCardModule
  ],
  entryComponents: [
    SensorDialogComponent
  ],
})
export class SensorsModule { }

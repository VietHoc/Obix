import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SensorComponent} from './pages/sensor.component';

const routes: Routes = [
  {
    path: '',
    component: SensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SensorsRoutingModule { }

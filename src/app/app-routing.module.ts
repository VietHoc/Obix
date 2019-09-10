import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AutomateComponent} from './modules/automate/automate.component';
import {SensorComponent} from './modules/sensor/sensor.component';


const routes: Routes = [
  {
    path: '',
    component: AutomateComponent,
    data: {title: 'Server List'}
  },
  {
    path: 'automates',
    component: AutomateComponent,
    data: { title: 'Server List' }
  },
  {
    path: 'sensors',
    component: SensorComponent,
    data: { title: 'Sensor List' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

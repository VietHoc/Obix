import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SensorComponent} from './modules/sensors/pages/sensor.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/automates',
    pathMatch: 'full',
  },
  {
    path: 'automates',
    loadChildren: () => import('./modules/automates/automate.module').then(mod => mod.AutomateModule),
    data: { title: 'Server List' }
  },
  {
    path: 'sensors',
    loadChildren: () => import('./modules/sensors/sensors.module').then(mod => mod.SensorsModule),
    data: { title: 'Sensor List' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

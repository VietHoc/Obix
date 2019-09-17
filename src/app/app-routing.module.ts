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
    loadChildren: () => import('./modules/automates/automate.module').then(mod => mod.AutomateModule)
  },
  {
    path: 'sensors',
    loadChildren: () => import('./modules/sensors/sensors.module').then(mod => mod.SensorsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

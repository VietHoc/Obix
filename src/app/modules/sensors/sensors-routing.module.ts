import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SensorListComponent} from './pages/sensor-list.component';

const routes: Routes = [
  {
    path: '',
    component: SensorListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SensorsRoutingModule {
}

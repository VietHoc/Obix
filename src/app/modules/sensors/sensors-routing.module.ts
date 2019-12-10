import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SensorListComponent} from './pages/sensor-list.component';
import {SensorChartComponent} from './components/sensor-chart/sensor-chart.component';

const routes: Routes = [
  {
    path: '',
    component: SensorListComponent
  },
  {
    path: ':sensor_id/charts',
    component: SensorChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SensorsRoutingModule {
}

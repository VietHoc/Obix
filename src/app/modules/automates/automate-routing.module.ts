import { NgModule } from '@angular/core';
import {AutomateListComponent} from './pages/automate-list.component';
import {RouterModule, Routes} from '@angular/router';
import {AutomateDetailComponent} from './components/automate-detail/automate-detail.component';


const routes: Routes = [
  {
    path: '',
    component: AutomateListComponent
  },
  {
    path: ':automate_id/sensors',
    component: AutomateDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomateRoutingModule { }

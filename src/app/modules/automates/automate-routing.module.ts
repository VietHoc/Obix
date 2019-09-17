import { NgModule } from '@angular/core';
import {AutomateComponent} from './pages/automate.component';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: AutomateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomateRoutingModule { }

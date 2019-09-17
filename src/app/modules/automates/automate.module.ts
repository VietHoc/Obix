import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutomateComponent} from './pages/automate.component';
import {AutomateDialogComponent} from './components/automate-dialog/automate-dialog.component';
import {AutomateRoutingModule} from './automate-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    AutomateComponent,
    AutomateDialogComponent,
  ],
  imports: [
    CommonModule,
    AutomateRoutingModule,
    SharedModule
  ],
  entryComponents: [
    AutomateDialogComponent
  ],
})
export class AutomateModule { }

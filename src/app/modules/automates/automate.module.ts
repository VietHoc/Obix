import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutomateListComponent} from './pages/automate-list.component';
import {AutomateDialogComponent} from './components/automate-dialog/automate-dialog.component';
import {AutomateRoutingModule} from './automate-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AutomateDetailComponent} from './components/automate-detail/automate-detail.component';
import {MatGridListModule, MatSelectModule} from '@angular/material';
import {NgxMasonryModule} from 'ngx-masonry';

@NgModule({
  declarations: [
    AutomateListComponent,
    AutomateDialogComponent,
    AutomateDetailComponent,
  ],
  imports: [
    CommonModule,
    AutomateRoutingModule,
    SharedModule,
    MatGridListModule,
    MatSelectModule,
    NgxMasonryModule
  ],
  entryComponents: [
    AutomateDialogComponent
  ],
})
export class AutomateModule {
}

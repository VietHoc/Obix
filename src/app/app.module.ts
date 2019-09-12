import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatPaginatorModule, MatRadioModule,
  MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule,
  MatToolbarModule, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AutomateComponent } from './modules/automate/automate.component';
import { SensorComponent } from './modules/sensor/sensor.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AutomateDialogComponent } from './modules/automate/components/automate-dialog/automate-dialog.component';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import {HttpErrorInterceptor} from './core/interceptor/error-handler.interceptor';
import { SensorDialogComponent } from './modules/sensor/sensor-dialog/sensor-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AutomateComponent,
    SensorComponent,
    AutomateDialogComponent,
    SnackBarComponent,
    SensorDialogComponent,

  ],
  imports: [
    // Core
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,

    // Material
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  entryComponents: [
    AutomateDialogComponent,
    SensorDialogComponent,
    SnackBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AboutComponent } from './about/about.component';
import { CounterComponent } from './counter/counter.component';
import { DailyComponent } from './daily/daily.component';
import { ThousandSuffixesPipe } from './custom-pipes/ThousandSuffixesPipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { ByLevelComponent } from './by-level/by-level.component';
import { MatButtonModule, MatButtonToggleModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatProgressSpinnerModule, MatSpinner } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AboutComponent,
    CounterComponent,
    DailyComponent,
    ThousandSuffixesPipe,
    ByLevelComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'daily', component: DailyComponent },
      { path: '', component: ByLevelComponent, pathMatch: 'full' },
      { path: 'about', component: AboutComponent },

    ]),
    BrowserAnimationsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatButtonToggleModule,
    MatButtonModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MatSpinner]
})
export class AppModule { }

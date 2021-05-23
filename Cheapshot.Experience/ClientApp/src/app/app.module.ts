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
import { MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatProgressSpinnerModule, MatSidenavModule, MatSlideToggleModule, MatSpinner } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { ExploreComponent } from './explore/explore.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PlayerBottomSheet } from './player-bottom-sheet/player-bottom-sheet';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AboutComponent,
    CounterComponent,
    DailyComponent,
    ThousandSuffixesPipe,
    ByLevelComponent,
    ExploreComponent,
    PlayerBottomSheet],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ByLevelComponent, pathMatch: 'full' },
      { path: 'daily', component: DailyComponent },
      { path: 'bylevel/:city', component: ByLevelComponent },
      { path: 'about', component: AboutComponent },
      { path: 'explore', component: ExploreComponent }
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
    MatListModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MatSpinner, PlayerBottomSheet]
})
export class AppModule { }

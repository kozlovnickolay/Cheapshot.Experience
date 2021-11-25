import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, MatProgressSpinnerModule, MatSidenavModule, MatSlideToggleModule, MatSpinner } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { ExploreComponent } from './explore/explore.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PlayerBottomSheet } from './player-bottom-sheet/player-bottom-sheet';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { PicsComponent } from './pics/pics.component';
import { RootComponent } from './root.component';
import { LayersBottomSheetComponent } from './layers-bottom-sheet/layers-bottom-sheet.component';
import { MonumentCreatorComponent } from './monument-creator/monument-creator.component';
import { AgmOverlays } from "agm-overlays";
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

@NgModule({
  declarations: [
    RootComponent,
    AppComponent,
    NavMenuComponent,
    AboutComponent,
    CounterComponent,
    DailyComponent,
    ThousandSuffixesPipe,
    ByLevelComponent,
    ExploreComponent,
    PlayerBottomSheet,
    MapComponent,
    PicsComponent,
    LayersBottomSheetComponent,
    MonumentCreatorComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', component: AppComponent, children: [
          { path: '', component: ByLevelComponent, pathMatch: 'full' },
          { path: 'daily', component: DailyComponent },
          { path: 'daily/:city', component: DailyComponent },
          { path: 'bylevel/:city', component: ByLevelComponent },
          { path: 'about', component: AboutComponent },
          { path: 'explore', component: ExploreComponent },
          { path: 'pics', component: PicsComponent },
          { path: 'monument-creator', component: MonumentCreatorComponent }
        ]
      }, { path: 'map', component: MapComponent }
    ]),
    BrowserAnimationsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    OverlayModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCg4jN2Shpzzaj8Ie2Y722PUmLjuV4431s'
    }),
    ReactiveFormsModule,
    AgmOverlays,
    AgmJsMarkerClustererModule
  ],

  providers: [],
  bootstrap: [RootComponent],
  entryComponents: [MatSpinner, PlayerBottomSheet, LayersBottomSheetComponent]
})
export class AppModule { }

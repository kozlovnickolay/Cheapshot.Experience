import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AboutComponent } from './about/about.component';
import { DailyComponent } from './daily/daily.component';
import { ThousandSuffixesPipe } from './custom-pipes/thousand-suffixes-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { ByLevelComponent } from './by-level/by-level.component';
import { GestureConfig, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardContent, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatProgressSpinnerModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSpinner } from '@angular/material';
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
import { AgmOverlays } from "agm-overlays";
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoadingComponent } from './loading/loading.component';
import { MarkerBottomSheetComponent } from './marker-bottom-sheet/marker-bottom-sheet.component';
import { ToolsComponent } from './tools/tools.component';
import { EnvelopCalculatorComponent } from './envelop-calculator/envelop-calculator.component';
import { BuildingCalculatorComponent } from './building-calculator/building-calculator.component';
import { DurationPipe } from './custom-pipes/duration-pipe';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AddMonumentComponent } from './add-monument/add-monument.component';
import { EmojiSelectorComponent } from './emoji-selector/emoji-selector.component';

@NgModule({
    declarations: [
        RootComponent,
        AppComponent,
        NavMenuComponent,
        AboutComponent,
        DailyComponent,
        ThousandSuffixesPipe,
        ByLevelComponent,
        ExploreComponent,
        PlayerBottomSheet,
        MapComponent,
        PicsComponent,
        LayersBottomSheetComponent,
        LeaderboardComponent,
        LoadingComponent,
        MarkerBottomSheetComponent,
        ToolsComponent,
        EnvelopCalculatorComponent,
        BuildingCalculatorComponent,
        DurationPipe,
        AddMonumentComponent,
        EmojiSelectorComponent],
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
                    { path: 'request-for-monument', component: AddMonumentComponent },
                    { path: 'tools', component: ToolsComponent }]
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
        MatSnackBarModule,
        MatSlideToggleModule,
        CommonModule,
        AgmCoreModule.forRoot({
            libraries: ['places']
        }),
        ReactiveFormsModule,
        AgmOverlays,
        AgmJsMarkerClustererModule,
        MatSliderModule,
        MatCardModule,
        MatIconModule,
        ChartsModule
    ],

    providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }, ThemeService, ThousandSuffixesPipe],
    bootstrap: [RootComponent],
    entryComponents: [MatSpinner, PlayerBottomSheet, LayersBottomSheetComponent, MarkerBottomSheetComponent, EnvelopCalculatorComponent, BuildingCalculatorComponent, EmojiSelectorComponent]
})
export class AppModule { }
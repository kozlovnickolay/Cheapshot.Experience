import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ThousandSuffixesPipe } from './custom-pipes/ThousandSuffixesPipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    LeaderboardComponent,
    ThousandSuffixesPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'leaderboard', component: LeaderboardComponent },
    ]),
    BrowserAnimationsModule,
    MatSelectModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

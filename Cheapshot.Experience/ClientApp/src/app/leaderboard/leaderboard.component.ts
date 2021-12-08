import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { CheapshotFont } from 'src/app/fonts/CheapshotFont';
import { Player } from 'src/app/model/Player';
import { PlayerBottomSheet } from 'src/app/player-bottom-sheet/player-bottom-sheet';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  @Input()
  players: Player[];

  @Input()
  maxXp: number;

  constructor(
    public font: CheapshotFont,
    private _bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
  }

  getUserRowStyle(xp: number) {
    const percent = this.getTopPercent(xp);
    const background = 'linear-gradient(to right, hsl(195, 100%, ' + (25 + Math.round(percent / 3)) + '%) ' + percent + '%, #00000038 ' + percent + '%)';
    const borderBottom = '1px solid #343a40';
    return {
      background,
      borderBottom
    };
  }

  getTopPercent(xp: number) {
    return Math.round((Math.sqrt(xp) / Math.sqrt(this.maxXp)) * 100);
  }

  openPlayerBottomSheet(player: Player): void {
    this._bottomSheet.open(PlayerBottomSheet, {
      data: player
    });
  }

}
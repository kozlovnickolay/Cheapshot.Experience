import { Component } from '@angular/core';
import { CheapshotFont } from '../fonts/CheapshotFont';
import emojis from '../fonts/emojis';

@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
})
export class PicsComponent {
  constructor(public font: CheapshotFont) {

    this.pics = Object.keys(emojis);

  }

  pics: string[];

}

import { Component } from '@angular/core';
import { CheapshotFont } from '../fonts/CheapshotFont';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  constructor(public font: CheapshotFont){
  }

}

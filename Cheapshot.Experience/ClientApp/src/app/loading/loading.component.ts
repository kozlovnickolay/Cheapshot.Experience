import { Component, OnInit } from '@angular/core';
import { CheapshotFont } from '../fonts/CheapshotFont';
import emojis from '../fonts/emojis';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

	constructor(public font: CheapshotFont) { }

	ngOnInit() {
	}

	getRandomPic() {
		return Object.keys(emojis)[this.getRandomInt(Object.keys(emojis).length)];
	}

	getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

}
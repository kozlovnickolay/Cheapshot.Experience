import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CheapshotFont } from '../fonts/CheapshotFont';
import emojis from '../fonts/emojis';

@Component({
	selector: 'app-pics',
	templateUrl: './pics.component.html',
})
export class PicsComponent {
	constructor(public font: CheapshotFont, private _snackBar: MatSnackBar) {
		this.pics = Object.keys(emojis);
	}

	pics: string[];

	onPicClick(pic: string) {
		this.copyToClipboard(pic);
		this._snackBar.open(`${pic} symbol was copied!`, undefined, {
			duration: 1500
		});
	}

	copyToClipboard(text: string) {
		var sampleTextarea = document.createElement("textarea");
		document.body.appendChild(sampleTextarea);
		sampleTextarea.value = text; //save main text in it
		sampleTextarea.select(); //select textarea contenrs
		document.execCommand("copy");
		document.body.removeChild(sampleTextarea);
	}
}
import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { CheapshotFont } from '../fonts/CheapshotFont';

@Component({
	templateUrl: './emoji-selector.component.html',
	styleUrls: ['./emoji-selector.component.css']
})
export class EmojiSelectorComponent {

	constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public pics: string[], public font: CheapshotFont, private bottomsheet: MatBottomSheetRef<EmojiSelectorComponent>) {
	}

	onSelectPic(pic: string) {
		this.bottomsheet.dismiss(pic);
	}

}

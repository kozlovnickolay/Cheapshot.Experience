import { Component, Inject } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material";
import { CheapshotFont } from "../fonts/CheapshotFont";
import { Player } from "../model/Player";

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'player-bottom-sheet.html',
    styleUrls: ['player-bottom-sheet.css']
})
export class PlayerBottomSheet {

    constructor(private _bottomSheetRef: MatBottomSheetRef<PlayerBottomSheet>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: Player,
        public font: CheapshotFont) {
    }

    openLink(event: MouseEvent): void {

        this._bottomSheetRef.dismiss();

        event.preventDefault();

    }

}
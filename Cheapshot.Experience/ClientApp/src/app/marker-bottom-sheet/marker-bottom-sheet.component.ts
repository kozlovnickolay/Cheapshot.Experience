import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { MonumentMarker } from '../map/interfaces';
import { getCheapshotUrl } from '../model/Cheapshot';

@Component({
    templateUrl: './marker-bottom-sheet.component.html',
    styleUrls: ['./marker-bottom-sheet.component.css']
})
export class MarkerBottomSheetComponent implements OnInit {

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public marker: MonumentMarker, public font: CheapshotFont, private _snackBar: MatSnackBar) { }

    ngOnInit() {
    }

    tap2Audio = new Audio('/assets/sounds/tap_2.aac');
    tap3Audio = new Audio('/assets/sounds/tap_3.aac');

    onOpeninGameClick() {
        this.tap2Audio.play();
        window.location.href = getCheapshotUrl(this.marker.lat, this.marker.lng);
    }

    onShareClick() {
        this.tap3Audio.play();
        this.copyToClipboard(getCheapshotUrl(this.marker.lat, this.marker.lng));
        this._snackBar.open(`${this.marker.pic} ${this.marker.label} link was copied!`, undefined, {
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

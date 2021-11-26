import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { CheapshotFont } from 'src/app/fonts/CheapshotFont';
import { Layer } from '../map/interfaces';

@Component({
  templateUrl: './layers-bottom-sheet.component.html',
  styleUrls: ['./layers-bottom-sheet.component.css']
})
export class LayersBottomSheetComponent{


  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public layers: Layer[], public font: CheapshotFont) {

  }


}

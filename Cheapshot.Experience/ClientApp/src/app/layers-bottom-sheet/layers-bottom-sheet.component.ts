import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { CheapshotFont } from 'src/app/fonts/CheapshotFont';
import { Layer } from 'src/app/map/map.component';

@Component({
  templateUrl: './layers-bottom-sheet.component.html',
  styleUrls: ['./layers-bottom-sheet.component.css']
})
export class LayersBottomSheetComponent{


  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public layers: Layer[], public font: CheapshotFont) {

  }


}

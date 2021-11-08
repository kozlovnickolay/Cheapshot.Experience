import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { Birdie, Bypic, Defender, Monument, Upgrade } from './model/Monument';
import { generateMonument } from './model/MonumentCreator';
import { MonumentRequest } from './model/MonumentRequest';

@Component({
  selector: 'app-monument-creator',
  templateUrl: './monument-creator.component.html',
  styleUrls: ['./monument-creator.component.css']
})
export class MonumentCreatorComponent implements OnInit {
  value: MonumentRequest = {
    city: '',
    difficulty: 1,
    location: '',
    name: '',
    pic: ''
  }

  monument: Monument;

  form: FormGroup;

  locationPattern: ""
  constructor(private formBuilder: FormBuilder, public font: CheapshotFont) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      pic: [null, Validators.required],
      location: [null, Validators.pattern(/^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/)],
      difficulty: [null, Validators.required],
      city: [null, Validators.required]
    });
  }

  onCreateClick() {
    if (this.form.valid) {
      this.monument = generateMonument(this.value);
    }
  }

  isDefender(x: any): x is Defender {
    return x.type === "defender";
  }

  isBirdie(x: any): x is Birdie {
    return x.type === "birdie";
  }

  isBypic(x: any): x is Bypic {
    return x.type === "bypic";
  }

  getUpgradeIcon(u: Upgrade){
    if(this.isDefender(u)){
      return `<span [class]="font.csemoji(${u.pic}, 16)"></span> ${u.name}, lvl: ${u.level}, cnt: ${u.count}`;
    }
  }
}
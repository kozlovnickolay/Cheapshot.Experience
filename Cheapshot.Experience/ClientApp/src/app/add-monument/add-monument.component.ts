import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { EmojiSelectorComponent } from '../emoji-selector/emoji-selector.component';
import { CheapshotFont } from '../fonts/CheapshotFont';
import emojis from '../fonts/emojis';

export interface MonumentRequest {
	name: string;
	pic: string;
	location: string;
	city: string;
	country: string;
	story: string;
}

export interface UserPics {
	userpics: string[]
}



@Component({
	selector: 'app-add-monument',
	templateUrl: './add-monument.component.html',
	styleUrls: ['./add-monument.component.css']
})
export class AddMonumentComponent implements OnInit {
	m_http: HttpClient;
	m_baseUrl: string;

	form: FormGroup;

	loading = false;

	pics: string[] = [];

	value: MonumentRequest = {
		city: '',
		location: '',
		name: '',
		pic: '',
		country: '',
		story: ''
	};

	constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder, public font: CheapshotFont, private _bottomSheet: MatBottomSheet, private _snackBar: MatSnackBar) {
		this.m_http = http;
		this.m_baseUrl = baseUrl;
	}
	async ngOnInit() {
		this.form = this.formBuilder.group({
			name: [null, Validators.required],
			pic: [null, Validators.required],
			location: [null, Validators.pattern(/^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/)],
			city: [null, Validators.required],
			country: [null, Validators.required]
		});		

		const userPics = await this.m_http.get<UserPics>('https://api.cheapshot.co/auth/userpics').toPromise();

		for (const emoji of Object.keys(emojis))
			if (userPics.userpics.indexOf(emoji) === -1)
				this.pics.push(emoji);

	}

	async onCreateClick() {
		if (this.form.valid) {
			this.loading = true;
			await this.m_http.post(`${this.m_baseUrl}monument/add`, this.value).toPromise();
			this.loading = false;
			this._snackBar.open(`Request for ${this.value.pic} ${this.value.name} has been sent!`, 'Success', {
				duration: 5000
			});
		}
	}


	onFindEmoji() {
		const bottomSheetRef = this._bottomSheet.open(EmojiSelectorComponent, {
			data: this.pics
		});

		bottomSheetRef.afterDismissed().subscribe((pic) => {
			this.value.pic = pic;
		});
	}

}

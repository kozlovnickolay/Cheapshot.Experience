import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { CountryGroup } from '../model/CountryGroup';
import { Point } from '../model/Point';
import { DomSanitizer } from '@angular/platform-browser';
import { getCheapshotUrl } from '../model/Cheapshot';


@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.css']
})
export class ExploreComponent {

    public countryGroups: CountryGroup[] = [];

    m_http: HttpClient;
    m_baseUrl: string

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public font: CheapshotFont, private sanitizer: DomSanitizer) {
        this.m_http = http;
        this.m_baseUrl = baseUrl;
    }

    ngOnInit() {
        this.loadCities();
    }

    loadCities() {
        this.m_http.get<CountryGroup[]>(this.m_baseUrl + 'city').subscribe(result => {
            this.countryGroups = result;
        }, error => console.error(error));
    }

    getCheapshotLink(point: Point) {
        return this.sanitizer.bypassSecurityTrustUrl(getCheapshotUrl(point.lat, point.lon));
    }

    getDailyLink(name: string) {
        return `/daily/${name}`;
    }

    getCityName(index: number) {
        return `#${index}`;
    }
}

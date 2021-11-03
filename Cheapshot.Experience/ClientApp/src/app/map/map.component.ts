import { Component, Inject } from '@angular/core';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { MapTypeStyle, MouseEvent } from '@agm/core';
import { Point } from '../model/Point';
import darkStyle from './MapStyle';
import { HttpClient } from '@angular/common/http';
import { CountryGroup } from '../model/CountryGroup';
import circleToPolygon from "circle-to-polygon";
import { MatBottomSheet } from '@angular/material';
import { LayersBottomSheetComponent } from '../layers-bottom-sheet/layers-bottom-sheet/layers-bottom-sheet.component';

// call this to Disable
function disableScroll() {
  document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
  });
}

// call this to Enable
function enableScroll() {
  document.body.removeEventListener('touchmove', function (event) {
    event.preventDefault();
  });
}

export interface Layer {
  type: "monuments" | "inspect-area";
  visible: boolean;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  m_http: HttpClient;
  m_baseUrl: string;

  layers: Layer[] = [{
    type: "inspect-area",
    visible: false
  }, {
    type: "monuments",
    visible: false
  }];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public font: CheapshotFont, private _bottomSheet: MatBottomSheet) {
    this.m_http = http;
    this.m_baseUrl = baseUrl;
  }
  public featureCollection = {
    type: "FeatureCollection",
    features: []
  };
  async ngOnInit() {
    disableScroll();
    await this.loadCities();
  }


  loadCities() {
    this.m_http.get<CountryGroup[]>(this.m_baseUrl + 'city').subscribe(result => {
      this.createGeoJsonObj(result);
      this.zoom = 5;
    }, error => console.error(error));
  }

  createGeoJsonObj(countryGroups: CountryGroup[]) {
    countryGroups.forEach(county => {
      county.cities.forEach(city => {
        city.points.forEach((p, pi) => {
          const feature = {
            type: "Feature",
            geometry: circleToPolygon([p.lon, p.lat], 15000, 32),
            properties: {
              city: `${city.name}_${pi}`
            }
          }
          this.featureCollection.features.push(feature);
        })
      })
    });
  }



  ngOnDestroy() {
    enableScroll();
  }

  public styles: MapTypeStyle[] = darkStyle
  lat = 51.678418;
  lng = 7.809007;
  zoom: number = 5;

  mapClick(evt: MouseEvent) {
    const cheapshotUrl = this.getCheapshotLink({ lat: evt.coords.lat, lon: evt.coords.lng });

    window.open(cheapshotUrl).focus();
  }

  getCheapshotLink(point: Point) {
    return `csx://location?lat=${point.lat}&lng=${point.lon}`;
  }

  styleFunc(feature) {
    return ({
      clickable: false,
      fillColor: feature.getProperty('color'),
      strokeWeight: 1
    });
  }

  openLayersBottomSheet() { 
    this._bottomSheet.open(LayersBottomSheetComponent, {
      data: this.layers
    });
  }

}

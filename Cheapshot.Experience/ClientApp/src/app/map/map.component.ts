import { Component, Inject, ViewChild } from '@angular/core';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { AgmMap, LatLngBoundsLiteral, MapTypeStyle, MouseEvent } from '@agm/core';
import { Point } from '../model/Point';
import darkStyle from './MapStyle';
import { HttpClient } from '@angular/common/http';
import { CountryGroup } from '../model/CountryGroup';
import circleToPolygon from "circle-to-polygon";
import { MatBottomSheet } from '@angular/material';
import { LayersBottomSheetComponent } from '../layers-bottom-sheet/layers-bottom-sheet.component';
import { MonumentGroup } from '../model/MonumentGroup';
import { Monument } from '../model/Monument';
import { Layer, MonumentMarker } from './interfaces';
import { MarkerBottomSheetComponent } from '../marker-bottom-sheet/marker-bottom-sheet.component';
import { getCheapshotUrl } from '../model/Cheapshot';

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
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent {
    m_http: HttpClient;
    m_baseUrl: string;

    styles: MapTypeStyle[] = darkStyle;
    lat = 51.678418;
    lng = 7.809007;
    zoom: number = 5;

    /** view port restrictions */
    mapRestriction = {
        latLngBounds: {
            east: 180,
            north: 85,
            south: -85,
            west: -180
        },
        strictBounds: true
    };

    isCluster = false;

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
        await this.loadMonuments();
    }

    ngOnDestroy() {
        enableScroll();
    }

    loadCities() {
        this.m_http.get<CountryGroup[]>(this.m_baseUrl + 'city').subscribe(result => {
            this.createGeoJsonObj(result);
            this.zoom = 5;
            this.layers.push({
                name: "Service area",
                type: "zones",
                visible: false,
                geometry: this.featureCollection
            })
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

    onMapClick(evt: MouseEvent) {
        if (!this.isCluster) {
            const cheapshotUrl = getCheapshotUrl(evt.coords.lat, evt.coords.lng);
            window.location.href = cheapshotUrl;
        } else
            this.isCluster = !this.isCluster;
    }

    onClusterClick() {
        this.isCluster = true;
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

    async loadMonuments() {
        const monumentGroups = await this.m_http.get<MonumentGroup[]>(this.m_baseUrl + 'monument').toPromise();
        monumentGroups.forEach(group => {
            const newLayer: Layer = {
                name: group.tag,
                visible: true,
                type: "markers",
                markers: []
            };

            group.monuments.forEach(mon => {
                const marker = this.createMonumentMarker(mon, group.tag);
                if (marker)
                    newLayer.markers.push(marker);
            });

            this.layers.push(newLayer);
        })
    }

    layers: Layer[] = [];

    createMonumentMarker(monument: Monument, generation: string): MonumentMarker {
        var location = monument.location.match(/(-?[0-9\.]+)(?:,|, | , | ,)(-?[0-9\.]+)/);

        if (location) {
            return {
                ...monument,
                label: monument.name,
                lat: Number.parseFloat(location[1]),
                lng: Number.parseFloat(location[2]),
                generation,
                pic: this.font.checkEmoji(monument.pic)
            };
        } else {
            console.error(`Неправильные координаты в ${monument.pic} ${monument.name}`);
            return undefined;
        }
    }

    onMarkerClick(marker: MonumentMarker) {
        this._bottomSheet.open<MarkerBottomSheetComponent, MonumentMarker>(MarkerBottomSheetComponent, {
            data: marker
        });
    }

}
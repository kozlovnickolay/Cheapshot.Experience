import { Component, ElementRef, Inject, NgZone, ViewChild } from '@angular/core';
import { CheapshotFont } from '../fonts/CheapshotFont';
import { AgmMap, LatLngBoundsLiteral, MapsAPILoader, MapTypeStyle, MouseEvent } from '@agm/core';
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

    private geoCoder;

    pickAudio = new Audio('/assets/sounds/ui_swipe.aac');
    tap2Audio = new Audio('/assets/sounds/tap_2.aac');
    tap3Audio = new Audio('/assets/sounds/tap_3.aac');



    @ViewChild('search', null)
    public searchElementRef: ElementRef;

    point = {
        active: false,
        lat: 0,
        lng: 0
    };

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

    constructor(
        http: HttpClient,
        @Inject('BASE_URL') baseUrl: string,
        public font: CheapshotFont,
        private _bottomSheet: MatBottomSheet,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
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

        const startAudio = new Audio('/assets/sounds/start.aac');
        startAudio.play();

        this.mapsAPILoader.load().then(() => {
            this.geoCoder = new google.maps.Geocoder;

            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
            autocomplete.addListener("place_changed", () => {

                if (this.searchElementRef.nativeElement.value === "Squi" || this.searchElementRef.nativeElement.value === "squi") {
                    this.lat = 55.77211588235539;
                    this.lng = 37.67729242025703;
                    this.zoom = 15;
                    console.log("SQUUUUUUUUUUUUI");
                    window.location.href = "csx://location?lat=55.77211588235539&lng=37.67729242025703";
                }

                this.ngZone.run(() => {
                    //get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.pickAudio.play();

                    this.point = {
                        active: true,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng()
                    };

                    //set latitude, longitude and zoom
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });


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
                        geometry: circleToPolygon([p.lon, p.lat], 20000, 32),
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
            this.pickAudio.play();
            this.point = {
                active: true,
                ...evt.coords
            };
        } else
            this.isCluster = !this.isCluster;
    }

    onClusterClick() {
        this.tap2Audio.play();
        this.isCluster = true;
    }

    styleFunc(feature) {
        return ({
            clickable: false,
            fillColor: 'white',
            strokeWeight: 1
        });
    }

    openLayersBottomSheet() {
        this.tap2Audio.play();
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
        });
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
        this.tap2Audio.play();
        this._bottomSheet.open<MarkerBottomSheetComponent, MonumentMarker>(MarkerBottomSheetComponent, {
            data: marker
        });
    }

    onPointClick() {
        this.tap2Audio.play();
        this._bottomSheet.open<MarkerBottomSheetComponent, MonumentMarker>(MarkerBottomSheetComponent, {
            data: {
                difficulty: null,
                label: "Point",
                ...this.point,
                pic: "📍",
                generation: null
            }
        });
    }

}
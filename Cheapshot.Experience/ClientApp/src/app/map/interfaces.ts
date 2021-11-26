export interface Layer {
    name: string;
    visible: boolean;
    type: "zones" | "markers";
    geometry?: any;
    markers?: MonumentMarker[];
}

export interface MonumentMarker {
    lat: number;
    lng: number;
    label: string;
    pic: string;
    difficulty: string;
    generation: string;
}
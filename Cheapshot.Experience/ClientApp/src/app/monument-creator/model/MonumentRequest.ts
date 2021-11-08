export interface MonumentRequest {
    name: string;
    pic: string;
    location: string;
    city: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
}
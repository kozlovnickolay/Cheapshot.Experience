export function getCheapshotUrl(lat: number, lon: number) {
    return `csx://location?lat=${lat}&lng=${lon}`;
}
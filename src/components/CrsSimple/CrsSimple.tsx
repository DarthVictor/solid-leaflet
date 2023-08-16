import { onMount } from "solid-js";
import { CRS, LatLngBoundsExpression, imageOverlay, latLng, map, marker, polyline } from "leaflet";

import styles from "./CrsSimple.module.css"

export function CrsSimple () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const mapElem = map(mapDiv, {
                crs: CRS.Simple,
                minZoom: -3
            });
        
            function xy(x: number, y: number): any  {
                return latLng(y, x); 
            }
        
            const bounds: LatLngBoundsExpression = [xy(-25, -26.5), xy(1023, 1021.5)];
            imageOverlay('uqm_map_full.png', bounds).addTo(mapElem);
        
            const sol      = xy(175.2, 145.0);
            const mizar    = xy(41.6, 130.1);
            const kruegerZ = xy(13.4, 56.5);
            const deneb    = xy(218.7, 8.3);
        
            marker(sol).addTo(mapElem).bindPopup('Sol');
            marker(mizar).addTo(mapElem).bindPopup('Mizar');
            marker(kruegerZ).addTo(mapElem).bindPopup('Krueger-Z');
            marker(deneb).addTo(mapElem).bindPopup('Deneb');
        
            polyline([sol, deneb]).addTo(mapElem);
        
            mapElem.setView(xy(120, 70), 1);
        }
    });

    return <div ref={mapDiv} class={styles.CrsSimple}/>;
}
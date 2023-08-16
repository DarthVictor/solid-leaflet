import { onMount } from "solid-js";
import { control, map, tileLayer } from "leaflet";

import styles from "./ZoomLevels.module.css"

export function ZoomLevels () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const mapElem = map(mapDiv, {
                minZoom: 0,
                maxZoom: 0
            });
            
            const cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';
            
            tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                attribution: cartodbAttribution
            }).addTo(mapElem);
            
            mapElem.setView([0, 0], 0);

            control.scale().addTo(mapElem);
        }
    });

    return <div ref={mapDiv} class={styles.ZoomLevels}/>;
}
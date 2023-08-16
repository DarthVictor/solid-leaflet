import { onMount } from "solid-js";
import { map, marker, tileLayer } from "leaflet";

import styles from "./Accessibility.module.css"

export function Accessibility () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {

            const mapElem = map(mapDiv).setView([50.4501, 30.5234], 4);
        
            tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapElem);
        
            marker([50.4501, 30.5234], {alt: 'Kyiv'}).addTo(mapElem)
                .bindPopup('Kyiv, Ukraine is the birthplace of Leaflet!');
        
        }
    });

    return <div ref={mapDiv} class={styles.Accessibility}/>;
}
import { onMount } from "solid-js";
import { circle, map, marker, tileLayer } from "leaflet";

import styles from "./Mobile.module.css"

export function Mobile () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const mapElem = map(mapDiv);
            mapElem.fitWorld();
            tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(mapElem);

            mapElem.locate({ setView: true, maxZoom: 16 });
            mapElem.on('locationfound', ({ latlng, accuracy }) => {
                marker(latlng).addTo(mapElem)
                    .bindPopup("You are within " + accuracy + " meters from this point").openPopup();
                circle(latlng, accuracy).addTo(mapElem);
            });
            mapElem.on('locationerror', (e) => alert(e.message));
        }
    });

    return <div ref={mapDiv} class={styles.secondExample}/>;
}
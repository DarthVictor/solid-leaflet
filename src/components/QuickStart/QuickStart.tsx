import { onMount } from "solid-js";
import { circle, map, marker, polygon, popup, tileLayer } from "leaflet";

import styles from "./QuickStart.module.css"

export function QuickStart () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const mapElem = map(mapDiv);
            mapElem.setView([51.505, -0.09], 13);
            tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(mapElem);
            
            const markerElem = marker([51.5, -0.09]).addTo(mapElem);
            markerElem.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

            const circleElem = circle([51.508, -0.11], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(mapElem);
            circleElem.bindPopup("I am a circle.");

            const polygonElem = polygon([
                [51.509, -0.08],
                [51.503, -0.06],
                [51.51, -0.047]
            ]).addTo(mapElem);
            polygonElem.bindPopup("I am a polygon.");

            const popupElem = popup();
            mapElem.on('click', (e) => {
                popupElem
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(mapElem);
            });
        }
    });

    return <div ref={mapDiv} class={styles.QuickStart}/>;
}
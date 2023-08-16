import { onMount } from "solid-js";
import { map, tileLayer, latLngBounds, imageOverlay, rectangle } from "leaflet";

import styles from "./ImageOverlay.module.css"

export function ImageOverlay () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const mapElem = map(mapDiv).setView([37.8, -96], 4);

            tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapElem);

            const imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
            const errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
            const altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
            const latLngBoundsVal = latLngBounds([[40.799311, -74.118464], [40.68202047785919, -74.33]]);
            imageOverlay(imageUrl, latLngBoundsVal, {
                opacity: 0.8,
                errorOverlayUrl: errorOverlayUrl,
                alt: altText,
                interactive: true
            }).addTo(mapElem);

            rectangle(latLngBoundsVal).addTo(mapElem);
            mapElem.fitBounds(latLngBoundsVal);
        }
    });

    return <div ref={mapDiv} class={styles.ImageOverlay}/>;
}
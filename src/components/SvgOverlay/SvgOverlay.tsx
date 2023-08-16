import { onMount } from "solid-js";
import { map, tileLayer, latLngBounds, svgOverlay } from "leaflet";

import styles from "./SvgOverlay.module.css"

export function SvgOverlay() {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const mapElem = map(mapDiv).setView([37.8, -96], 4);

            tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapElem);

            const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svgElement.setAttribute('viewBox', '0 0 200 200');
            svgElement.innerHTML = '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';
            const latLngBoundsElem = latLngBounds([[32, -130], [13, -100]]);
            mapElem.fitBounds(latLngBoundsElem);
            
            svgOverlay(svgElement, latLngBoundsElem, {
                opacity: 0.7,
                interactive: true
            }).addTo(mapElem);
        }
    });

    return <div ref={mapDiv} class={styles.SvgOverlay}/>;
}
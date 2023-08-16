import { onMount } from "solid-js";
import { Class, DivIcon, Icon, map, marker, tileLayer } from "leaflet";

import styles from "./CustomIcons.module.css"

const LeafIcon = Icon.extend({
    options: {
        shadowUrl: 'leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
}) as { new(p: { iconUrl: string }): DivIcon } & typeof Class

export function CustomIcons () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const mapElem = map(mapDiv);
            mapElem.setView([51.5, -0.09], 13);
            tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapElem);
            const greenIcon = new LeafIcon({ iconUrl: 'leaf-green.png' });
            const redIcon = new LeafIcon({ iconUrl: 'leaf-red.png' });
            const orangeIcon = new LeafIcon({ iconUrl: 'leaf-orange.png' });
            marker([51.5, -0.09], {icon: greenIcon}).addTo(mapElem).bindPopup("I am a green leaf.");
            marker([51.495, -0.083], {icon: redIcon}).addTo(mapElem).bindPopup("I am a red leaf.");
            marker([51.49, -0.1], {icon: orangeIcon}).addTo(mapElem).bindPopup("I am an orange leaf.");
        }
    });

    return <div ref={mapDiv} class={styles.CustomIcons}/>;
}
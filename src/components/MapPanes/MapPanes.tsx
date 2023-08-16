import { onMount } from "solid-js";
import { geoJson, map, tileLayer } from "leaflet";
import { euCountries } from "./eu-countries";
import type { Feature } from 'geojson'

import styles from "./MapPanes.module.css"

export function MapPanes () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const mapElem = map(mapDiv);
            mapElem.setView([51.505, -0.09], 13);

            mapElem.createPane('labels');

            // This pane is above markers but below popups
            mapElem.getPane('labels')!.style.zIndex = '650';

            // Layers in this pane are non-interactive and do not obscure mouse/touch events
            mapElem.getPane('labels')!.style.pointerEvents = 'none';

            var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

            tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
                attribution: cartodbAttribution
            }).addTo(mapElem);

            tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
                attribution: cartodbAttribution,
                pane: 'labels'
            }).addTo(mapElem);

            /* global euCountries */
            var geojson = geoJson(euCountries).addTo(mapElem);

            geojson.eachLayer((layer) => {
                layer.bindPopup((layer as unknown as { feature: Feature }).feature.properties?.name);
            });

            mapElem.setView({lat: 47.040182144806664, lng: 9.667968750000002}, 4);
        }
    });

    return <div ref={mapDiv} class={styles.MapPanes}/>;
}
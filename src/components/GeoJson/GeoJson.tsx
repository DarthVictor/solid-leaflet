import { onMount } from "solid-js";
import { circleMarker, geoJSON, icon, map, marker, tileLayer, Layer } from "leaflet";
import type { Feature, Geometry } from 'geojson'

import styles from "./GeoJson.module.css"
import { bicycleRental, campus, coorsField, freeBus } from "./sample";

const baseballIcon = icon({
    iconUrl: 'baseball-marker.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});

function onEachFeature(feature: Feature<Geometry>, layer: Layer) {
    let popupContent = '<p>I started out as a GeoJSON ' +
            feature.geometry.type + ', but now I\'m a Leaflet vector!</p>';

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}


export function GeoJson () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const mapElem = map(mapDiv).setView([39.74739, -105], 13);
        
            tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapElem);

            geoJSON([bicycleRental, campus], {
                style: (feature) => feature?.properties && feature.properties.style,
                onEachFeature,
                pointToLayer: (_feature, latlng) =>
                    circleMarker(latlng, {
                        radius: 8,
                        fillColor: '#ff7800',
                        color: '#000',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    })
            }).addTo(mapElem);

            geoJSON(freeBus, {
                filter: (feature) => !(feature.properties?.underConstruction),
                onEachFeature
            }).addTo(mapElem);

            geoJSON(coorsField, {
                pointToLayer: (_feature, latlng) => marker(latlng, {icon: baseballIcon}),
                onEachFeature
            }).addTo(mapElem);
        
        }
    });

    return <div ref={mapDiv} class={styles.GeoJson}/>;
}
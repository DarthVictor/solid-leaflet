import { onMount } from "solid-js";
import { layerGroup, map, marker, tileLayer, control } from "leaflet";

import styles from "./LayersControl.module.css"

export function LayersControl () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const cities = layerGroup();

            marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities);
            marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities);
            marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities);
            marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);
        
            const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
            const mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
         
            const streets = tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
        
            const osm = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            });
        
            const mapElem = map(mapDiv, {
                center: [39.73, -104.99],
                zoom: 10,
                layers: [osm, cities]
            });
        
            const baseLayers = {
                'OpenStreetMap': osm,
                'Streets': streets
            };
        
            const overlays = {
                'Cities': cities
            };
        
            const layerControl = control.layers(baseLayers, overlays).addTo(mapElem);
            const crownHill = marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.');
            const rubyHill = marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');
        
            const parks = layerGroup([crownHill, rubyHill]);
        
            const satellite = tileLayer(mbUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
            layerControl.addBaseLayer(satellite, 'Satellite');
            layerControl.addOverlay(parks, 'Parks');

        }
    });

    return <div ref={mapDiv} class={styles.LayersControl}/>;
}
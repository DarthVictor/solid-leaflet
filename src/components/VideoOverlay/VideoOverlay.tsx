import { onMount } from "solid-js";
import { map, tileLayer, latLngBounds, videoOverlay, Control, DomEvent, DomUtil } from "leaflet";

import styles from "./VideoOverlay.module.css"

export function VideoOverlay() {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {
            const mapElem = map(mapDiv).setView([37.8, -96], 4);

            tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapElem);

            var videoUrls = [
                'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
                'https://www.mapbox.com/bites/00188/patricia_nasa.mp4'
            ];
            var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
            var latLngBoundsVal = latLngBounds([[32, -130], [13, -100]]);
            
            const videoOverlayVal = videoOverlay(videoUrls, latLngBoundsVal, {
                opacity: 0.8,
                errorOverlayUrl: errorOverlayUrl,
                interactive: true,
                autoplay: true,
                muted: true,
                playsInline: true
            }).addTo(mapElem);

            videoOverlayVal.on('load', function () {
                const MyPauseControl = Control.extend({
                    onAdd: function() {
                        var button = DomUtil.create('button');
                        button.title = 'Pause';
                        button.innerHTML = '<span aria-hidden="true">⏸</span>';
                        DomEvent.on(button, 'click', function () {
                            videoOverlayVal.getElement()?.pause();
                        });
                        return button;
                    }
                });

                const MyPlayControl = Control.extend({
                    onAdd: function() {
                        var button = DomUtil.create('button');
                        button.title = 'Play';
                        button.innerHTML = '<span aria-hidden="true">▶️</span>';
                        DomEvent.on(button, 'click', function () {
                            videoOverlayVal.getElement()?.play();
                        });
                        return button;
                    }
                });
            
                new MyPauseControl().addTo(mapElem);
                new MyPlayControl().addTo(mapElem);
            });
        }
    });

    return <div ref={mapDiv} class={styles.VideoOverlay}/>;
}
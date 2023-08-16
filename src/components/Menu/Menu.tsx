import { A } from "@solidjs/router"

import styles from "./Menu.module.css"

export const Menu = () => {
    return (
        <nav class={styles.menu}>
            <A href="/quick-start">Leaflet Quick Start Guide</A>
            <A href="/mobile">Leaflet on Mobile</A>
            <A href="/custom-icons">Markers with Custom Icons</A>
            <A href="/accessibility">Accessible maps</A>
            <A href="/geojson">Using GeoJSON with Leaflet</A>
            <A href="/choropleth">Interactive Choropleth Map</A>
            <A href="/layers-control">Layer Groups and Layers Control</A>
            <A href="/crs-simple">Non-geographical maps</A>
            <A href="/map-panes">Working with map panes</A>
            <A href="/image-overlay">Overlays: Image</A>
            <A href="/video-overlay">Overlays: Video</A>
            <A href="/svg-overlay">Overlays: SVG</A>
        </nav>
    )
}

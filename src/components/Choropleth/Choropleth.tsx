import { onMount } from "solid-js";
import { map, tileLayer, geoJson, Browser, DomUtil, Control } from "leaflet";

import styles from "./Choropleth.module.css"
import { statesData } from "./states";

function getColor(d: number) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

class Info extends Control {
    _div: HTMLDivElement | undefined;

    onAdd() {
        this._div = DomUtil.create('div', styles.info); // create a div with a class "info"
        this.update();
        return this._div;
    };
    
    update(props?: { name: string, density: string }) {
        this._div!.innerHTML = '<h4>US Population Density</h4>' +  (props ?
            '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
            : 'Hover over a state');
    };
}


class Legend extends Control {
    constructor () {
        super({ position: 'bottomright'});
    }

    onAdd() {
        const div = DomUtil.create('div', `${styles.info} ${styles.legend}`);
        const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
            
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };
}



export function Choropleth () {
    let mapDiv: HTMLDivElement | undefined;
    onMount(() => {
        if (mapDiv != null) {

            const mapElem = map(mapDiv).setView([37.8, -96], 4);
        
            tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mapElem);
            
            const geojson = geoJson(
                statesData, 
                { 
                    style: (feature) => ({
                        fillColor: getColor(feature?.properties?.density ?? 0),
                        weight: 2,
                        opacity: 1,
                        color: 'white',
                        dashArray: '3',
                        fillOpacity: 0.7
                    }),
                    onEachFeature: (_feature, layer) => {
                        layer.on({
                            mouseover: ({ target }) => {
                                target.setStyle({
                                    weight: 5,
                                    color: '#666',
                                    dashArray: '',
                                    fillOpacity: 0.7
                                });
                            
                                if (!Browser.ie && !Browser.opera && !Browser.edge) {
                                    target.bringToFront();
                                }
                            },
                            mouseout:  ({ target }) => {
                                geojson.resetStyle(target);
                            },
                            click: ({ target }) => {
                                mapElem.fitBounds(target.getBounds());
                            }
                        });
                } 
            }).addTo(mapElem);

            const info = new Info();
            info.addTo(mapElem);

            const legend = new Legend();
            legend.addTo(mapElem);

            mapElem.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');

        }
    });

    return <div ref={mapDiv} class={styles.Choropleth}/>;
}
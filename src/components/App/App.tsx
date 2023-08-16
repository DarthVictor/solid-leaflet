import { Route, Routes } from '@solidjs/router';

import { Menu } from '../Menu/Menu';
import { QuickStart } from '../QuickStart/QuickStart';
import { Mobile } from '../Mobile/Mobile'
import { CustomIcons } from '../CustomIcons/CustomIcons';
import { Accessibility } from '../Accessibility/Accessibility';
import { GeoJson } from '../GeoJson/GeoJson';
import { Choropleth } from '../Choropleth/Choropleth';
import { LayersControl } from '../LayersControl/LayersControl';
import { ZoomLevels } from '../ZoomLevels/ZoomLevels';
import { CrsSimple } from '../CrsSimple/CrsSimple';
import { MapPanes } from '../MapPanes/MapPanes';
import { ImageOverlay } from '../ImageOverlay/ImageOverlay';
import { SvgOverlay } from '../SvgOverlay/SvgOverlay';
import { VideoOverlay } from '../VideoOverlay/VideoOverlay';

import 'leaflet/dist/leaflet.css';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" component={Menu} />
      <Route path="/quick-start" component={QuickStart} />
      <Route path="/mobile" component={Mobile} />
      <Route path="/custom-icons" component={CustomIcons} />
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/geojson" component={GeoJson} />
      <Route path="/choropleth" component={Choropleth} />
      <Route path="/layers-control" component={LayersControl} />
      <Route path="/zoom-levels" component={ZoomLevels} />
      <Route path="/crs-simple" component={CrsSimple} />
      <Route path="/map-panes" component={MapPanes} />
      <Route path="/image-overlay" component={ImageOverlay} />
      <Route path="/video-overlay" component={VideoOverlay} />
      <Route path="/svg-overlay" component={SvgOverlay} />
    </Routes>
  )
}

export default App

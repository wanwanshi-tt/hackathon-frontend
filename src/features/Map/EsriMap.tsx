import { useEffect, useRef } from 'react';
// import '@arcgis/core/assets/esri/themes/light/main.css';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

const EsriMap = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: 'topo-vector',
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-1.1743, 52.3555], // Longitude, latitude for England
        zoom: 6, // Zoom level to cover England
      });

      return () => {
        view.destroy();
      };
    }
  }, []);

  return (
    <div
      ref={mapDiv}
      style={{ height: '100%', width: '100%', outline: 'none' }}
      tabIndex={-1}
    ></div>
  );
};

export default EsriMap;

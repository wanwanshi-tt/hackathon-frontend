import { useEffect, useRef } from 'react';
// import '@arcgis/core/assets/esri/themes/light/main.css';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import Legend from '@arcgis/core/widgets/Legend';
import LayerList from '@arcgis/core/widgets/LayerList';
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

      view.when(() => {
        // Add heavy layers and widgets only after the view is ready
        const featureLayer = new GeoJSONLayer({
          url: 'https://testblobadysh1243.blob.core.windows.net/maplayers/Yorkshire Water Appointed Wastewater Boundaries_2815270447174429793.geojson',
          outFields: ['*'],
          visible: true,
        });

        const layer2 = new GeoJSONLayer({
          url: 'https://testblobadysh1243.blob.core.windows.net/maplayers/Northumbrian_Water_Storm_Overflow_Activity_2_view_1158731685660022164.geojson',
          outFields: ['*'],
          visible: true,
        });

        map.add(featureLayer);
        map.add(layer2);

        const legend = new Legend({
          view: view,
        });
        view.ui.add(legend, 'bottom-right');

        const layerList = new LayerList({
          view: view,
        });
        view.ui.add(layerList, 'top-right');
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

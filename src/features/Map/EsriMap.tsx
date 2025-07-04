import { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import Legend from '@arcgis/core/widgets/Legend';
import LayerList from '@arcgis/core/widgets/LayerList';
import Expand from '@arcgis/core/widgets/Expand';

const EsriMap = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer1 = new GeoJSONLayer({
      url: 'https://testblobadysh1243.blob.core.windows.net/maplayers/Yorkshire Water Appointed Wastewater Boundaries_2815270447174429793.geojson',
      outFields: ['*'],
      visible: true,
      popupEnabled: true,
      popupTemplate: {
        title: 'Yorkshire Water Boundary',
        content: (feature: {
          graphic: { attributes: Record<string, unknown> };
        }) => {
          const attributes = feature.graphic.attributes;
          let table = '<table>';
          for (const key in attributes) {
            table += `<tr><td><b>${key}</b></td><td>${attributes[key]}</td></tr>`;
          }
          table += '</table>';
          return table;
        },
      },
    });

    const layer2 = new GeoJSONLayer({
      url: 'https://testblobadysh1243.blob.core.windows.net/maplayers/Northumbrian_Water_Storm_Overflow_Activity_2_view_1158731685660022164.geojson',
      outFields: ['*'],
      visible: true,
      popupEnabled: true,
      popupTemplate: {
        title: 'Northumbrian Water Storm Overflow',
        content: (feature: {
          graphic: { attributes: Record<string, unknown> };
        }) => {
          const attributes = feature.graphic.attributes;
          let table = '<table>';
          for (const key in attributes) {
            table += `<tr><td><b>${key}</b></td><td>${attributes[key]}</td></tr>`;
          }
          table += '</table>';
          return table;
        },
      },
    });

    if (mapDiv.current) {
      const map = new Map({
        basemap: 'topo-vector',
        layers: [layer1, layer2], // Add layers to the map
      });

      const myView = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-1.1743, 52.3555], // Longitude, latitude for England
        zoom: 6, // Zoom level to cover England
      });

      myView.when(() => {
        // Add heavy layers and widgets only after the view is ready

        const legend = new Legend({
          view: myView,
        });
        const legendMenu = new Expand({
          view: myView,
          content: legend,
          mode: 'floating',
          expanded: true,
        });
        myView.ui.add(legendMenu, 'top-right');

        const layerList = new LayerList({
          view: myView,
        });
        myView.ui.add(layerList, 'top-right');
      });

      return () => {
        myView.destroy();
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

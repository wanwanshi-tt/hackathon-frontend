import { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import Legend from '@arcgis/core/widgets/Legend';
import LayerList from '@arcgis/core/widgets/LayerList';
import Expand from '@arcgis/core/widgets/Expand';

const RISK_COLORS = {
  high: [255, 0, 0, 0.4], // red, transparent
  medium: [255, 165, 0, 0.4], // orange, transparent
  low: [255, 255, 0, 0.3], // yellow, more transparent
};

const EsriMap = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer1 = new GeoJSONLayer({
      url: 'https://testblobadysh1243.blob.core.windows.net/maplayers/NW_Watercourse.geojson',
      outFields: ['*'],
      visible: true,
      title: 'Northumbrian Water Watercourse', // Set the layer name
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-line',
          color: '#0077cc', // blue
          width: 2,
        },
      },
      popupEnabled: true,
      popupTemplate: {
        title: 'Northumbrian Water Watercourse',
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
      title: 'Northumbrian Water Storm Overflow', // Set the layer name
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

    // Add grid risk layer
    const gridLayer = new GeoJSONLayer({
      url: 'https://testblobadysh1243.blob.core.windows.net/maplayers/River Grid .geojson', // <-- replace with your actual URL
      outFields: ['*'],
      visible: true,
      title: 'River Grid',
      renderer: {
        type: 'unique-value',
        field: 'risk_level',
        uniqueValueInfos: [
          {
            value: 'high',
            symbol: {
              type: 'simple-fill',
              color: RISK_COLORS.high,
              outline: { color: '#b30000', width: 1 },
            },
            label: 'High Risk',
          },
          {
            value: 'medium',
            symbol: {
              type: 'simple-fill',
              color: RISK_COLORS.medium,
              outline: { color: '#b36b00', width: 1 },
            },
            label: 'Medium Risk',
          },
          {
            value: 'low',
            symbol: {
              type: 'simple-fill',
              color: RISK_COLORS.low,
              outline: { color: '#b3b300', width: 1 },
            },
            label: 'Low Risk',
          },
        ],
        defaultSymbol: {
          type: 'simple-fill',
          color: [200, 200, 200, 0.1],
          outline: { color: '#888', width: 0.5 },
        },
      },
      popupEnabled: true,
      popupTemplate: {
        title: 'Risk Model Grid',
        content: (feature: {
          graphic: { attributes: Record<string, unknown> };
        }) => {
          const attributes = feature.graphic.attributes;
          let alert = '';
          if (attributes.risk_level === 'high') {
            alert =
              '<div style="display:flex;align-items:center;background:#ff0000;color:#fff;padding:8px 12px;margin-bottom:8px;font-weight:bold;border-radius:4px;font-size:1.1em;">' +
              '<span style="font-size:2em;margin-right:10px;color:#fff;">&#9650;</span>' +
              'ALERT: High Risk Area</div>';
          } else if (attributes.risk_level === 'medium') {
            alert =
              '<div style="display:flex;align-items:center;background:#ffbf00;color:#000;padding:8px 12px;margin-bottom:8px;font-weight:bold;border-radius:4px;font-size:1.1em;">' +
              '<span style="font-size:2em;margin-right:10px;color:#ff9900;">&#9650;</span>' +
              'Alert: Medium Risk Area</div>';
          }
          let table = '<table>';
          for (const key in attributes) {
            table += `<tr><td><b>${key}</b></td><td>${attributes[key]}</td></tr>`;
          }
          table += '</table>';
          return alert + table;
        },
      },
    });

    if (mapDiv.current) {
      const map = new Map({
        basemap: 'topo-vector',
        layers: [layer1, layer2, gridLayer], // Add gridLayer
      });

      // Import and add dummyPointsLayer
      import('./layers').then(({ dummyPointsLayer }) => {
        map.add(dummyPointsLayer);
      });

      const myView = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-1.6174, 54.9783], // Center on Newcastle
        zoom: 12, // Zoom in on Newcastle
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

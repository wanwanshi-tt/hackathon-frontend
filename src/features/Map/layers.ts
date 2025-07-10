import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';

// Helper: icon URLs for each type (consistent with RiskModel icons/colors)
const ICON_URLS: Record<string, string> = {
  camera: '/esri/images/question_icon.png', // blue question mark
  droplet: '/esri/images/droplet_icon.png', // green droplet
  alert: '/esri/images/alert_triangle_icon.png', // yellow/orange triangle
  pin: '/esri/images/map_pin_icon.png', // red map pin
  highRisk: '/esri/images/highRisk.png', // red high risk icon
};

// Create a GeoJSONLayer for dummy Newcastle points with icon renderer
export const dummyPointsLayer = new GeoJSONLayer({
  url: '/esri/dummy_points.geojson',
  title: 'Dummy Points (Newcastle)',
  outFields: ['*'],
  visible: true,
  renderer: {
    type: 'unique-value',
    field: 'icon',
    uniqueValueInfos: [
      {
        value: 'camera',
        symbol: {
          type: 'picture-marker',
          url: ICON_URLS.camera,
          width: 96,
          height: 96,
        },
        label: 'Low Data Coverage',
      },
      {
        value: 'droplet',
        symbol: {
          type: 'picture-marker',
          url: ICON_URLS.droplet,
          width: 96,
          height: 96,
        },
        label: 'Sensitive Area',
      },
      {
        value: 'alert',
        symbol: {
          type: 'picture-marker',
          url: ICON_URLS.alert,
          width: 96,
          height: 96,
        },
        label: 'Alert',
      },
      {
        value: 'pin',
        symbol: {
          type: 'picture-marker',
          url: ICON_URLS.pin,
          width: 96,
          height: 96,
        },
        label: 'Pin',
      },
      {
        value: 'highRisk',
        symbol: {
          type: 'picture-marker',
          url: ICON_URLS['highRisk'],
          width: 120,
          height: 120,
        },
        label: 'High Risk',
      },
    ],
  },
  popupTemplate: {
    title: '{name}',
    content: '{description}',
  },
});

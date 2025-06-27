import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import EsriMap from './features/Map/EsriMap';
import LandingPage from './pages/LandingPage';
import UploadingPage from './pages/UploadingPage';
import LoginPage from './pages/LoginPage';
import { Title } from '@mantine/core';

const Placeholder = ({ title }: { title: string }) => (
  <div
    style={{ padding: 40, textAlign: 'center', fontSize: 32, fontWeight: 700 }}
  >
    {title}
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Title>Maintenance</Title>} />
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="citizen-science" element={<UploadingPage />} />
        <Route path="model" element={<Placeholder title="Risk Model" />} />
        <Route
          path="environmental-data"
          element={<Placeholder title="Environmental Data" />}
        />
        <Route path="map" element={<EsriMap />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

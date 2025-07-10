import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import EsriMap from './features/Map/EsriMap';
import LandingPage from './pages/LandingPage';
import UploadingPage from './pages/UploadingPage';
import LoginPage from './pages/LoginPage';
import { Title } from '@mantine/core';
import RiskModel from './components/RiskModel/RiskModel';
import EnvData from './components/EnvData/EnvData';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Title>Maintenance</Title>} />
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="citizen-science" element={<UploadingPage />} />
        <Route path="model" element={<RiskModel />} />
        <Route path="environmental-data" element={<EnvData />} />
        <Route path="map" element={<EsriMap />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

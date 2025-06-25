import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import EsriMap from './features/Map/EsriMap';

import LandingPage from './pages/LandingPage';
import UploadingPage from './pages/UploadingPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="upload" element={<UploadingPage />} />
        <Route path="map" element={<EsriMap />} />
        {/* Uncomment these routes when the components are ready */}
        {/* <Route path="planner" element={<Planner />} />
      <Route path="review" element={<DataReview />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;

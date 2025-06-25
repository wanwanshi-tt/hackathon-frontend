import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import DashboardTabs from '../components/DashBoardTabs/DashboardTabs';

const Layout = () => {
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <AppShell
        header={{ height: 60 }}
        transitionDuration={500}
        transitionTimingFunction="ease"
        style={{ height: '100%', width: '100%', overflow: 'hidden' }}
      >
        <Header />
        <DashboardTabs />
        <AppShell.Main style={{ height: '100%', overflow: 'hidden' }} p={0}>
          <div style={{ height: '100%' }}>
            <Outlet />
          </div>
        </AppShell.Main>
      </AppShell>
    </div>
  );
};

export default Layout;

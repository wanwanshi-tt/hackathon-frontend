import { Tabs, Text, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../theme';
import classes from './DashboardTabs.module.css';

const DashboardTabs = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: '100%',
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: theme.colors.gray[0],
      }}
    >
      <Tabs
        mx="auto"
        my={0}
        style={{
          width: '80%',
          maxWidth: 1200,
          height: '100%',
          margin: 0,
        }}
        bg="gray.0"
        defaultValue="map"
        onChange={(value) => {
          if (value) navigate(`/${value}`);
        }}
        keepMounted={false}
        classNames={{ tab: classes.tab }}
      >
        <Tabs.List justify="center" grow style={{ height: '100%' }}>
          <Tabs.Tab value="map" size="xxl" fw={700} p={0} m={0}>
            <Group
              align="center"
              justify="center"
              gap={4}
              style={{ width: '100%' }}
            >
              <Text size="xxl">🗺️</Text>
              Map
            </Group>
          </Tabs.Tab>
          <Tabs.Tab value="citizen-science" size="xxl" fw={700} p={0}>
            <Group
              align="center"
              justify="center"
              gap={4}
              style={{ width: '100%' }}
            >
              <Text size="xxl">🧑‍🤝‍🧑</Text>
              Citizen Science
            </Group>
          </Tabs.Tab>
          <Tabs.Tab value="model" size="xxl" fw={700} p={0}>
            <Group
              align="center"
              justify="center"
              gap={4}
              style={{ width: '100%' }}
            >
              <Text size="xxl">📊</Text>
              Risk Model
            </Group>
          </Tabs.Tab>
          <Tabs.Tab value="environmental-data" size="xxl" fw={700} p={0}>
            <Group
              align="center"
              justify="center"
              gap={4}
              style={{ width: '100%' }}
            >
              <Text size="xxl">💧</Text>
              Environmental Data
            </Group>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;

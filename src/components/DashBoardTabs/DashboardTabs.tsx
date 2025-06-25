import { Tabs, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const DashboardTabs = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: '100%',
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tabs
        pt="1rem"
        mx="auto"
        my={0}
        style={{
          width: '90%',
          maxWidth: 1200,
          height: '100%',
        }}
        defaultValue="map"
        onChange={(value) => {
          if (value) navigate(`/${value}`);
        }}
        keepMounted={false}
      >
        <Tabs.List justify="center" grow style={{ height: '100%' }} p="md">
          <Tabs.Tab
            value="map"
            leftSection={<Text size="xxl">🗺️</Text>}
            size="xxl"
            fw={700}
            p={0}
          >
            Interactive Map
          </Tabs.Tab>
          <Tabs.Tab
            value="upload"
            leftSection={<IconUpload size={24} />}
            size="xxl"
          >
            Upload Data
          </Tabs.Tab>
          <Tabs.Tab value="upload" size="xxl">
            Upload Data
          </Tabs.Tab>
          <Tabs.Tab value="upload" size="xxl">
            Upload Data
          </Tabs.Tab>
          {/* <Tabs.Tab
          value="planner"
          leftSection={<IconCalendarEvent size={24} />}
          size="lg"
        >
          Sampling Planner
        </Tabs.Tab>
        <Tabs.Tab
          value="review"
          leftSection={<IconChecklist size={24} />}
          size="lg"
        >
          Review Data
        </Tabs.Tab> */}
        </Tabs.List>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;

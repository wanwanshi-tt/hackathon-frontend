import { useState } from 'react';
import {
  Card,
  Button,
  Text,
  Group,
  Table,
  Image,
  Divider,
  Select,
  Title,
  Stack,
} from '@mantine/core';

// Dummy data for illustration
const dummySites = [
  { value: 'site1', label: 'Riverbank Park' },
  { value: 'site2', label: 'Lakeside View' },
];

const dummyWaterQuality = [
  { date: '2025-07-01', ph: 7.2, turbidity: 2.1, nitrate: 1.5 },
  { date: '2025-07-05', ph: 7.0, turbidity: 2.5, nitrate: 1.7 },
  { date: '2025-07-10', ph: 6.8, turbidity: 3.0, nitrate: 2.0 },
];

const dummyActions = [
  {
    date: '2025-07-03',
    action: 'Authority issued warning for high turbidity.',
  },
  { date: '2025-07-06', action: 'Cleanup operation conducted.' },
];

const dummyImages = [
  {
    url: 'https://eyeonwater.org/media/eyeonwater_upload/33284.png',
    date: '2025-07-01',
  },
  {
    url: 'http://eyeonwater.org/media/eyeonwater_upload/33283.png',
    date: '2025-07-05',
  },
  {
    url: 'https://eyeonwater.org/media/eyeonwater_upload/33273.png',
    date: '2025-07-06',
  },
];

const EnvData = () => {
  const [selectedSite, setSelectedSite] = useState<string | null>(
    dummySites[0].value,
  );

  // Placeholder for download logic
  const handleDownload = () => {
    alert('Download functionality coming soon!');
  };

  return (
    <Card
      shadow="md"
      p="lg"
      radius="md"
      withBorder
      style={{ maxWidth: 900, margin: '2rem auto' }}
    >
      <Title order={2} mb="md">
        Environmental Data Portal
      </Title>
      <Stack gap="md">
        <Select
          label="Select Your Site"
          data={dummySites}
          value={selectedSite}
          onChange={setSelectedSite}
          mb="sm"
        />
        <Divider label="Water Quality Change" labelPosition="center" my="sm" />
        <Table striped highlightOnHover withColumnBorders>
          <thead>
            <tr>
              <th>Date</th>
              <th>pH</th>
              <th>Turbidity (NTU)</th>
              <th>Nitrate (mg/L)</th>
            </tr>
          </thead>
          <tbody>
            {dummyWaterQuality.map((row) => (
              <tr key={row.date}>
                <td>{row.date}</td>
                <td>{row.ph}</td>
                <td>{row.turbidity}</td>
                <td>{row.nitrate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Divider label="Authority Actions" labelPosition="center" my="sm" />
        <ul style={{ marginLeft: 20 }}>
          {dummyActions.map((a) => (
            <li key={a.date}>
              <b>{a.date}:</b> {a.action}
            </li>
          ))}
        </ul>
        <Divider label="User Uploaded Images" labelPosition="center" my="sm" />
        <Group>
          {dummyImages.map((img, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <Image
                src={img.url}
                width={120}
                height={80}
                radius="md"
                alt={`Sample taken on ${img.date}`}
              />
              <Text size="xs">{img.date}</Text>
            </div>
          ))}
        </Group>
        <Divider label="Downloadable Data" labelPosition="center" my="sm" />
        <Group gap="md">
          <Button
            component="a"
            href="/downloads/water_quality_report_site1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            color="teal"
            leftSection={
              <span role="img" aria-label="report">
                📄
              </span>
            }
          >
            Water Quality Report (Area)
          </Button>
          <Button
            component="a"
            href="/downloads/citizen_data_site1.csv"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            color="indigo"
            leftSection={
              <span role="img" aria-label="citizen">
                👥
              </span>
            }
          >
            Citizen Data (Area)
          </Button>
        </Group>
        <Button mt="lg" onClick={handleDownload} variant="filled" color="blue">
          Download Report
        </Button>
      </Stack>
    </Card>
  );
};

export default EnvData;

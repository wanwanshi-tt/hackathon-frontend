import {
  Card,
  Text,
  Title,
  List,
  ThemeIcon,
  Accordion,
  Group,
  Badge,
} from '@mantine/core';
import {
  IconAlertTriangle,
  IconMapPin,
  IconDroplet,
  IconQuestionMark,
} from '@tabler/icons-react';

const dummyData = [
  {
    title: 'Areas with Low Recent Data Coverage',
    icon: <IconQuestionMark size={28} color="#228be6" />,
    description: 'E.g. North Park, Riverbank, South Lake',
    highRisk: [
      { name: 'Heaton Park (Newcastle)', value: 14 },
      { name: 'Jesmond Dene (Newcastle)', value: 10 },
      { name: 'North Park', value: 12 },
      { name: 'Riverbank', value: 8 },
    ],
  },
  {
    title: 'Sensitive Area (Drinking Water Sources / Wetland)',
    icon: <IconDroplet size={28} color="#40c057" />,
    description: 'E.g. Wetland Reserve, City Reservoir',
    highRisk: [
      { name: 'Leazes Park Lake (Newcastle)', value: 16 },
      { name: 'City Reservoir', value: 10 },
      { name: 'Wetland Reserve', value: 15 },
    ],
  },
  {
    title: 'Recent Risk Indicator',
    icon: <IconAlertTriangle size={28} color="#faad14" />,
    description: 'E.g. High nitrate at East Well, E. coli at River Mouth',
    highRisk: [
      { name: 'Ouseburn (Newcastle)', value: 19 },
      { name: 'East Well', value: 20 },
      { name: 'River Mouth', value: 18 },
    ],
  },
  {
    title: 'Places with Anomalous Data / Outliers Need Confirmation',
    icon: <IconMapPin size={28} color="#ff6b6b" />,
    description: 'E.g. Outlier at Old Mill, Sudden spike at West Dam',
    highRisk: [
      { name: 'Town Moor (Newcastle)', value: 21 },
      { name: 'Old Mill', value: 22 },
      { name: 'West Dam', value: 17 },
    ],
  },
];

// Dummy map image for demonstration
const MAP_IMAGE_URL = '/assets/images/newcastle_map_sample.png';

const RiskBar = ({
  value,
  max = 25,
  color = '#fa5252',
}: {
  value: number;
  max?: number;
  color?: string;
}) => (
  <div
    style={{
      width: 120,
      height: 12,
      background: '#eee',
      borderRadius: 6,
      overflow: 'hidden',
      marginRight: 8,
    }}
  >
    <div
      style={{
        width: `${(value / max) * 100}%`,
        height: '100%',
        background: color,
        transition: 'width 0.3s',
      }}
    />
  </div>
);

const RiskModel = () => {
  return (
    <Card shadow="md" p="lg" radius="md" withBorder w="70%" mx="auto" mt="xl">
      <Title order={3} mb="md" style={{ color: '#228be6' }}>
        Risk Model Aspects
      </Title>
      <img
        src={MAP_IMAGE_URL}
        alt="Newcastle Risk Map"
        style={{
          width: '100%',
          maxWidth: 600,
          borderRadius: 12,
          margin: '0 auto 2rem auto',
          display: 'block',
          boxShadow: '0 2px 12px #0001',
        }}
      />
      <Accordion variant="separated">
        {dummyData.map((aspect, idx) => (
          <Accordion.Item value={aspect.title} key={idx}>
            <Accordion.Control
              icon={
                <ThemeIcon variant="light" size={40} radius="xl">
                  {aspect.icon}
                </ThemeIcon>
              }
            >
              <Group>
                <Text fw={600}>{aspect.title}</Text>
                <Badge color="red" variant="light" size="md">
                  {aspect.highRisk.length} high risk
                </Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" c="dimmed" mb="xs">
                {aspect.description}
              </Text>
              <List spacing="xs" size="sm">
                {aspect.highRisk.map((item, i) => (
                  <List.Item key={i}>
                    <Group>
                      <Text fw={500}>{item.name}</Text>
                      <RiskBar value={item.value} />
                      <Text size="xs" c="red">
                        {item.value}
                      </Text>
                    </Group>
                  </List.Item>
                ))}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
};

export default RiskModel;

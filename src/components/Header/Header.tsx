import { Title, Paper } from '@mantine/core';

const Header = () => {
  return (
    <Paper
      shadow="xs"
      p="md"
      bg="primary.9"
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        color: 'white',
      }}
    >
      <Title order={2} style={{ color: 'white', textAlign: 'center' }}>
        Converter Tool
      </Title>
    </Paper>
  );
};

export default Header;

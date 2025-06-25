import { Button, Center, Paper, Title, Stack } from '@mantine/core';

const LoginPage = () => (
  <Center style={{ height: '100vh' }}>
    <Paper p="xl" shadow="md" radius="md">
      <Title order={2} mb="md">
        Sign in to Water Data Portal
      </Title>
      <Stack>
        <Button
          fullWidth
          color="indigo"
          size="lg"
          onClick={() => (window.location.href = '/.auth/login/aad')}
        >
          Sign in with Entra ID
        </Button>
        <Button
          fullWidth
          color="dark"
          size="lg"
          onClick={() => (window.location.href = '/.auth/login/github')}
        >
          Sign in with GitHub
        </Button>
      </Stack>
    </Paper>
  </Center>
);

export default LoginPage;

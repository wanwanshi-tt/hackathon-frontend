import {
  Title,
  Paper,
  Button,
  Group,
  Loader,
  Avatar,
  Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';

const Header = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuthUser();
  const principal = user?.clientPrincipal;

  return (
    <Paper
      shadow="xs"
      p="md"
      bg="primary.9"
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
      }}
    >
      <Title order={2} style={{ color: 'white', textAlign: 'center' }}>
        Converter Tool
      </Title>
      <Group>
        {loading ? (
          <Loader color="white" size="sm" />
        ) : principal ? (
          <Group>
            <Avatar color="blue" radius="xl">
              {principal.userDetails[0]}
            </Avatar>
            <Text c="white" fw={500}>
              {principal.userDetails}
            </Text>
            <Button
              size="xs"
              color="gray"
              variant="outline"
              onClick={() => (window.location.href = '/.auth/logout')}
            >
              Logout
            </Button>
          </Group>
        ) : (
          <Button
            size="xs"
            color="white"
            variant="outline"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </Group>
    </Paper>
  );
};

export default Header;

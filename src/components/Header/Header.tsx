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
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
      }}
    >
      <Group
        style={{
          alignItems: 'center',
          gap: 12,
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <img
          src="/assets/images/logo_plain.png"
          alt="Logo"
          style={{
            height: 80,
            width: 120,
            objectFit: 'contain',
          }}
        />
        <Title
          order={2}
          style={{
            color: 'white',
            textAlign: 'center',
            margin: 0,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/assets/images/title.png"
            alt="Aquawatch Logo"
            style={{ maxHeight: 45 }}
          />
        </Title>
      </Group>
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

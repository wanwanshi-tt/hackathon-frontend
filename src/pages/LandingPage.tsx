import { Title } from '@mantine/core';

const LandingPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#eaf6ff',
      }}
    >
      <img
        src="/assets/images/landing.png"
        alt="Landing Page"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'brightness(0.85)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Title
          style={{
            color: '#228be6',
            fontSize: 48,
            textShadow: '0 2px 12px #fff8',
          }}
        >
          Intro
        </Title>
      </div>
    </div>
  );
};

export default LandingPage;

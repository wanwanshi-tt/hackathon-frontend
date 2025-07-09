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
    </div>
  );
};

export default LandingPage;

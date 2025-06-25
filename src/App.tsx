import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes'; // Adjust the path if needed
import { theme } from './theme'; // Adjust the path or define theme here
import '@mantine/core/styles.css';
function App() {
  return (
    <StrictMode>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Router>
          <AppRoutes />
        </Router>
      </MantineProvider>
    </StrictMode>
  );
}

export default App;

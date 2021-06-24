import React from 'react';
import { Router } from './src/routes/Router';
import { AppProvider } from './src/contexts/AppContext';

const App = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
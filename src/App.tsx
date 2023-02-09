import React from 'react';
import { AppRoutes } from './pages/routes';
import { GlobalContext } from './context';

function App() {
  return (
    <GlobalContext>
      <AppRoutes />
    </GlobalContext>
  );
}

export default App;

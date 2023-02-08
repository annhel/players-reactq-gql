import React from 'react';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import { PlayerUpdateForm } from './components/update-player';
import { PlayerInfo } from './components/view-players';

function App() {
  return (
    <QueryClientProvider client={new QueryClient}>

      <PlayerInfo/>
      <PlayerUpdateForm/>
      
    </QueryClientProvider>
  );
}

export default App;

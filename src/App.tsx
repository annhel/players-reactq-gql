import React from 'react';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import "./App.css"
import { RegisterPlayer } from './components/register-player';
import { PlayerUpdateForm } from './components/update-player';
import { PlayerInfo } from './components/view-players';

function App() {
  return (
    <QueryClientProvider client={new QueryClient}>

      <PlayerInfo/>
      <PlayerUpdateForm/>
      <RegisterPlayer/>

    </QueryClientProvider>
  );
}

export default App;

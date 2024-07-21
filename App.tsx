import React from 'react';
import { PokemonProvider } from './src/context/PokemonContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <PokemonProvider>
    <AppNavigator />
    </PokemonProvider>
  );
};

export default App;

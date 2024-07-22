import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';
import { PokemonProvider } from './src/context/PokemonContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <PokemonProvider>
        <AppNavigator />
      </PokemonProvider>
    </PaperProvider>
  );
};

export default App;

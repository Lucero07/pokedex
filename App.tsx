import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { PokemonProvider } from './src/context/PokemonContext';
import { BackgroundColorProvider } from './src/context/BackgroundColorContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <PokemonProvider>
        <BackgroundColorProvider>
          <AppNavigator />
        </BackgroundColorProvider>
      </PokemonProvider>
    </PaperProvider>
  );
};

export default App;

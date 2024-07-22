import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

interface PokemonProviderProps {
  children: React.ReactNode;
}

const StyledNavigationContainer: React.FC<PokemonProviderProps> = ({ children }) => {
  return (
    <View style= { styles.container } >
    <NavigationContainer>
    { children }
    </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StyledNavigationContainer;

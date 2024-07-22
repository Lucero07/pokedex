import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const StyledNavigationContainer: React.FC = ({ children }) => {
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
    backgroundColor: 'red',
  },
});

export default StyledNavigationContainer;

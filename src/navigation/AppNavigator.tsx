import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import StyledNavigationContainer from './StyledNavigationContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { View, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <StyledNavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: '#fff',
        })}
      >
        <Stack.Screen
          name="Pokédex"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <MaterialCommunityIcons
                  name="pokeball"
                  size={24}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.headerTitle}> Pokédex </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </StyledNavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DC0A2D',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF', 
    fontSize: 24,
    marginLeft: 4, 
  },
  icon: {
    marginRight: 4, 
  },
});
export default AppNavigator;

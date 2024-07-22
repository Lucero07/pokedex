import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import StyledNavigationContainer from './StyledNavigationContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useBackgroundColor } from '../context/BackgroundColorContext';
import { View, Text, StyleSheet } from 'react-native';
import PokemonContext from '../context/PokemonContext';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const { pokemonDetails } = useContext(PokemonContext);
  const { backgroundColor, setBackgroundColor } = useBackgroundColor();

  return (
    <StyledNavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTitleStyle: styles.headerTitle,
          headerTintColor: '#FFFFFF',
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
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerTitle: () => (
              <View>
                <Text style={styles.title}> {pokemonDetails ? pokemonDetails.name : 'Pokémon Details'}</Text>
              </View>
            ),
          }}
        />
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
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'capitalize',
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

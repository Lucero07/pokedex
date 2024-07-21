import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { usePokemon } from '../hooks/usePokemon';

type RootStackParamList = {
  Detail: { pokemon: { id: number; name: string; } };
};

const DetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const { pokemon } = route.params;
  const { getPokemonById } = usePokemon();

  const handleNext = () => {
    const nextPokemon = getPokemonById(pokemon.id + 1);
    if (nextPokemon) {
      navigation.navigate('Detail', { pokemon: nextPokemon });
    }
  };

  const handlePrev = () => {
    const prevPokemon = getPokemonById(pokemon.id - 1);
    if (prevPokemon) {
      navigation.navigate('Detail', { pokemon: prevPokemon });
    }
  };

  return (
    <View style= { styles.container } >
    <Image
        style={ styles.image }
  source = {{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png` }
}
      />
  < Text style = { styles.name } > { pokemon.name } </Text>
    < View style = { styles.buttons } >
      <Button title="Previous" onPress = { handlePrev } />
        <Button title="Next" onPress = { handleNext } />
          </View>
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
  },
});

export default DetailScreen;

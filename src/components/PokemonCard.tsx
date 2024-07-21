import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePokemon } from '../hooks/usePokemon';

interface PokemonCardProps {
  name: string;
  id: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, id }) => {
  const navigation = useNavigation();
  const { getPokemonById } = usePokemon();

  const handlePress = () => {
    const pokemon = getPokemonById(id);
    if (pokemon) {
      navigation.navigate('Detail', { pokemon });
    }
  };

  return (
    <TouchableOpacity style= { styles.card } onPress = { handlePress } >
      <Image
        style={ styles.image }
  source = {{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }
}
      />
  < Text style = { styles.name } > { name } </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default PokemonCard;

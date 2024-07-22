import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePokemon } from '../hooks/usePokemon';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Detail: { id: number };
};

interface PokemonCardProps {
  name: string;
  id: number;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, id }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (id) {
      navigation.navigate('Detail', { id });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.halfBackgroundTop} />
      <View style={styles.halfBackgroundBottom} />
      <Text style={styles.id}>#{id.toString().padStart(3, '0')} </Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          }}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.name}> {name} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    width: '30%',
    aspectRatio: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  id: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 8,
    fontWeight: 'regular',
    color: '#000',
  },
  imageContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  name: {
    marginTop: 1,
    fontSize: 10,
    fontWeight: 'regular',
    textTransform: 'capitalize',
    color: '#000',
  },
  halfBackgroundTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  halfBackgroundBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
});

export default PokemonCard;

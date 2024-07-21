import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { usePokemon } from '../hooks/usePokemon';

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const { pokemons, searchPokemon, sortPokemonsByName, sortPokemonsById } =
    usePokemon();

  const filteredPokemons = search ? searchPokemon(search) : pokemons;

  return (
    <View style= { styles.container } >
    <SearchBar value={ search } onChange = { setSearch } />
      <View style={ styles.buttons }>
        <Button title="Sort by Name" onPress = { sortPokemonsByName } />
          <Button title="Sort by ID" onPress = { sortPokemonsById } />
            </View>
            < FlatList
  data = { filteredPokemons }
  keyExtractor = { item => item.id.toString()}
renderItem = {({ item }) => <PokemonCard name={ item.name } id = { item.id } />}
numColumns = { 2}
  />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default HomeScreen;

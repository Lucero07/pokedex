import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import SortMenu from '../components/SortMenu';
import SearchBar from '../components/SearchBar';
import { usePokemon } from '../hooks/usePokemon';

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const { pokemons, searchPokemon, sortPokemonsByName, sortPokemonsById } = usePokemon();

  const filteredPokemons = search ? searchPokemon(search) : pokemons;

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <View style={styles.searchBarContainer}>
          <SearchBar value={search} onChange={setSearch} />
        </View>
        <SortMenu />
      </View>
      <FlatList
        data={filteredPokemons}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <PokemonCard name={item.name} id={item.id} />}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC0A2D',
    padding: 10,
  },
  searchBarContainer: {
    flex: 1,
    marginRight: 10,
  },
 
});

export default HomeScreen;

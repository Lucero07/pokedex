import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

interface Pokemon {
  name: string;
  url: string;
  id: number;
}

interface PokemonContextData {
  pokemons: Pokemon[];
  getPokemonById(id: number): Pokemon | undefined;
  searchPokemon(name: string): Pokemon[];
  sortPokemonsByName(): void;
  sortPokemonsById(): void;
}

const PokemonContext = createContext<PokemonContextData>(
  {} as PokemonContextData,
);

export const PokemonProvider: React.FC = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function loadPokemons() {
      const response = await api.get('pokemon?limit=300');
      const fetchedPokemons = response.data.results.map(
        (pokemon: any, index: number) => ({
          ...pokemon,
          id: index + 1,
        }),
      );
      setPokemons(fetchedPokemons);
    }
    loadPokemons();
  }, []);

  function getPokemonById(id: number): Pokemon | undefined {
    return pokemons.find(pokemon => pokemon.id === id);
  }

  function searchPokemon(name: string): Pokemon[] {
    return pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  function sortPokemonsByName() {
    setPokemons(prevPokemons =>
      [...prevPokemons].sort((a, b) => a.name.localeCompare(b.name)),
    );
  }

  function sortPokemonsById() {
    setPokemons(prevPokemons => [...prevPokemons].sort((a, b) => a.id - b.id));
  }

  return (
    <PokemonContext.Provider
      value= {{
    pokemons,
      getPokemonById,
      searchPokemon,
      sortPokemonsByName,
      sortPokemonsById,
      }
}
    >
  { children }
  </PokemonContext.Provider>
  );
};

export default PokemonContext;

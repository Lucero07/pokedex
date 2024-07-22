import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

interface Pokemon {
  name: string;
  url: string;
  id: number;
}

interface PokemonDetails {
  name: string;
  id: number;
  weight: number;
  height: number;
  moves: any[];
  stats: { stat: { name: string }; base_stat: number }[];
  types: { type: { name: string } }[];
}

interface PokemonDescription {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

interface PokemonProviderProps {
  children: React.ReactNode;
}

interface PokemonContextData {
  pokemons: Pokemon[];
  pokemonDetails: PokemonDetails | null;
  pokemonDescription: PokemonDescription | null;
  getPokemonById(id: number): Promise<PokemonDetails | null>;
  getDescriptionById(id: number): Promise<PokemonDescription | null>;
  searchPokemon(name: string): Pokemon[];
  sortPokemonsByName(): void;
  sortPokemonsById(): void;
  setPokemonDetails: React.Dispatch<React.SetStateAction<PokemonDetails | null>>;
  setPokemonDescription: React.Dispatch<React.SetStateAction<PokemonDescription | null>>;
}

const PokemonContext = createContext<PokemonContextData>(
  {} as PokemonContextData,
);

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  const [pokemonDescription, setPokemonDescription] = useState<PokemonDescription | null>(null);

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

  async function getPokemonById(id: number): Promise<PokemonDetails | null> {
    try {
      if (!id) {
        console.error('ID is undefined');
        return null;
      }
      const response = await api.get(`pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      return null;
    }
  }

  async function getDescriptionById(id: number): Promise<PokemonDescription | null> {
    try {
      if (!id) {
        console.error('ID is undefined');
        return null;
      }
      const response = await api.get(`pokemon-species/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon descriptions:', error);
      return null;
    }
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
      value={{
        pokemons,
        pokemonDetails,
        pokemonDescription,
        getPokemonById,
        getDescriptionById,
        searchPokemon,
        sortPokemonsByName,
        sortPokemonsById,
        setPokemonDetails,
        setPokemonDescription,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;

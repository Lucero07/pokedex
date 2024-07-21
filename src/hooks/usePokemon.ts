import { useContext } from 'react';
import PokemonContext from '../context/PokemonContext';

export function usePokemon() {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error('no se usa context');
  }

  return context;
}

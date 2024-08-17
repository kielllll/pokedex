import { atomWithStorage } from 'jotai/utils'
import { Pokemon } from './queries/pokemons'

export const pokemonsAtom = atomWithStorage<Pokemon[]>('pokemons', [])

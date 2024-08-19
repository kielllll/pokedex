import { atomWithStorage } from 'jotai/utils'
import { Pokemon } from './queries/pokemons'
import { Atom, getDefaultStore } from 'jotai'

export const pokemonsAtom = atomWithStorage<Pokemon[]>('pokemons', [])

export const getStoredValue = (atom: Atom<Pokemon[]>) => {
  return new Promise((resolve) => {
    const unsubscribe = getDefaultStore().sub(atom, () => {
      unsubscribe()
      resolve(getDefaultStore().get(atom))
    })

    const value = getDefaultStore().get(atom)

    if (value.length > 0) {
      unsubscribe()
      resolve(value)
    }

    resolve(value)
  })
}

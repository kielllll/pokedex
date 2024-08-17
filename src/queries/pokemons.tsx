import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import {
  convertDecimetersToFeetAndInches,
  convertHectoresToKilograms,
} from '../lib/utils'
import { getStoredValue, pokemonsAtom } from '../atoms'

export const useGetPokemons = (args?: {
  limit?: number | string
  offset?: number | string
  includeCustom?: boolean
}) => {
  return useQuery({
    queryKey: ['pokemons', args?.limit ?? '', args?.offset ?? ''],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, string | number, string | number]>) => {
      try {
        const [_, limit, offset] = queryKey

        let res: {
          name: string
        }[] = []

        if (args?.includeCustom) {
          const customPokemons = (await getStoredValue(
            pokemonsAtom
          )) as Pokemon[]

          if (customPokemons.length > +offset) {
            res = customPokemons
          }
        }

        const response = await fetch(
          `${import.meta.env.VITE_POKE_API_URL}/pokemon?limit=${
            +limit - res.length
          }&offset=${offset}`
        )
        const data = await response.json()

        return {
          count: data.count,
          results: [...res, ...data.results],
        }
      } catch (error: any) {
        console.log(error)
        throw new Error('pokemons.tsx - useGetPokemons: ' + error.message)
      }
    },
  })
}

export type Pokemon = {
  id: number
  name: string
  height: string | number
  weight: string | number
  types: string[]
  abilities: string[]
  stats: {
    name: string
    value: number
  }[]
  isCustom?: boolean
  imageUrl?: string
}

export const useGetPokemon = (name: string) => {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
      try {
        const [_, name] = queryKey

        // Check first if it exists in the persistence layer
        const pokemons = (await getStoredValue(pokemonsAtom)) as Pokemon[]
        const pokemon = pokemons?.find(
          (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
        )

        if (pokemon) return pokemon

        const response = await fetch(
          `${import.meta.env.VITE_POKE_API_URL}/pokemon/${name}`
        )

        // if pokemon is found, shape the response
        if (response.ok) {
          const data = await response.json()

          const { feet, inches } = convertDecimetersToFeetAndInches(data.height)
          const height = `${feet}' ${inches}"`

          const formattedData = {
            id: data.id,
            name: data.name,
            height,
            weight: `${convertHectoresToKilograms(data.weight)} kg`,
            types: data.types.map(
              ({ type }: { type: Record<string, string> }) => type.name
            ),
            abilities: data.abilities
              ?.filter(({ is_hidden }: { is_hidden: boolean }) => !is_hidden)
              .map(
                ({ ability }: { ability: Record<string, string> }) =>
                  ability.name
              ),
            stats: data.stats.map(
              ({
                base_stat,
                stat,
              }: {
                base_stat: number
                stat: Record<string, string>
              }) => ({
                value: base_stat,
                name: stat.name,
              })
            ),
          }

          return formattedData as Pokemon
        }

        // Pokemon not found on both api and local storage
        throw new Error('Pokemon not found')
      } catch (error: any) {
        console.log(error)
        throw new Error('pokemons.tsx - useGetPokemon: ' + error.message)
      }
    },
  })
}

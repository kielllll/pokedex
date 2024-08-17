import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import {
  convertDecimetersToFeetAndInches,
  convertHectoresToKilograms,
} from '../lib/utils'

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
        const response = await fetch(
          `${
            import.meta.env.VITE_POKE_API_URL
          }/pokemon?limit=${limit}&offset=${offset}`
        )
        const data = await response.json()

        return data
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
        const response = await fetch(
          `${import.meta.env.VITE_POKE_API_URL}/pokemon/${name}`
        )
        const data = await response.json()

        if (data) {
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
              .map(({ ability }: { ability: Record<string, string> }) => {
                const capitalizedName =
                  ability.name.charAt(0).toUpperCase() + ability.name.slice(1)

                return capitalizedName
              })
              .join(', '),
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

        throw new Error('Pokemon not found')
      } catch (error: any) {
        console.log(error)
        throw new Error('pokemons.tsx - useGetPokemon: ' + error.message)
      }
    },
  })
}

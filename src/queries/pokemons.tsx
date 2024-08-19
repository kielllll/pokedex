import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { convertHectoresToKilograms } from '../lib/utils'
import { getStoredValue, pokemonsAtom } from '../atoms'

export const useGetPokemons = (args?: {
  limit?: number | string
  offset?: number | string
  includeCustom?: boolean
}) => {
  return useQuery({
    queryKey: [
      'pokemons',
      args?.limit ?? '',
      args?.offset ?? '',
      !!args?.includeCustom,
    ],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<
      [string, string | number, string | number, boolean]
    >) => {
      try {
        const [, limit, offset, includeCustom] = queryKey

        if (+limit === 0)
          return {
            count: 0,
            results: [],
          }

        let res: {
          name: string
        }[] = []

        let newOffset = +offset

        if (includeCustom) {
          const customPokemons = (await getStoredValue(
            pokemonsAtom
          )) as Pokemon[]

          // only add custom pokemons if count is > than offset
          // higher offset means skip localstorage and fetch to api
          if (customPokemons.length > +offset) {
            // early return if limit is <= custom pokemons
            if (+limit <= customPokemons.length) {
              const customPokemonsSlice = [...customPokemons].slice(
                +offset,
                +offset + +limit
              )

              if (customPokemonsSlice.length === limit) {
                return {
                  count: customPokemons.length,
                  results: customPokemonsSlice,
                }
              }

              // if remaining pokemons are < limit, continue
              res = customPokemonsSlice
            } else {
              // prefill response from custom pokemons
              res = customPokemons
            }
          }

          // reset offset res count is === offset to cater first few pokemons from api
          if (res.length === 0) {
            newOffset -= customPokemons.length
          }
        }

        const response = await fetch(
          `${import.meta.env.VITE_POKE_API_URL}/pokemon?limit=${
            +limit - res.length
          }&offset=${newOffset}`
        )
        const data = await response.json()

        return {
          count: data.count,
          results: [...res, ...data.results],
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        const [, name] = queryKey

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

          const formattedData = {
            id: data.id,
            name: data.name,
            height: data.height,
            weight: convertHectoresToKilograms(data.weight),
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error)
        throw new Error('pokemons.tsx - useGetPokemon: ' + error.message)
      }
    },
  })
}

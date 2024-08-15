import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

export type Pokemon = {
  id: number
  name: string
  imageUrl: string
  types: string[]
}

export const useGetPokemons = (args?: {
  limit?: number | string
  offset?: number | string
  includeNew?: boolean
}) => {
  return useQuery({
    queryKey: [
      'pokemons',
      args?.limit ?? '',
      args?.offset ?? '',
      args?.includeNew ?? true,
    ],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<
      [string, string | number, string | number, boolean]
    >) => {
      const [_, limit, offset, includeNew] = queryKey
      const response = await fetch(
        `${
          import.meta.env.VITE_POKEDEX_API_URL
        }?limit=${limit}&offset=${offset}&includeNew=${includeNew}`
      )
      const data = await response.json()

      return data as Partial<Pokemon>[]
    },
  })
}

export const useGetPokemon = (args: { id: number; initial?: boolean }) => {
  return useQuery({
    queryKey: ['pokemon', args.id, !!args?.initial],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, number, boolean]>) => {
      const [_, id, initial] = queryKey
      const response = await fetch(
        `${import.meta.env.VITE_POKEDEX_API_URL}/${id}?initial=${initial}`
      )
      const data = await response.json()

      return data as Pokemon
    },
  })
}

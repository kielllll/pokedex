import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

export const useGetPokemons = (args?: {
  limit?: number | string
  offset?: number | string
}) => {
  return useQuery({
    queryKey: ['pokemons', args?.limit ?? '', args?.offset ?? ''],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, string | number, string | number]>) => {
      const [_, limit, offset] = queryKey
      console.log('invoked')
      const response = await fetch(
        `${
          import.meta.env.VITE_POKE_API_URL
        }/pokemon?limit=${limit}&offset=${offset}`
      )
      const data = await response.json()

      return data
    },
  })
}

export const useGetPokemon = (name: string) => {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
      const [_, name] = queryKey
      const response = await fetch(
        `${import.meta.env.VITE_POKE_API_URL}/pokemon/${name}`
      )
      const data = await response.json()

      return data
    },
  })
}

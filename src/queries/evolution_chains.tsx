import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { mapEvolutionChainToPokemon } from '../lib/utils'

export const useGetEvolutionChain = (name: string) => {
  return useQuery({
    queryKey: ['evolution_chain', name],
    queryFn: async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
      try {
        const [_, name] = queryKey
        const speciesResponse = await fetch(
          `${import.meta.env.VITE_POKE_API_URL}/pokemon-species/${name}`
        )

        const species = await speciesResponse.json()

        if (species) {
          const evolutionChainResponse = await fetch(
            species.evolution_chain.url
          )

          const evolutionChain = await evolutionChainResponse.json()
          let pokemons: string[] = []
          mapEvolutionChainToPokemon(evolutionChain.chain, pokemons)

          return pokemons
        }

        throw new Error('Species not found')
      } catch (error: any) {
        console.log(error)
        throw new Error('pokemons.tsx - useGetEvolutionChain: ' + error.message)
      }
    },
  })
}

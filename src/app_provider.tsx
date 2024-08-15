import { createContext, useContext } from 'react'
import { useGetPokemons } from './queries/pokemons'

export type PokemonResponse = {
  name: string
  url: string
}

type AppContextType = {
  states: {
    count: number
    pokemons: undefined | PokemonResponse[]
    loadingPokemons: boolean
  }
  actions: Record<string, any>
}

const AppContext = createContext<AppContextType>({
  states: {
    count: 0,
    pokemons: [],
    loadingPokemons: false,
  },
  actions: {},
})

export function useAppContext() {
  return useContext(AppContext)
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetPokemons({
    limit: 12,
    offset: 0,
  })

  const count = data?.count || 0
  const pokemons = data?.results ?? []

  return (
    <AppContext.Provider
      value={{
        states: {
          count,
          pokemons,
          loadingPokemons: isLoading,
        },
        actions: {},
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

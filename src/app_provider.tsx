import { createContext, useContext, useState } from 'react'
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
    offset: number
  }
  actions: Record<string, any>
}

const AppContext = createContext<AppContextType>({
  states: {
    count: 0,
    pokemons: [],
    loadingPokemons: false,
    offset: 0,
  },
  actions: {},
})

export function useAppContext() {
  return useContext(AppContext)
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [limit, setLimit] = useState(12)
  const [offset, setOffset] = useState(0)
  const [includeCustom, setIncludeCustom] = useState(true)
  const { data, isLoading } = useGetPokemons({
    limit,
    offset,
    includeCustom,
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
          offset,
        },
        actions: {
          setLimit,
          setIncludeCustom,
          setOffset,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

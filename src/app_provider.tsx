import React, { createContext, useContext, useState } from 'react'
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
  actions: {
    setLimit: React.Dispatch<React.SetStateAction<number>>
    setIncludeCustom: React.Dispatch<React.SetStateAction<boolean>>
    setOffset: React.Dispatch<React.SetStateAction<number>>
  }
}

const AppContext = createContext<AppContextType>({
  states: {
    count: 0,
    pokemons: [],
    loadingPokemons: false,
    offset: 0,
  },
  actions: {
    setLimit: () => {},
    setIncludeCustom: () => {},
    setOffset: () => {},
  },
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

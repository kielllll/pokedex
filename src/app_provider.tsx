import { createContext, useContext } from 'react'
import { Pokemon, useGetPokemons } from './queries/pokemons'

type AppContextType = {
  states: {
    pokemons: undefined | Partial<Pokemon>[]
    loadingPokemons: boolean
  }
  actions: Record<string, any>
}

const AppContext = createContext<AppContextType>({
  states: {
    pokemons: [],
    loadingPokemons: false,
  },
  actions: {},
})

export function useAppContext() {
  return useContext(AppContext)
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { data: pokemons, isLoading: loadingPokemons } = useGetPokemons()

  return (
    <AppContext.Provider
      value={{
        states: {
          pokemons,
          loadingPokemons,
        },
        actions: {},
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

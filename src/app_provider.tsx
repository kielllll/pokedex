import { createContext, useContext } from 'react'

const AppContext = createContext({})

export function useAppContext() {
  return useContext(AppContext)
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

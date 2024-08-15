import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { routes } from './routes'
import { AppProvider } from './app_provider'

const queryClient = new QueryClient()

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <RouterProvider router={routes} />
        </AppProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App

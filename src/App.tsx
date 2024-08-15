import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { routes } from './routes'
import { AppProvider } from './app_provider'

const queryClient = new QueryClient()

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <RouterProvider router={routes} />
        </AppProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App

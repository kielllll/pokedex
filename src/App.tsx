import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { routes } from './routes'
import { AppProvider } from './app_provider'
import { Suspense } from 'react'

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
        <Suspense fallback={<div>Loading...</div>}>
          <AppProvider>
            <RouterProvider router={routes} />
          </AppProvider>
        </Suspense>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App

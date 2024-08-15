import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { ChakraProvider } from '@chakra-ui/react'
import { AppProvider } from './app_provider'

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <RouterProvider router={routes} />
      </AppProvider>
    </ChakraProvider>
  )
}

export default App

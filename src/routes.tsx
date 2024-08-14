import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const AppLayout = lazy(() => import('./app/layout'))
const PokemonInfoLayout = lazy(() => import('./app/pokemons/[id]/layout'))

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'create',
        element: <div>Create</div>,
      },
      {
        path: 'update',
        element: <div>Update</div>,
      },
    ],
  },
  {
    path: 'pokemons/:name',
    element: <PokemonInfoLayout />,
    children: [
      {
        path: 'update',
        element: <div>Update</div>,
      },
    ],
  },
])

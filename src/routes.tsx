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
        index: true,
        element: <div>Home</div>,
      },
      {
        path: 'create',
        element: <div>Create</div>,
      },
      {
        path: 'update',
        element: <div>Update</div>,
      },
      {
        path: 'pokemons/:name',
        element: <PokemonInfoLayout />,
        children: [
          {
            index: true,
            element: <div>Pokemon Info</div>,
          },
          {
            path: 'update',
            element: <div>Update</div>,
          },
        ],
      },
    ],
  },
])

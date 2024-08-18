import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const AppLayout = lazy(() => import('./app/layout'))
const PokemonInfoLayout = lazy(() => import('./app/pokemons/[id]/layout'))

const CreatePage = lazy(() => import('./app/create/page'))
const UpdatePage = lazy(() => import('./app/pokemons/[id]/update/page'))

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'create',
        element: <CreatePage />,
      },
    ],
  },
  {
    path: 'pokemons/:name',
    element: <PokemonInfoLayout />,
    children: [
      {
        path: 'update',
        element: <UpdatePage />,
      },
    ],
  },
])

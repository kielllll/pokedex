import { render } from '@testing-library/react'
import Logo from './index'
import { MemoryRouter } from 'react-router'

test('renders Logo component with correct heading and link', () => {
  // Render the Logo component
  const { getByRole } = render(
    <MemoryRouter>
      <Logo />
    </MemoryRouter>
  )

  // Check if the heading is in the document
  const headingElement = getByRole('heading', { level: 1 })
  expect(headingElement).toBeInTheDocument()
  expect(headingElement).toHaveTextContent('Pokedex')

  // Check if the link is rendered correctly
  const linkElement = getByRole('link', { name: 'Pokedex' })
  expect(linkElement).toHaveAttribute('href', '/')
})

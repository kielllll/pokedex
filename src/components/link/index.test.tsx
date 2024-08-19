import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Link from './index'

describe('Link component', () => {
  it('renders the link with correct text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Link to="/home">Home</Link>
      </MemoryRouter>
    )

    expect(getByText('Home')).toBeInTheDocument()
  })

  it('renders the link with correct href', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Link to="/about">About</Link>
      </MemoryRouter>
    )

    expect(getByText('About')).toHaveAttribute('href', '/about')
  })

  it('applies Chakra UI styles', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Link to="/contact">Contact</Link>
      </MemoryRouter>
    )

    const linkElement = getByText('Contact')
    expect(linkElement).toHaveStyle('text-decoration: none')
  })

  it('supports additional Chakra UI props', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Link to="/services" color="teal.500">
          Services
        </Link>
      </MemoryRouter>
    )

    const linkElement = getByText('Services')
    expect(linkElement).toHaveStyle('color: teal.500')
  })

  it('renders children elements correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Link to="/profile">
          <span>Profile</span>
        </Link>
      </MemoryRouter>
    )

    expect(getByText('Profile')).toBeInTheDocument()
  })
})

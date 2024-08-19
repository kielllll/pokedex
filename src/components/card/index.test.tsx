import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from './index'
import { useGetPokemon } from '../../queries/pokemons'
import { capitalizeFirstLetter, digits4, getImage } from '../../lib/utils'

// Mock dependencies
jest.mock('../../queries/pokemons')
jest.mock('../../lib/utils', () => ({
  capitalizeFirstLetter: jest.fn(),
  digits4: new Intl.NumberFormat('en-US', { minimumIntegerDigits: 4 }),
  getImage: jest.fn(),
}))

const mockedUseGetPokemon = useGetPokemon as jest.Mock
const mockedCapitalizeFirstLetter = capitalizeFirstLetter as jest.Mock
const mockedGetImage = getImage as jest.Mock

describe('Card Component', () => {
  const name = 'pikachu'
  const data = {
    id: 25,
    name,
    isCustom: false,
    imageUrl: getImage(name),
    types: ['electric'],
  }

  beforeEach(() => {
    mockedUseGetPokemon.mockReturnValue({ data })
    mockedCapitalizeFirstLetter.mockImplementation(
      (name) => name.charAt(0).toUpperCase() + name.slice(1)
    )
    mockedGetImage.mockReturnValue(getImage(name))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the Card component with correct data', () => {
    const { getByText, getByAltText } = render(<Card name={name} />)

    expect(mockedUseGetPokemon).toHaveBeenCalledWith(name)
    expect(getByAltText(data.name)).toBeInTheDocument()
    expect(getByText(capitalizeFirstLetter(name))).toBeInTheDocument()
    expect(getByText(`#${digits4.format(25)}`)).toBeInTheDocument()
    expect(getByText(capitalizeFirstLetter(data.types[0]))).toBeInTheDocument()
  })

  it('calls capitalizeFirstLetter and getImage with the correct parameters', () => {
    render(<Card name={name} />)

    expect(mockedCapitalizeFirstLetter).toHaveBeenCalledWith(name)
    expect(mockedGetImage).toHaveBeenCalledWith(name)
  })

  it('renders correctly when no data is returned', () => {
    mockedUseGetPokemon.mockReturnValue({ data: null })

    render(<Card name={name} />)

    expect(screen.getByAltText(name)).toBeInTheDocument()
    expect(screen.getByText(`#${digits4.format(0)}`)).toBeInTheDocument()
  })

  it('renders correctly when types array is empty', () => {
    mockedUseGetPokemon.mockReturnValue({ data: { ...data, types: [] } })

    render(<Card name={name} />)

    expect(screen.queryByTestId('types')).not.toBeInTheDocument()
  })
})

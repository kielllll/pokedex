export const digits4 = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 4,
  maximumSignificantDigits: 4,
  useGrouping: false,
})

export const getImage = (name: string) => {
  if (name === '')
    return 'https://i.pinimg.com/originals/f5/54/89/f5548916ca86b30f7b8f418e4c5c6794.png'

  return `https://img.pokemondb.net/artwork/${name}.jpg`
}

export const convertDecimetersToFeetAndInches = (decimeters: number) => {
  // Conversion factors
  const feetPerDecimeter = 0.328084
  const inchesPerFoot = 12

  // Convert decimeters to feet
  const totalFeet = decimeters * feetPerDecimeter

  // Extract the whole number of feet
  const feet = Math.floor(totalFeet)

  // Extract the remaining fraction and convert it to inches
  const remainingFeet = totalFeet - feet
  const inches = Math.round(remainingFeet * inchesPerFoot)

  return {
    feet: feet,
    inches: inches,
  }
}

export const convertHectoresToKilograms = (hecto: number) => {
  return hecto / 10
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const mapEvolutionChainToPokemon = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chain: Record<string, any>,
  pokemons: string[]
) => {
  pokemons.push(chain.species.name)

  if (chain.evolves_to.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chain.evolves_to.forEach((evolution: Record<string, any>) =>
      mapEvolutionChainToPokemon(evolution, pokemons)
    )
  }
}

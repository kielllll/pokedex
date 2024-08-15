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

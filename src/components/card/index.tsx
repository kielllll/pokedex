import {
  CardBody,
  CardFooter,
  Card as ChakraCard,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { useGetPokemon } from '../../queries/pokemons'
import { PokemonResponse } from '../../app_provider'
import Tag from '../tag'

interface ICardProps {
  pokemon: PokemonResponse
}

const digits4 = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 4,
  maximumSignificantDigits: 4,
  useGrouping: false,
})

const IMAGE_PLACEHOLDER =
  'https://i.pinimg.com/originals/f5/54/89/f5548916ca86b30f7b8f418e4c5c6794.png'

export default function Card(props: ICardProps) {
  const { name = '' } = props.pokemon
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)

  const { data } = useGetPokemon(name)

  return (
    <ChakraCard maxW="sm" p="sm">
      <CardBody>
        <Image
          src={
            `https://img.pokemondb.net/artwork/${name}.jpg` || IMAGE_PLACEHOLDER
          }
          alt={name}
          h={250}
          mx="auto"
          objectFit="contain"
        />
        <Flex mt="6" justifyContent="space-between" alignItems="center">
          <Heading size="md">{capitalizedName}</Heading>
          <Text>#{digits4.format(data?.id || 0)}</Text>
        </Flex>
      </CardBody>
      <CardFooter>
        <Flex alignItems="center" gap={4}>
          {data?.types.map(({ type }: { type: Record<string, string> }) => (
            <Tag name={type.name} key={type.name} />
          ))}
        </Flex>
      </CardFooter>
    </ChakraCard>
  )
}

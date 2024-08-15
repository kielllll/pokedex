import {
  CardBody,
  CardFooter,
  Card as ChakraCard,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
} from '@chakra-ui/react'
import { Pokemon, useGetPokemon } from '../../queries/pokemons'

interface ICardProps {
  pokemon: Partial<Pokemon>
}

const digits4 = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 4,
  maximumSignificantDigits: 4,
  useGrouping: false,
})

const COLORS: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

const IMAGE_PLACEHOLDER =
  'https://i.pinimg.com/originals/f5/54/89/f5548916ca86b30f7b8f418e4c5c6794.png'

export default function Card(props: ICardProps) {
  const { name = '', id = 0 } = props.pokemon
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)

  const { data } = useGetPokemon({
    id,
    initial: true,
  })

  return (
    <ChakraCard maxW="sm" p="sm">
      <CardBody>
        <Image
          src={data?.imageUrl || IMAGE_PLACEHOLDER}
          alt={name}
          h={250}
          mx="auto"
        />
        <Flex mt="6" justifyContent="space-between" alignItems="center">
          <Heading size="md">{capitalizedName}</Heading>
          <Text>#{digits4.format(id)}</Text>
        </Flex>
      </CardBody>
      <CardFooter>
        <Flex alignItems="center" gap={4}>
          {data?.types.map((type) => {
            const color = COLORS[type]
            const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1)

            return (
              <Tag key={type} backgroundColor={color}>
                {capitalizedType}
              </Tag>
            )
          })}
        </Flex>
      </CardFooter>
    </ChakraCard>
  )
}

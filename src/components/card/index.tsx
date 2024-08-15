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
import { digits4, getImage } from '../../lib/utils'

interface ICardProps {
  pokemon: PokemonResponse
}

export default function Card(props: ICardProps) {
  const { name = '' } = props.pokemon
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)

  const { data } = useGetPokemon(name)

  return (
    <ChakraCard maxW="sm" p="sm">
      <CardBody>
        <Image
          src={getImage(name)}
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

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
import Tag from '../tag'
import { capitalizeFirstLetter, digits4, getImage } from '../../lib/utils'

interface ICardProps {
  name: string
}

export default function Card({ name = '' }: ICardProps) {
  const { data } = useGetPokemon(name)

  return (
    <ChakraCard
      maxW={{
        base: '100%',
        md: 'sm',
      }}
      p="sm"
    >
      <CardBody>
        <Image
          src={data?.isCustom ? data?.imageUrl || getImage('') : getImage(name)}
          alt={name}
          h={250}
          mx="auto"
          objectFit="contain"
        />
        <Flex mt="6" justifyContent="space-between" alignItems="center">
          <Heading size="md">{capitalizeFirstLetter(name)}</Heading>
          <Text>#{digits4.format(data?.id || 0)}</Text>
        </Flex>
      </CardBody>
      <CardFooter>
        <Flex alignItems="center" gap={2}>
          {data?.types.map((type: string) => (
            <Tag name={type} key={type} />
          ))}
        </Flex>
      </CardFooter>
    </ChakraCard>
  )
}

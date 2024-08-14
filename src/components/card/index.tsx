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

export default function Card() {
  return (
    <ChakraCard maxW="sm" p="sm">
      <CardBody>
        <Image
          src="https://assets.pokemon.com/assets/cms2/img/pokedex/full//001.png"
          alt="bulbasaur"
          h={250}
        />
        <Flex mt="6" justifyContent="space-between" alignItems="center">
          <Heading size="md">Bulbasaur</Heading>
          <Text>#0001</Text>
        </Flex>
      </CardBody>
      <CardFooter>
        <Flex alignItems="center" gap={4}>
          <Tag>Grass</Tag>
          <Tag>Poison</Tag>
        </Flex>
      </CardFooter>
    </ChakraCard>
  )
}

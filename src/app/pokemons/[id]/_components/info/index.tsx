import {
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  capitalizeFirstLetter,
  digits4,
  getImage,
} from '../../../../../lib/utils'
import Tag from '../../../../../components/tag'
import type { Pokemon } from '../../../../../queries/pokemons'

interface IInfoProps {
  pokemon: Pokemon
}

export default function Info({ pokemon }: IInfoProps) {
  return (
    <Card mt={12} p={4}>
      <Heading size="lg">Pokemon Info</Heading>
      <CardBody>
        <Flex gap={12} justifyContent="space-evenly" alignItems="center">
          <Stack alignItems="center">
            <Image
              src={getImage(pokemon.name)}
              alt="Pokemon"
              width={250}
              height={250}
              objectFit="contain"
            />
            <Heading size="md">{capitalizeFirstLetter(pokemon.name)}</Heading>
            <Text>#{digits4.format(pokemon?.id || 0)}</Text>
          </Stack>
          <Stack flex={1}>
            <Heading size="md">Characteristics</Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <GridItem colSpan={2}>
                <Heading size="sm">Height</Heading>
                <Text mt={2}>{pokemon?.height || ''}</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Heading size="sm">Weight</Heading>
                <Text mt={2}>{pokemon?.weight || ''}</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Heading size="sm">Abilities</Heading>
                <Text mt={2}>{pokemon?.abilities || ''}</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Heading size="sm">Type</Heading>
                <Flex gap={2} alignItems="center" mt={2}>
                  {pokemon?.types.map((type: string) => (
                    <Tag key={type} name={type} />
                  ))}
                </Flex>
              </GridItem>
            </Grid>
            <Heading size="md">Base Stats</Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {pokemon?.stats.map((stat) => (
                <GridItem colSpan={2} key={stat.name}>
                  <Heading size="sm">
                    {capitalizeFirstLetter(stat.name)}
                  </Heading>
                  <Progress value={stat.value} rounded="full" mt={2} />
                </GridItem>
              ))}
            </Grid>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  )
}

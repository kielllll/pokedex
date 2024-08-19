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
  convertDecimetersToFeetAndInches,
  digits4,
  getImage,
} from '../../../../../lib/utils'
import Tag from '../../../../../components/tag'
import type { Pokemon } from '../../../../../queries/pokemons'
import UpdateButton from './update_button'
import DeleteButton from './delete_button'

interface IInfoProps {
  pokemon: Pokemon
}

export default function Info({ pokemon }: IInfoProps) {
  const { feet, inches } = convertDecimetersToFeetAndInches(
    +pokemon.height || 0
  )
  return (
    <Card mt={12} p={4}>
      <Flex gap={4} justifyContent="space-between" alignItems="center">
        <Heading size="lg">Pokemon Info</Heading>
        {pokemon?.isCustom && (
          <Flex gap={4} alignItems="center">
            <UpdateButton />
            <DeleteButton name={pokemon.name} />
          </Flex>
        )}
      </Flex>
      <CardBody
        p={{
          base: 0,
          md: '1.25rem',
        }}
      >
        <Stack
          direction={{
            base: 'column',
            md: 'row',
          }}
          gap={{
            base: 4,
            md: 12,
          }}
          justifyContent="space-evenly"
          alignItems={{
            base: 'unset',
            md: 'center',
          }}
        >
          <Stack alignItems="center">
            <Image
              src={
                pokemon?.isCustom
                  ? pokemon?.imageUrl || getImage('')
                  : getImage(pokemon.name)
              }
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
                <Text mt={2}>
                  {feet}' {inches}"
                </Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Heading size="sm">Weight</Heading>
                <Text mt={2}>{pokemon?.weight || 0} kg</Text>
              </GridItem>
              <GridItem colSpan={2}>
                <Heading size="sm">Abilities</Heading>
                <Text mt={2}>
                  {pokemon?.abilities
                    .map((ability) => capitalizeFirstLetter(ability))
                    .join(', ') || ''}
                </Text>
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
        </Stack>
      </CardBody>
    </Card>
  )
}

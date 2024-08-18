import { Link as RouterLink } from 'react-router-dom'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Pokemon } from '../../../../../queries/pokemons'
import { useGetEvolutionChain } from '../../../../../queries/evolution_chains'
import { capitalizeFirstLetter, getImage } from '../../../../../lib/utils'
import { Fragment } from 'react/jsx-runtime'

interface IEvolutionChainProps {
  pokemon: Pokemon
}

export default function EvolutionChain({ pokemon }: IEvolutionChainProps) {
  const { data: evolutionChain } = useGetEvolutionChain(pokemon.name)
  const rotateChevron = useBreakpointValue({
    base: 'rotate(90deg)',
    md: 'unset',
  })

  if (evolutionChain?.length === 0) return null

  return (
    <Card mt={6} p={4}>
      <Heading size="lg">Evolution Chain</Heading>
      <CardBody>
        <Stack
          direction={{
            base: 'column',
            md: 'row',
          }}
          gap={4}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          {evolutionChain?.map((evolutionPokemon, index) => {
            return (
              <Fragment key={evolutionPokemon}>
                <LinkBox key={evolutionPokemon}>
                  <LinkOverlay
                    as={RouterLink}
                    to={`/pokemons/${evolutionPokemon}`}
                  >
                    <Stack alignItems="center">
                      <Image
                        src={getImage(evolutionPokemon)}
                        alt={evolutionPokemon}
                        width={250}
                        height={250}
                        objectFit="contain"
                      />
                      <Heading size="md">
                        {capitalizeFirstLetter(evolutionPokemon)}
                      </Heading>
                    </Stack>
                  </LinkOverlay>
                </LinkBox>
                {index < evolutionChain.length - 1 && (
                  <ChevronRightIcon transform={rotateChevron} fontSize={100} />
                )}
              </Fragment>
            )
          })}
        </Stack>
      </CardBody>
    </Card>
  )
}

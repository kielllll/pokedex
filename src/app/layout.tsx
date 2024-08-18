import { Outlet } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import {
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  LinkBox,
  LinkOverlay,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import Logo from '../components/logo'
import DisplayOptions from './_components/display_options'
import CreateButton from './_components/create_button'
import Card from '../components/card'
import { useAppContext } from '../app_provider'
import Pagination from './_components/pagination'

export default function Layout() {
  const { states } = useAppContext()

  return (
    <>
      <Container
        maxW={{
          base: '100vw',
          md: '6xl',
          lg: '8xl',
        }}
        py={4}
      >
        <Flex gap={4} alignItems="center" justifyContent="space-between">
          <Logo />
          <Stack direction="row" spacing={4} alignItems="center">
            <DisplayOptions />
            <CreateButton />
          </Stack>
        </Flex>
        {states.loadingPokemons ? (
          <Center height="90vh">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        ) : (
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={4}
            mt={12}
          >
            {states.pokemons?.map((pokemon) => (
              <GridItem colSpan={1} key={pokemon.name}>
                <LinkBox>
                  <LinkOverlay as={RouterLink} to={`/pokemons/${pokemon.name}`}>
                    <Card name={pokemon.name} />
                  </LinkOverlay>
                </LinkBox>
              </GridItem>
            ))}
          </Grid>
        )}
        <Pagination />
      </Container>
      <Outlet />
    </>
  )
}

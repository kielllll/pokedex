import { Outlet } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Flex,
  Grid,
  GridItem,
  LinkBox,
  LinkOverlay,
  Stack,
} from '@chakra-ui/react'
import Logo from '../components/logo'
import DisplayOptions from './_components/display_options'
import SearchField from './_components/search_field'
import CreateButton from './_components/create_button'
import Card from '../components/card'
import { useAppContext } from '../app_provider'

export default function Layout() {
  const { states } = useAppContext()

  return (
    <>
      <Container maxW={'8xl'} py={4}>
        <Flex gap={4} alignItems="center" justifyContent="space-between">
          <Logo />
          <Stack direction="row" spacing={4} alignItems="center">
            <SearchField />
            <DisplayOptions />
            <CreateButton />
          </Stack>
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={12}>
          {states.pokemons?.map((pokemon) => (
            <GridItem colSpan={1} key={pokemon.name}>
              <LinkBox>
                <LinkOverlay as={RouterLink} to={`/pokemons/${pokemon.name}`}>
                  <Card pokemon={pokemon} />
                </LinkOverlay>
              </LinkBox>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Outlet />
    </>
  )
}

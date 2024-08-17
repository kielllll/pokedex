import { Button, Center, Container, Flex } from '@chakra-ui/react'
import { Outlet, useParams } from 'react-router'
import Logo from '../../../components/logo'
import Info from './_components/info'
import EvolutionChain from './_components/evolution_chain'
import Link from '../../../components/link'
import { useGetPokemon } from '../../../queries/pokemons'

export default function Layout() {
  const { name = '' } = useParams()
  const { data } = useGetPokemon(name)

  if (!data) return null

  return (
    <>
      <Container maxW={'8xl'} py={4}>
        <Flex justifyContent="space-between" alignItems="center" gap={4}>
          <Logo />
          <Link to="../../">
            <Button colorScheme="blue">Back to List</Button>
          </Link>
        </Flex>
        <Info pokemon={data} />
        {!data?.isCustom && <EvolutionChain pokemon={data} />}
        <Center mt={6}>
          <Link to="../../">
            <Button colorScheme="blue">Explore More Pokemons</Button>
          </Link>
        </Center>
      </Container>
      <Outlet />
    </>
  )
}

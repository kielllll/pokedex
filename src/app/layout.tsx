import { Outlet } from 'react-router'
import { Container, Flex, Stack } from '@chakra-ui/react'
import Logo from '../components/logo'
import DisplayOptions from './_components/display_options'
import SearchField from './_components/search_field'
import CreateButton from './_components/create_button'

export default function Layout() {
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
      </Container>
      <Outlet />
    </>
  )
}

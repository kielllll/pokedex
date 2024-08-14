import { Heading } from '@chakra-ui/react'
import Link from '../link'

export default function Logo() {
  return (
    <Link to="/">
      <Heading as="h1" size="lg">
        Pokedex
      </Heading>
    </Link>
  )
}

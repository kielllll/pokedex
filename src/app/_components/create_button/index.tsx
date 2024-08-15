import { Button } from '@chakra-ui/react'
import Link from '../../../components/link'

export default function CreateButton() {
  return (
    <Link to="/create">
      <Button colorScheme="blue">Create</Button>
    </Link>
  )
}

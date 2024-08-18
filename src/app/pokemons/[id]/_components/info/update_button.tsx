import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export default function UpdateButton() {
  const navigate = useNavigate()

  const handleUpdateClick = () => {
    navigate('update')
  }

  return (
    <Button colorScheme="blue" onClick={handleUpdateClick}>
      Update
    </Button>
  )
}

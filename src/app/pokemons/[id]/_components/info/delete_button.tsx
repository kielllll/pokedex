import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { pokemonsAtom } from '../../../../../atoms'

interface IDeleteButtonProps {
  name: string
}

export default function DeleteButton({ name }: IDeleteButtonProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const setPokemons = useSetAtom(pokemonsAtom)

  const handleDeleteClick = () => {
    setPokemons((prev) => prev.filter((pokemon) => pokemon.name !== name))
    queryClient.invalidateQueries({
      queryKey: ['pokemons'],
    })
    onClose()
    navigate('../..')
  }

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteClick} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

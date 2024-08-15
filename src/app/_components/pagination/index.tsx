import { Button, Flex } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useAppContext } from '../../../app_provider'

export default function Pagination() {
  const { states, actions } = useAppContext()
  const queryClient = useQueryClient()

  const currentCount = states?.pokemons?.length ?? 0

  const handlePreviousClick = () => {
    actions.setOffset(states.offset - currentCount)
    queryClient.invalidateQueries({
      queryKey: ['pokemons'],
    })
  }

  const handleNextClick = () => {
    actions.setOffset(states.offset + currentCount)
    queryClient.invalidateQueries({
      queryKey: ['pokemons'],
    })
  }

  return (
    <Flex justifyContent="center" alignItems="center" gap={4} mt={12}>
      <Button
        colorScheme="blue"
        isDisabled={states.offset === 0 || states.loadingPokemons}
        onClick={handlePreviousClick}
      >
        Previous
      </Button>
      <Button
        colorScheme="blue"
        onClick={handleNextClick}
        isDisabled={states.offset >= states.count || states.loadingPokemons}
      >
        Next
      </Button>
    </Flex>
  )
}

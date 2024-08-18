import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { IoOptionsSharp } from 'react-icons/io5'
import { z } from 'zod'
import { useAppContext } from '../../../app_provider'
import { useQueryClient } from '@tanstack/react-query'

export default function DisplayOptions() {
  const { actions } = useAppContext()
  const queryClient = useQueryClient()
  const schema = z.object({
    display: z.number({ coerce: true }).max(20, {
      message: 'Display must be at most 20',
    }),
    includeCustom: z.boolean(),
  })

  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      display: 12,
      includeCustom: true,
    },
  })

  const onSubmit = ({ display, includeCustom }: FormData) => {
    actions.setLimit(display)
    actions.setIncludeCustom(includeCustom)
    actions.setOffset(0)

    queryClient.invalidateQueries({
      queryKey: ['pokemons'],
    })
  }

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button leftIcon={<IoOptionsSharp />} colorScheme="blue">
          Display
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Heading size="md">Display Options</Heading>
        </PopoverHeader>
        <PopoverBody p={3}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(onSubmit)()
            }}
          >
            <FormControl>
              <FormLabel>Number of items to be displayed</FormLabel>
              <Input type="number" {...register('display')} />
              {errors.display?.message && (
                <Text color="red.500">{errors.display.message}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Include custom pokemons</FormLabel>
              <Checkbox {...register('includeCustom')} />
              {errors.includeCustom?.message && (
                <Text color="red.500">{errors.includeCustom.message}</Text>
              )}
            </FormControl>
            <Flex justifyContent="flex-end">
              <Button type="submit" colorScheme="blue" isDisabled={!isValid}>
                Submit
              </Button>
            </Flex>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

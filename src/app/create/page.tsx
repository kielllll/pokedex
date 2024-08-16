import { useNavigate } from 'react-router'
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useCreatePokemonForm } from './_hooks/use_create_pokemon_form'
import type { FormData } from './_hooks/use_create_pokemon_form'

export default function CreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCreatePokemonForm()
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('..')
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent minWidth="50vw">
        <ModalHeader>
          <Heading size="md">Create A New Pokemon</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(onSubmit)()
            }}
          >
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel>ID</FormLabel>
                  <Input type="number" {...register('id')} max={9999} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" {...register('name')} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel>Height</FormLabel>
                  <Input type="number" {...register('height')} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel>Weight</FormLabel>
                  <Input type="number" {...register('weight')} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel>Types</FormLabel>
                  <Select
                    options={[
                      { value: 'normal', label: 'Normal' },
                      { value: 'fire', label: 'Fire' },
                      { value: 'water', label: 'Water' },
                      { value: 'electric', label: 'Electric' },
                      { value: 'grass', label: 'Grass' },
                      { value: 'ice', label: 'Ice' },
                      { value: 'fighting', label: 'Fighting' },
                      { value: 'poison', label: 'Poison' },
                      { value: 'ground', label: 'Ground' },
                      { value: 'flying', label: 'Flying' },
                      { value: 'psychic', label: 'Psychic' },
                      { value: 'bug', label: 'Bug' },
                      { value: 'rock', label: 'Rock' },
                      { value: 'ghost', label: 'Ghost' },
                      { value: 'dragon', label: 'Dragon' },
                      { value: 'dark', label: 'Dark' },
                      { value: 'steel', label: 'Steel' },
                      { value: 'fairy', label: 'Fairy' },
                    ]}
                    isMulti
                  />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input type="file" {...register('imageUrl')} py={1} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>HP</FormLabel>
                  <Input type="number" {...register('hp')} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>Attack</FormLabel>
                  <Input type="number" {...register('attack')} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>Defense</FormLabel>
                  <Input type="number" {...register('defense')} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>Special Attack</FormLabel>
                  <Input type="number" {...register('specialAttack')} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>Special Defense</FormLabel>
                  <Input type="number" {...register('specialDefense')} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>Speed</FormLabel>
                  <Input type="number" {...register('speed')} />
                  {errors.id?.message && (
                    <Text color="red.500">{errors.id.message}</Text>
                  )}
                </FormControl>
              </GridItem>
            </Grid>
          </form>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button colorScheme="blue" type="submit">
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

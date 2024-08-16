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
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)()
          }}
        >
          <ModalBody>
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
                  {errors.name?.message && (
                    <Text color="red.500">{errors.name.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel>Height</FormLabel>
                  <Input type="number" {...register('height')} />
                  {errors.height?.message && (
                    <Text color="red.500">{errors.height.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel>Weight</FormLabel>
                  <Input type="number" {...register('weight')} />
                  {errors.weight?.message && (
                    <Text color="red.500">{errors.weight.message}</Text>
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
                  {errors.types?.message && (
                    <Text color="red.500">{errors.types.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={6}>
                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <Input type="file" {...register('imageUrl')} py={1} />
                  {errors.imageUrl?.message && (
                    <Text color="red.500">{errors.imageUrl.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>HP</FormLabel>
                  <Input type="number" {...register('hp')} />
                  {errors.hp?.message && (
                    <Text color="red.500">{errors.hp.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>Attack</FormLabel>
                  <Input type="number" {...register('attack')} />
                  {errors.attack?.message && (
                    <Text color="red.500">{errors.attack.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>Defense</FormLabel>
                  <Input type="number" {...register('defense')} />
                  {errors.defense?.message && (
                    <Text color="red.500">{errors.defense.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>Special Attack</FormLabel>
                  <Input type="number" {...register('specialAttack')} />
                  {errors.specialAttack?.message && (
                    <Text color="red.500">{errors.specialAttack.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>Special Defense</FormLabel>
                  <Input type="number" {...register('specialDefense')} />
                  {errors.specialDefense?.message && (
                    <Text color="red.500">{errors.specialDefense.message}</Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl>
                  <FormLabel>Speed</FormLabel>
                  <Input type="number" {...register('speed')} />
                  {errors.speed?.message && (
                    <Text color="red.500">{errors.speed.message}</Text>
                  )}
                </FormControl>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button colorScheme="blue" type="submit">
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

import { useNavigate, useParams } from 'react-router'
import {
  Button,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useGetPokemon } from '../../../../queries/pokemons'
import {
  type FormData,
  usePokemonForm,
} from '../../../../hooks/use_pokemon_form'
import { useTypesSelectOptions } from '../../../../hooks/use_types_select_options'
import { useAbilitiesSelectOptions } from '../../../../hooks/use_abilities_select_options'
import { pokemonsAtom } from '../../../../atoms'
import InputField from '../../../../components/fields/Input'
import SelectField, { OptionGroup } from '../../../../components/fields/Select'

export default function UpdatePage() {
  const navigate = useNavigate()
  const { name = '' } = useParams()
  const { options: typeOptions, isLoading: typeOptionsLoading } =
    useTypesSelectOptions()
  const { options: abilityOptions, isLoading: abilityOptionsLoading } =
    useAbilitiesSelectOptions()
  const setPokemons = useSetAtom(pokemonsAtom)

  const { data, isLoading } = useGetPokemon(name)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = usePokemonForm({
    ...data,
    hp: data?.stats.find((stat) => stat.name === 'hp')?.value,
    attack: data?.stats.find((stat) => stat.name === 'attack')?.value,
    defense: data?.stats.find((stat) => stat.name === 'defense')?.value,
    specialAttack: data?.stats.find((stat) => stat.name === 'special-attack')
      ?.value,
    specialDefense: data?.stats.find((stat) => stat.name === 'special-defense')
      ?.value,
    speed: data?.stats.find((stat) => stat.name === 'speed')?.value,
  } as FormData | undefined)
  const [types, abilities] = watch(['types', 'abilities'])

  const handleClose = () => {
    navigate('..')
  }

  const handleTypeChange = (types: OptionGroup[]) => {
    setValue(
      'types',
      types.map(({ value }) => value)
    )
  }

  const handleAbilityChange = (abilities: OptionGroup[]) => {
    setValue(
      'abilities',
      abilities.map(({ value }) => value)
    )
  }

  const onSubmit = (data: FormData) => {
    const {
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed,
      ...rest
    } = data

    const newPokemon = {
      ...rest,
      stats: [
        {
          name: 'hp',
          value: hp,
        },
        {
          name: 'attack',
          value: attack,
        },
        {
          name: 'defense',
          value: defense,
        },
        {
          name: 'special-attack',
          value: specialAttack,
        },
        {
          name: 'special-defense',
          value: specialDefense,
        },
        {
          name: 'speed',
          value: speed,
        },
      ],
      isCustom: true,
    }

    setPokemons((pokemons) =>
      pokemons.map((pokemon) => (pokemon.name === name ? newPokemon : pokemon))
    )

    navigate(`../../pokemons/${data.name}`)
  }

  if (isLoading || !data?.isCustom) return null

  return (
    <Modal isOpen onClose={handleClose}>
      <ModalOverlay />
      <ModalContent minWidth="50vw">
        <ModalHeader>
          <Heading size="md">Update {name}</Heading>
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
                <InputField
                  label="ID"
                  inputProps={{
                    type: 'number',
                    ...register('id'),
                  }}
                  errorMessage={errors.id?.message}
                />
              </GridItem>
              <GridItem colSpan={6}>
                <InputField
                  label="Name"
                  inputProps={{
                    type: 'text',
                    ...register('name'),
                  }}
                  errorMessage={errors.name?.message}
                />
              </GridItem>
              <GridItem colSpan={6}>
                <InputField
                  label="Height"
                  inputProps={{
                    type: 'number',
                    ...register('height'),
                  }}
                  errorMessage={errors.height?.message}
                />
              </GridItem>
              <GridItem colSpan={6}>
                <InputField
                  label="Weight"
                  inputProps={{
                    type: 'number',
                    ...register('weight'),
                  }}
                  errorMessage={errors.weight?.message}
                />
              </GridItem>
              <GridItem colSpan={6}>
                <SelectField
                  options={typeOptions}
                  label="Types"
                  name="types"
                  isMulti
                  onChange={(types) => handleTypeChange(types as OptionGroup[])}
                  value={typeOptions.filter((type) =>
                    types.includes(type.value)
                  )}
                  isLoading={typeOptionsLoading}
                  errorMessage={errors.types?.message}
                />
              </GridItem>
              <GridItem colSpan={6}>
                <SelectField
                  options={abilityOptions}
                  label="Abilities"
                  name="abilities"
                  isMulti
                  onChange={(abilities) =>
                    handleAbilityChange(abilities as OptionGroup[])
                  }
                  value={abilityOptions.filter((ability) =>
                    abilities.includes(ability.value)
                  )}
                  isLoading={abilityOptionsLoading}
                  errorMessage={errors.abilities?.message}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <InputField
                  label="HP"
                  inputProps={{
                    type: 'number',
                    ...register('hp'),
                  }}
                  errorMessage={errors.hp?.message}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <InputField
                  label="Attack"
                  inputProps={{
                    type: 'number',
                    ...register('attack'),
                  }}
                  errorMessage={errors.attack?.message}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <InputField
                  label="Defense"
                  inputProps={{
                    type: 'number',
                    ...register('defense'),
                  }}
                  errorMessage={errors.defense?.message}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <InputField
                  label="Special Attack"
                  inputProps={{
                    type: 'number',
                    ...register('specialAttack'),
                  }}
                  errorMessage={errors.specialAttack?.message}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <InputField
                  label="Special Defense"
                  inputProps={{
                    type: 'number',
                    ...register('specialDefense'),
                  }}
                  errorMessage={errors.specialDefense?.message}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <InputField
                  label="Speed"
                  inputProps={{
                    type: 'number',
                    ...register('speed'),
                  }}
                  errorMessage={errors.speed?.message}
                />
              </GridItem>
              <GridItem colSpan={12}>
                <InputField
                  label="Image"
                  inputProps={{
                    type: 'file',
                    ...register('imageUrl'),
                    py: 1,
                  }}
                  errorMessage={errors.imageUrl?.message}
                />
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button colorScheme="blue" type="submit">
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

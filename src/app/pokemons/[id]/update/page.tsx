import { useState } from 'react'
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
import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
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
  const [submitting, setSubmitting] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { name = '' } = useParams()
  const { options: typeOptions, isLoading: typeOptionsLoading } =
    useTypesSelectOptions()
  const { options: abilityOptions, isLoading: abilityOptionsLoading } =
    useAbilitiesSelectOptions()
  const [pokemons, setPokemons] = useAtom(pokemonsAtom)

  const { data, isLoading } = useGetPokemon(name)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
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

  const onSubmit = async (formData: FormData) => {
    setSubmitting(true)
    const {
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed,
      ...rest
    } = formData

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

    // Add validation to check id and name
    const existingNameOnCustom = pokemons.some(
      ({ name }) =>
        formData.name.toLowerCase() === name.toLowerCase() &&
        formData.name !== name
    )

    const existingNameOnApi = await fetch(
      `${
        import.meta.env.VITE_POKE_API_URL
      }/pokemon/${formData.name.toLowerCase()}`
    )

    if (existingNameOnCustom || existingNameOnApi.ok) {
      setError('name', {
        type: 'custom',
        message: 'Name already exists',
      })
    }

    const existingIdOnCustom = pokemons.some(
      ({ id }) => formData.id === id && formData.id !== data?.id
    )

    const existingIdOnApi = await fetch(
      `${import.meta.env.VITE_POKE_API_URL}/pokemon/${formData.id}`
    )

    if (existingIdOnCustom || existingIdOnApi.ok) {
      setError('id', {
        type: 'id',
        message: 'ID already exists',
      })
    }

    setSubmitting(false)

    if (
      existingNameOnCustom ||
      existingNameOnApi.ok ||
      existingIdOnCustom ||
      existingIdOnApi.ok
    ) {
      return
    }

    setPokemons(
      pokemons.map((pokemon) => (pokemon.name === name ? newPokemon : pokemon))
    )
    queryClient.invalidateQueries({
      queryKey: ['pokemons'],
    })
    queryClient.invalidateQueries({
      queryKey: ['pokemon', formData.name],
    })
    navigate(`../../pokemons/${formData.name}`)
  }

  if (isLoading || !data?.isCustom) return null

  return (
    <Modal isOpen onClose={handleClose}>
      <ModalOverlay />
      <ModalContent
        minWidth={{
          base: '90vw',
          lg: '50vw',
        }}
      >
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
              <GridItem
                colSpan={{
                  base: 12,
                  md: 6,
                }}
              >
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
              <GridItem
                colSpan={{
                  base: 12,
                  md: 6,
                }}
              >
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
              <GridItem
                colSpan={{
                  base: 6,
                  md: 4,
                }}
              >
                <InputField
                  label="HP"
                  inputProps={{
                    type: 'number',
                    ...register('hp'),
                  }}
                  errorMessage={errors.hp?.message}
                />
              </GridItem>
              <GridItem
                colSpan={{
                  base: 6,
                  md: 4,
                }}
              >
                <InputField
                  label="Attack"
                  inputProps={{
                    type: 'number',
                    ...register('attack'),
                  }}
                  errorMessage={errors.attack?.message}
                />
              </GridItem>
              <GridItem
                colSpan={{
                  base: 6,
                  md: 4,
                }}
              >
                <InputField
                  label="Defense"
                  inputProps={{
                    type: 'number',
                    ...register('defense'),
                  }}
                  errorMessage={errors.defense?.message}
                />
              </GridItem>
              <GridItem
                colSpan={{
                  base: 6,
                  md: 4,
                }}
              >
                <InputField
                  label="Special Attack"
                  inputProps={{
                    type: 'number',
                    ...register('specialAttack'),
                  }}
                  errorMessage={errors.specialAttack?.message}
                />
              </GridItem>
              <GridItem
                colSpan={{
                  base: 6,
                  md: 4,
                }}
              >
                <InputField
                  label="Special Defense"
                  inputProps={{
                    type: 'number',
                    ...register('specialDefense'),
                  }}
                  errorMessage={errors.specialDefense?.message}
                />
              </GridItem>
              <GridItem
                colSpan={{
                  base: 6,
                  md: 4,
                }}
              >
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
            <Button colorScheme="blue" type="submit" isLoading={submitting}>
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

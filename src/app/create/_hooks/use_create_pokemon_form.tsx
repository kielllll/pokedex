import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  id: z
    .number({ coerce: true })
    .min(1, { message: 'ID must be at least 1' })
    .max(9999, { message: 'ID must be at most 9999' }),
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .refine(
      (value) => {
        return /^\w+$/.test(value) // Checks if the string is a single word
      },
      {
        message: 'Name must contain exactly one word.',
      }
    ),
  abilities: z
    .array(z.string())
    .min(1, { message: 'Ability is required' })
    .max(2, {
      message: 'Ability must be at most 2',
    }),
  types: z.array(z.string()).min(1, { message: 'Type is required' }).max(3, {
    message: 'Type must be at most 3',
  }),
  height: z.number({ coerce: true }),
  weight: z.number({ coerce: true }),
  hp: z
    .number({ coerce: true })
    .max(100, { message: 'HP must be at most 100' }),
  attack: z
    .number({ coerce: true })
    .max(100, { message: 'HP must be at most 100' }),
  defense: z
    .number({ coerce: true })
    .max(100, { message: 'HP must be at most 100' }),
  specialAttack: z
    .number({ coerce: true })
    .max(100, { message: 'HP must be at most 100' }),
  specialDefense: z
    .number({ coerce: true })
    .max(100, { message: 'HP must be at most 100' }),
  speed: z
    .number({ coerce: true })
    .max(100, { message: 'HP must be at most 100' }),
  imageUrl: z.string().optional(),
})

export type FormData = z.infer<typeof schema>

export const useCreatePokemonForm = () => {
  return useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      name: '',
      types: [],
      abilities: [],
      height: 0,
      weight: 0,
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      imageUrl: '',
    },
  })
}

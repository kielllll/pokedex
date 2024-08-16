import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  id: z
    .number({ coerce: true })
    .min(1302, { message: 'ID must be at least 1303' })
    .max(9999, { message: 'ID must be at most 9999' }),
  name: z.string().min(1, { message: 'Name is required' }),
  types: z.array(z.string()),
  height: z
    .number({ coerce: true })
    .min(0.1, { message: 'Height must be at least 0.1' }),
  weight: z
    .number({ coerce: true })
    .min(0.1, { message: 'Weight must be at least 0.1' }),
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
  imageUrl: z.string(),
})

export type FormData = z.infer<typeof schema>

export const useCreatePokemonForm = () => {
  return useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      name: '',
      types: [],
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

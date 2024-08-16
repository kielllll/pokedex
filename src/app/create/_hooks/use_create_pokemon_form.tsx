import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  id: z.number().max(9999, { message: 'ID must be at most 9999' }),
  name: z.string(),
  types: z.array(z.string()),
  height: z.number(),
  weight: z.number(),
  hp: z.number().max(100, { message: 'HP must be at most 100' }),
  attack: z.number().max(100, { message: 'HP must be at most 100' }),
  defense: z.number().max(100, { message: 'HP must be at most 100' }),
  specialAttack: z.number().max(100, { message: 'HP must be at most 100' }),
  specialDefense: z.number().max(100, { message: 'HP must be at most 100' }),
  speed: z.number().max(100, { message: 'HP must be at most 100' }),
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

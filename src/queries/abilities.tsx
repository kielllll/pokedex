import { useQuery } from '@tanstack/react-query'

export const useGetAbilities = () => {
  return useQuery({
    queryKey: ['abilities'],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_POKE_API_URL}/ability?limit=367&offset=0`
        )
        const data = await response.json()

        return data.results.map((ability: { name: string }) => ability.name)
      } catch (error: any) {
        console.log(error)
        throw new Error('abilities.tsx - useGetAbilities: ' + error.message)
      }
    },
  })
}

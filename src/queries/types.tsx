import { useQuery } from '@tanstack/react-query'

export const useGetTypes = () => {
  return useQuery({
    queryKey: ['types'],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_POKE_API_URL}/type`
        )
        const data = await response.json()
        return data
      } catch (error: any) {
        console.log(error)
        throw new Error('types.tsx - useGetTypes: ' + error.message)
      }
    },
  })
}

import { useQuery } from '@tanstack/react-query'

export const useGetTypes = () => {
  return useQuery({
    queryKey: ['types'],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_POKE_API_URL}/type?limit=21&offset=0`
        )
        const data = await response.json()

        return data.results.map((type: { name: string }) => type.name)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error)
        throw new Error('types.tsx - useGetTypes: ' + error.message)
      }
    },
  })
}

import { capitalizeFirstLetter } from '../lib/utils'
import { useGetTypes } from '../queries/types'

export const useTypesSelectOptions = () => {
  const { data, isLoading } = useGetTypes()

  const options: {
    label: string
    value: string
  }[] =
    data?.map((type: string) => ({
      label: capitalizeFirstLetter(type),
      value: type,
    })) ?? []

  return {
    options,
    isLoading,
  }
}

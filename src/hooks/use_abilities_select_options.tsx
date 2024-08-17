import { capitalizeFirstLetter } from '../lib/utils'
import { useGetAbilities } from '../queries/abilities'

export const useAbilitiesSelectOptions = () => {
  const { data, isLoading } = useGetAbilities()

  const options: {
    label: string
    value: string
  }[] =
    data?.map((ability: string) => ({
      label: capitalizeFirstLetter(ability),
      value: ability,
    })) ?? []

  return {
    options,
    isLoading,
  }
}

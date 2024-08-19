import { FormControl, FormLabel, Text } from '@chakra-ui/react'
import { OptionBase, Select } from 'chakra-react-select'

export interface OptionGroup extends OptionBase {
  label: string
  value: string
}

interface ISelectFieldProps {
  label: string
  name: string
  value: OptionGroup[]
  options: OptionGroup[]
  errorMessage?: string
  isMulti?: boolean
  onChange: (values: OptionGroup[]) => void
  isLoading?: boolean
  isRequired?: boolean
}

export default function SelectField(props: ISelectFieldProps) {
  return (
    <FormControl isRequired={props?.isRequired}>
      <FormLabel>{props.label}</FormLabel>
      <Select
        options={props.options}
        isMulti={props.isMulti}
        onChange={(values) => props.onChange(values as OptionGroup[])}
        value={props.value}
        isDisabled={props.isLoading}
      />
      {props.errorMessage && <Text color="red.500">{props.errorMessage}</Text>}
    </FormControl>
  )
}

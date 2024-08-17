import {
  FormControl,
  FormLabel,
  Input,
  Text,
  type InputProps,
} from '@chakra-ui/react'

interface IInputFieldProps {
  label: string
  inputProps: InputProps
  errorMessage?: string
}

export default function InputField(props: IInputFieldProps) {
  return (
    <FormControl>
      <FormLabel>{props.label}</FormLabel>
      <Input {...props.inputProps} />
      {props.errorMessage && <Text color="red.500">{props.errorMessage}</Text>}
    </FormControl>
  )
}

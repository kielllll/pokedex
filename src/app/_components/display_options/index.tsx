import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { IoOptionsSharp } from 'react-icons/io5'

export default function DisplayOptions() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button leftIcon={<IoOptionsSharp />}>Display</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

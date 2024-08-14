import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react'

export default function SearchField() {
  return (
    <Box>
      <InputGroup>
        <Input placeholder="Magikarp" width="auto" />
        <InputRightAddon p={0}>
          <IconButton
            aria-label="Search pokemon button"
            variant="ghost"
            icon={<SearchIcon />}
          />
        </InputRightAddon>
      </InputGroup>
    </Box>
  )
}

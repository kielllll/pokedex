import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
} from 'react-router-dom'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

export default function Link({
  children,
  to,
  ...props
}: ChakraLinkProps & ReactRouterLinkProps) {
  return (
    <ChakraLink
      as={ReactRouterLink}
      to={to}
      _hover={{ textDecoration: 'none' }}
      {...props}
    >
      {children}
    </ChakraLink>
  )
}

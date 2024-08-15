import {
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Progress,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { Outlet } from 'react-router'
import Logo from '../../../components/logo'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function Layout() {
  return (
    <>
      <Container maxW={'8xl'} py={4}>
        <Logo />
        <Card mt={12} p={4}>
          <Heading size="lg">Pokemon Info</Heading>
          <CardBody>
            <Flex gap={12} justifyContent="space-evenly" alignItems="center">
              <Stack alignItems="center">
                <Image
                  src="https://i.pinimg.com/originals/f5/54/89/f5548916ca86b30f7b8f418e4c5c6794.png"
                  alt="Pokemon"
                  width={250}
                  height={250}
                  objectFit="cover"
                  borderRadius="50%"
                />
                <Heading size="md">Pokemon Name</Heading>
                <Text>Pokemon ID</Text>
              </Stack>
              <Stack flex={1}>
                <Heading size="md">Characteristics</Heading>
                <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                  <GridItem colSpan={2}>
                    <Heading size="sm">Height</Heading>
                    <Text mt={2}>10</Text>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Heading size="sm">Weight</Heading>
                    <Text mt={2}>10</Text>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Heading size="sm">Abilities</Heading>
                    <Text mt={2}>10</Text>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Heading size="sm">Type</Heading>
                    <Tag mt={2}>Electric</Tag>
                  </GridItem>
                </Grid>
                <Heading size="md">Base Stats</Heading>
                <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                  <GridItem colSpan={2}>
                    <Heading size="sm">HP</Heading>
                    <Progress value={50} rounded="full" mt={2} />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Heading size="sm">Attack</Heading>
                    <Progress value={50} rounded="full" mt={2} />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Heading size="sm">Defense</Heading>
                    <Progress value={50} rounded="full" mt={2} />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Heading size="sm">Special Attack</Heading>
                    <Progress value={50} rounded="full" mt={2} />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Heading size="sm">Special Defense</Heading>
                    <Progress value={50} rounded="full" mt={2} />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Heading size="sm">Speed</Heading>
                    <Progress value={50} rounded="full" mt={2} />
                  </GridItem>
                </Grid>
              </Stack>
            </Flex>
          </CardBody>
        </Card>
        <Card mt={6} p={4}>
          <Heading size="lg">Evolution Chain</Heading>
          <CardBody>
            <Flex gap={4} justifyContent="center" alignItems="center">
              <Stack alignItems="center">
                <Image
                  src="https://i.pinimg.com/originals/f5/54/89/f5548916ca86b30f7b8f418e4c5c6794.png"
                  alt="Pokemon"
                  width={250}
                  height={250}
                  objectFit="cover"
                />
                <Heading size="md">Pokemon Name</Heading>
                <Text>Pokemon ID</Text>
              </Stack>
              <ChevronRightIcon fontSize={100} />
              <Stack alignItems="center">
                <Image
                  src="https://i.pinimg.com/originals/f5/54/89/f5548916ca86b30f7b8f418e4c5c6794.png"
                  alt="Pokemon"
                  width={250}
                  height={250}
                  objectFit="cover"
                />
                <Heading size="md">Pokemon Name</Heading>
                <Text>Pokemon ID</Text>
              </Stack>
              <ChevronRightIcon fontSize={100} />
              <Stack alignItems="center">
                <Image
                  src="https://i.pinimg.com/originals/f5/54/89/f5548916ca86b30f7b8f418e4c5c6794.png"
                  alt="Pokemon"
                  width={250}
                  height={250}
                  objectFit="cover"
                />
                <Heading size="md">Pokemon Name</Heading>
                <Text>Pokemon ID</Text>
              </Stack>
            </Flex>
          </CardBody>
        </Card>
      </Container>
      <Outlet />
    </>
  )
}

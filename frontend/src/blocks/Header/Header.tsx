import { Box, Flex, Center, Heading } from '@chakra-ui/react';
import { Children } from '../../types';

interface HeaderProps {
  children?: Children;
}

export const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <Box as="header" w="100%" bgColor="lightblue">
      <Flex h="150px" mx="50px" justify="space-between">
        <Center>
          <Heading as="h1">Excursion Online Booking</Heading>
        </Center>
        <Center>{children}</Center>
      </Flex>
    </Box>
  );
};

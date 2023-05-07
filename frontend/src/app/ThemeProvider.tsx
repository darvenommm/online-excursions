import { ChakraProvider } from '@chakra-ui/react';

import { Children } from '../types';

interface ThemeProps {
  children: Children;
}

export const ThemeProvider = ({ children }: ThemeProps): JSX.Element => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const MainPageLink = (): JSX.Element => {
  return (
    <Link as={RouterLink} fontSize="20" to="/">
      Main
    </Link>
  );
};

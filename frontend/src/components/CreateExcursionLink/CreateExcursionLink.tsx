import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const CreateExcursionLink = (): JSX.Element => {
  return (
    <Link as={RouterLink} to="/create-excursion" fontSize="20px">
      Create a new excursion
    </Link>
  );
};

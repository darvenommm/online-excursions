import { VStack, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import type { IExcursion } from '../../types';

export const Excursion = ({
  id,
  imageUrl,
  title,
  city,
  date,
  theme,
  description,
}: IExcursion): JSX.Element => {
  return (
    <VStack
      as={Link}
      to={`/excursions/${id}`}
      spacing="10px"
      align="start"
      border="1px solid black"
      p="5px"
    >
      <Image
        maxW="250px"
        maxH="350px"
        src={`http://localhost:4000/${imageUrl}`}
        alt={title}
      />
      <Text>Title: {title}</Text>
      <Text>City: {city}</Text>
      <Text>Date: {date.split('-').join(' ')}</Text>
      <Text>Theme: {theme}</Text>
      <Text>Descriptions: {description}</Text>
    </VStack>
  );
};

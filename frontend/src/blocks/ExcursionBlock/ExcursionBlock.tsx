import { useState, useEffect } from 'react';
import { Container, Text, Image, HStack, VStack, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import type { IExcursion } from '../../types';

export const ExcursionBlock = (): JSX.Element => {
  const { id } = useParams();
  const [excursion, setExcursion] = useState<IExcursion | null>(null);

  useEffect((): void => {
    axios
      .get(`http://localhost:4000/excursions/${id}`)
      .then((response) => setExcursion(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <Container maxW="90%">
      <Box>
        {excursion ? (
          <HStack
            spacing="40px"
            align="start"
            p="10px"
            border="2px solid black"
            borderRadius="5px"
          >
            <Image
              maxH="150px"
              maxW="300px"
              src={`http://localhost:4000/${excursion.imageUrl}`}
            />
            <VStack align="start">
              <Text>Title: {excursion.title}</Text>
              <Text>Theme: {excursion.theme}</Text>
              <Text>City: {excursion.city}</Text>
              <Text>Date: {excursion.date}</Text>
              <Text>Description: {excursion.description}</Text>
            </VStack>
          </HStack>
        ) : (
          <Text fontSize="40px">Loading</Text>
        )}
      </Box>
    </Container>
  );
};

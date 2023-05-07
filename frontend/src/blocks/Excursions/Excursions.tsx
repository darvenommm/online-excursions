import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  GridItem,
  Center,
  Text,
  Box,
  Stack,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';

import { Excursion } from '../../components';

import { config } from '../../../config';

import type { IExcursion } from '../../types';

export const Excursions = (): JSX.Element => {
  const [excursions, setExcursions] = useState<IExcursion[]>([]);
  const allExcursions = useRef<IExcursion[]>([]);
  const [cityFilter, setCityFilter] = useState<string>('');
  const [themeFilter, setThemeFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect((): void => {
    axios
      .get<IExcursion[]>(`${config.serverUrl}/excursions/`)
      .then((response) => response.data)
      .then((data) => {
        allExcursions.current = data;
        setExcursions(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect((): void => {
    setExcursions(
      allExcursions.current.filter((excursion) => {
        const cityFilterCheck = cityFilter
          ? excursion.city.toLowerCase().includes(cityFilter.toLowerCase())
          : true;

        const themeFilterCheck = themeFilter
          ? excursion.theme.toLowerCase().includes(themeFilter.toLowerCase())
          : true;

        const dateFilterCheck = dateFilter
          ? excursion.date === dateFilter
          : true;

        return cityFilterCheck && themeFilterCheck && dateFilterCheck;
      }),
    );
  }, [cityFilter, themeFilter, dateFilter]);

  const excursionsElements = excursions.map((excursion) => (
    <GridItem display="flex" as="li" key={excursion.id}>
      <Excursion {...excursion} />
    </GridItem>
  ));

  const resetButtonClickHandler = (): void => {
    setCityFilter('');
    setThemeFilter('');
    setDateFilter('');
  };

  return (
    <Container as="main" maxW="90%">
      <Box
        minH="150"
        border="2px solid black"
        mb="20px"
        borderRadius="5px"
        p="5px"
      >
        <Stack as="form" spacing="20px">
          <Text fontSize="20px" fontWeight={700}>
            Search Block
          </Text>
          <div>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              id="city"
              placeholder="You can write city..."
              border="2px solid black"
              _hover={{ border: '2px solid black' }}
              value={cityFilter}
              onChange={(event) => setCityFilter(event.target.value)}
            />
          </div>
          <div>
            <FormLabel htmlFor="theme">Theme</FormLabel>
            <Input
              id="theme"
              placeholder="You can write theme..."
              border="2px solid black"
              _hover={{ border: '2px solid black' }}
              value={themeFilter}
              onChange={(event) => setThemeFilter(event.target.value)}
            />
          </div>
          <div>
            <FormLabel htmlFor="date">City</FormLabel>
            <Input
              type="date"
              id="date"
              border="2px solid black"
              _hover={{ border: '2px solid black' }}
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            />
          </div>
          <Button
            type="button"
            onClick={resetButtonClickHandler}
            border="2px solid black"
          >
            Reset
          </Button>
        </Stack>
      </Box>
      {excursions.length === 0 ? (
        <Center>
          <Text fontSize="40px">
            {isLoading ? 'Loading...' : 'There are not excursions'}
          </Text>
        </Center>
      ) : (
        <Grid
          as="ul"
          gap="20px"
          templateColumns="repeat(auto-fill, 250px)"
          listStyleType="none"
        >
          {excursionsElements}
        </Grid>
      )}
    </Container>
  );
};

import { Grid, GridItem } from '@chakra-ui/react';
import { Header } from '../blocks';

import type { Children } from '../types';

interface TemplateProps {
  headerItems?: Children;
  bodyItems?: Children;
}

export const Template = ({
  headerItems,
  bodyItems,
}: TemplateProps): JSX.Element => {
  return (
    <Grid gap="20px" bgColor="#f7f7f7" minH="100vh" templateRows="150px 1fr">
      <GridItem>
        <Header>{headerItems}</Header>
      </GridItem>
      <GridItem mb="50px">{bodyItems}</GridItem>
    </Grid>
  );
};

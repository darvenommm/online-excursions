import { Template } from '../Template';
import { MainPageLink, CreateExcursionLink } from '../../components';
import { ExcursionBlock } from '../../blocks/ExcursionBlock/ExcursionBlock';
import { HStack, VStack } from '@chakra-ui/react';
import { Comments } from '../../blocks';

export const ExcursionPage = (): JSX.Element => {
  return (
    <Template
      headerItems={
        <HStack spacing="10px">
          <MainPageLink />
          <CreateExcursionLink />
        </HStack>
      }
      bodyItems={
        <VStack>
          <ExcursionBlock />
          <Comments />
        </VStack>
      }
    />
  );
};

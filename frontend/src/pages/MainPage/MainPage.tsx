import { Excursions } from '../../blocks';
import { CreateExcursionLink } from '../../components';
import { Template } from '../Template';

export const MainPage = (): JSX.Element => {
  return (
    <Template
      headerItems={<CreateExcursionLink />}
      bodyItems={<Excursions />}
    />
  );
};

import { Template } from '../Template';

import { MainPageLink } from '../../components';
import { ExcursionForm } from '../../blocks';

export const CreateExcursionPage = (): JSX.Element => {
  return (
    <Template headerItems={<MainPageLink />} bodyItems={<ExcursionForm />} />
  );
};

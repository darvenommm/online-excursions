import {
  createBrowserRouter,
  RouterProvider as _RouterProvider,
} from 'react-router-dom';

import { MainPage, CreateExcursionPage, ExcursionPage } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/create-excursion',
    element: <CreateExcursionPage />,
  },
  {
    path: '/excursions/:id',
    element: <ExcursionPage />,
  },
]);

export const RouterProvider = (): JSX.Element => {
  return <_RouterProvider router={router} />;
};

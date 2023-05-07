import { ThemeProvider } from './ThemeProvider';
import { RouterProvider } from './RouterProvider';

export const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  );
};

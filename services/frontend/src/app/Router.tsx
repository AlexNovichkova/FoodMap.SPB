import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from 'src/pages/HomePage';
import { Layout } from './Layout';

function getBasename() {
  const path = window.location.pathname;

  if (path.startsWith('/foodmap')) {
    return '/foodmap/';
  }

  return '/';
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />
        }
      ]
    }
  ],
  { basename: getBasename() }
);

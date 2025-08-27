import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/app/App';
import Home from './pages/home/Home';
import New from './pages/new/New';
import Import from './pages/import/Import';

import { homeLoader } from './loaders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        loader: homeLoader ,
        element: <Home />,
      },
      {
        path: 'new-product',
        element: <New/>
      },
      {
        path: 'import',
        element: <Import/>
      }
    ],
  },
]);

export const Routes : React.FC = () => <RouterProvider router={router} />;
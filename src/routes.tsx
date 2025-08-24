import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/app/App';
import Home from './pages/home/Home';
import New from './pages/new/New';
import Edit from './pages/edit/Edit';
import Import from './pages/import/Import';

import { homeLoader, editLoader } from './loaders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'products',
        index: true,
        loader: homeLoader ,
        element: <Home />,
      },
      {
        path: 'new-product',
        element: <New/>
      },
      {
        path: 'products/edit',
        loader: editLoader,
        element: <Edit/>
      },
      {
        path: 'products/import',
        element: <Import/>
      }
    ],
  },
]);

export const Routes : React.FC = () => <RouterProvider router={router} />;
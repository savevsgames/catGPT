import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import '/src/index.css';
import Welcome from './pages/welcome.tsx'
import Signup from './pages/signup.tsx'

const router = createBrowserRouter ([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: '/Signup',
        element: <Signup />,
      },
      // {
      //   path: '/Profile',
      //   element: <Profile />,
      // },
      // {
      //   path: '/Cat',
      //   element: <Cat />,       
      // },
      // {
      //   path: '/Error',
      //   element: <Error />,
      // },   
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

export default router;
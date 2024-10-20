import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import '/src/index.css';
import Landing from './pages/Landing.tsx'
import Signup from './pages/Signup.tsx'

const router = createBrowserRouter ([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/Signup',
        element: <Signup />,
      },
      // {
      //   path: '/Login',
      //   element: <Login />,
      // },
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
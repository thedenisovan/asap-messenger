import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: 'auth',
        element: <h1>Auth Layout</h1>,
        children: [
          // TODO: add signin and signup page Components
          { path: 'signin', element: <h1>Signin</h1> },
          { path: 'signup', element: <h1>Signup</h1> },
        ],
      },
    ],
  },
]);

export default router;

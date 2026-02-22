import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/home/Home';
import Auth from '../pages/auth/Auth';
import SignIn from '../pages/auth/SingIn';
import SingUp from '../pages/auth/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: 'auth',
        Component: Auth,
        children: [
          // TODO: add signin and signup page Components
          { path: 'signin', Component: SignIn },
          { path: 'signup', Component: SingUp },
        ],
      },
    ],
  },
]);

export default router;

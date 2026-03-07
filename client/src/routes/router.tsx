import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/home/Home';
import Auth from '../pages/auth/Auth';
import SignIn from '../pages/auth/SingIn';
import SingUp from '../pages/auth/SignUp';
import ErrorPage from '../components/layout/ErrorPage';
import ChatPage from '../pages/chats/ChatPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      {
        path: 'auth',
        Component: Auth,
        children: [
          { path: 'signin', Component: SignIn },
          { path: 'signup', Component: SingUp },
        ],
      },
      {
        path: 'chatPage/:uid',
        Component: ChatPage,
      },
    ],
  },
]);

export default router;

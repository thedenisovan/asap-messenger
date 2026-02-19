import { createBrowserRouter } from 'react-router';
import App from '../App';
// import { Component } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      // TODO: add home page Component
      { index: true, element: <h1>Home</h1> },
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

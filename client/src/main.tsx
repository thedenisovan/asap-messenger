import { RouterProvider } from 'react-router/dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from './routes/router.tsx';
import './index.css';

// Init uid with 0 to prevent error of getting user
// with id 'null' from db
if (!localStorage.getItem('uid')) {
  localStorage.setItem('uid', '0');
}

document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark',
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

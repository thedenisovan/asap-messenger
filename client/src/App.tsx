import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

function App() {
  const [globalTheme, setGlobalTheme] = useState<string>(
    localStorage.theme ?? 'dark',
  );
  const navigate = useNavigate();
  const uid = localStorage.getItem('uid');

  useEffect(() => {
    const navSignedUser = () => {
      if (uid !== '0') {
        navigate(`/dashboard/${uid}`, { replace: true });
      }
    };

    navSignedUser();
  }, [uid, navigate]);

  // Toggles between dark and light theme
  const toggleGlobalTheme = () => {
    if (globalTheme === 'dark') {
      setGlobalTheme('light');
    } else {
      setGlobalTheme('dark');
    }
  };
  // After state change toggle theme based on global theme state
  document.documentElement.classList.toggle('dark', globalTheme === 'dark');
  localStorage.setItem('theme', globalTheme);

  return (
    <>
      <Outlet context={{ toggleGlobalTheme, globalTheme }} />
    </>
  );
}

export default App;

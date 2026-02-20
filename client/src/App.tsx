import { useState } from 'react';
import { Outlet } from 'react-router';

function App() {
  const [globalTheme, setGlobalTheme] = useState<string>(
    localStorage.theme ?? 'dark',
  );

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
      <button onClick={() => toggleGlobalTheme()}>ss</button>
      <Outlet context={toggleGlobalTheme} />
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';

export function useBrowserMode() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDarkMode(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersDarkMode(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersDarkMode;
}

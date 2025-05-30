import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import MoviesPage from './pages/Movies.tsx';
import { useBrowserMode } from './hooks/useBrowserMode.tsx';
import { darkTheme, lightTheme } from './theme.tsx';

function App() {
  const prefersDarkMode = useBrowserMode();

  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <MoviesPage />
    </ThemeProvider>
  );
}

export default App;

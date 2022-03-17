import { useState } from 'react';
import { ThemeProvider } from 'react-jss';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/index';
import { themes } from './theme';

const App = () => {
  const [theme, setTheme] = useState(themes.light);
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

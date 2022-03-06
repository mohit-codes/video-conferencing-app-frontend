import { useState } from 'react';
import { ThemeProvider } from 'react-jss';
import { Button } from './components';
import { themes } from './theme';

const App = () => {
  const [theme, setTheme] = useState(themes.light);
  return (
    <ThemeProvider theme={theme}>
      <Button>Please click to proceed</Button>
    </ThemeProvider>
  );
};

export default App;

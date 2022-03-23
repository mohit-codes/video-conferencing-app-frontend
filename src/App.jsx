import JssPluginExtend from 'jss-plugin-extend';
import { Suspense, lazy, useState } from 'react';
import { ThemeProvider, jss } from 'react-jss';
import { Route, Routes } from 'react-router-dom';
import { themes } from './theme';

jss.use(JssPluginExtend);

const App = () => {
  const [theme, setTheme] = useState(themes.light);
  const Login = lazy(() => import('./pages/login'));
  const Signup = lazy(() => import('./pages/signup'));

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback='Loading....'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;

import JssPluginExtend from 'jss-plugin-extend';
import { Suspense, lazy, useState } from 'react';
import { ThemeProvider, jss } from 'react-jss';
import { Route, Routes } from 'react-router-dom';
import { themes } from './theme';

jss.use(JssPluginExtend);

const App = () => {
  const [theme, setTheme] = useState(themes.light);
  const Login = lazy(() => import('./pages/Login'));
  const Signup = lazy(() => import('./pages/Signup'));
  const Home = lazy(() => import('./pages/Home'));
  const JoinMeeting = lazy(() => import('./pages/JoinMeeting'));
  const Profile = lazy(() => import('./pages/Profile'));

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback='Loading....'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/join' element={<JoinMeeting />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;

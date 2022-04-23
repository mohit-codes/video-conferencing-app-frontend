import JssPluginExtend from 'jss-plugin-extend';
import { lazy, Suspense, useState } from 'react';
import { jss, ThemeProvider } from 'react-jss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loading } from './components';
import { MeetProvider, OrgProvider } from './contexts';
import { useAuth } from './contexts/authContext';
import { themes } from './theme';

jss.use(JssPluginExtend);

/**
 * when app rerenders, a new instance of these lazy components gets created,
 * causing the tree to change and child component to unmount and then remount,
 * instead of just rerendering. so putting them outside the app insures that
 * they instantiate only once.
 */
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Home = lazy(() => import('./pages/Home'));
const JoinMeeting = lazy(() => import('./pages/JoinMeeting'));
const Profile = lazy(() => import('./pages/Profile'));
const Meeting = lazy(() => import('./pages/Meeting'));
const NewMeeting = lazy(() => import('./pages/NewMeeting'));

const App = () => {
  const [theme, setTheme] = useState(themes.light);
  const { state } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <Routes>
          {state.token ? (
            <>
              <Route path='/home' element={<Home />} />
              <Route path='/join' element={<JoinMeeting />} />
              <Route
                path='/profile'
                element={
                  <OrgProvider>
                    <Profile />
                  </OrgProvider>
                }
              />
              <Route
                path='/new'
                element={
                  <OrgProvider>
                    <NewMeeting />
                  </OrgProvider>
                }
              />
              <Route
                path='/meet/:meetingCode'
                element={
                  <MeetProvider>
                    <Meeting />
                  </MeetProvider>
                }
              />
              <Route path='*' element={<Navigate to='/home' replace />} />
            </>
          ) : (
            <>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;

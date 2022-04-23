import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, MeetInfoProvider } from './contexts';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <MeetInfoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MeetInfoProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

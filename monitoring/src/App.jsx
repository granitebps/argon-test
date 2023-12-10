import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './scss/style.scss';
import { getFirebaseToken, messaging } from './FirebaseConfig';
import { onMessage } from 'firebase/messaging';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers['Content-Type'] = 'application/json';

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import('./layouts/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./pages/Login'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const onMessageListener = (async () => {
    const messagingResolve = await messaging;
    if (messagingResolve) {
      onMessage(messagingResolve, (payload) => {
        alert(payload.notification.title);
        console.log({ payload });
      });
    }
  })();

  const handleGetFirebaseToken = () => {
    getFirebaseToken().then((firebaseToken) => {
      if (firebaseToken) {
        console.log(firebaseToken);
      }
    });
  };

  // Need this handle FCM token generation when a user manually blocks or allows notification
  useEffect(() => {
    if ('Notification' in window && window.Notification?.permission === 'granted') {
      handleGetFirebaseToken();
    }
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route index path='/' id='Login Page' element={<Login />} />
          {/* <Route path='/dashboard' name='Dashboard' element={<Dashboard />} /> */}
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} /> */}
          {/* <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
          {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
          <Route path='*' name='Home' element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { init } from '@noriginmedia/norigin-spatial-navigation';

init();
// init({
//   debug: true,
//   visualDebug: true,
//   throttle: 0,
// });

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
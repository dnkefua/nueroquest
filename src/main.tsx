import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';

import { UDLProvider } from './context/UDLContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UDLProvider>
      <App />
    </UDLProvider>
  </React.StrictMode>,
)

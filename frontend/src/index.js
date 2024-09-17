// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import './index.css';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './context/authConfigure'; // Import msalConfig
import { GlobalProvider } from './context/globalContext';


const pca = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
    <GlobalProvider>
      <GlobalStyle />
      <App />
      </GlobalProvider>
    </MsalProvider>
  </React.StrictMode>
);



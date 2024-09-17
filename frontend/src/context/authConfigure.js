// src/authConfig.js
import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: 'fb84304e-c61d-49d0-9042-92c1c7424888', 
    authority: 'https://aiexpense.b2clogin.com/aiexpense.onmicrosoft.com/B2C_1_signupsignin',
    redirectUri: 'http://localhost:3000', 
    knownAuthorities: ['aiexpense.b2clogin.com'],
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const pca = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ['https://aiexpense.onmicrosoft.com/Expense/Read'],
};

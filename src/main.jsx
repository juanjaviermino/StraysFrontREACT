import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './/context/store.js';
import { PrimeReactProvider } from 'primereact/api';
import { locale, addLocale } from 'primereact/api';
import esLocale from './assets/es.json';

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';  

addLocale('es', esLocale);
locale('es');

import AppAuth from './AppAuth.jsx'
import AppUnauth from './AppUnauth.jsx'

// Authentication
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './auth-config';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from '@azure/msal-react';

// --------------- Auth logic ------------------------------------------

const msalInstance = new PublicClientApplication(msalConfig);

// Set the first account as active if there are accounts and no active account
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        msalInstance.setActiveAccount(account);
    }
});

const RootComponent = () =>{
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  
  return (
    <>
        <AuthenticatedTemplate>
            {activeAccount ? (
                <Provider store={store}>
                  <PrimeReactProvider>
                    <AppAuth />
                  </PrimeReactProvider>
                </Provider>
            ) : null}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
                <Provider store={store}>
                  <PrimeReactProvider>
                    <AppUnauth />
                  </PrimeReactProvider>
                </Provider>
        </UnauthenticatedTemplate>
    </>
);
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <MsalProvider instance={msalInstance}>
      <RootComponent />
    </MsalProvider>
)



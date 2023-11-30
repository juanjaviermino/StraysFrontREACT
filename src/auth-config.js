import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: '0b04b05d-2a83-4d52-a6df-cc5b3489a709',
        authority: 'https://login.microsoftonline.com/udla.edu.ec',
        redirectUri: '/StraysFrontREACT',
        postLogoutRedirectUri: '/',
        navigateToLoginRequestUri: false,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const loginRequest = {
    scopes: ['user.read'],
};
                      
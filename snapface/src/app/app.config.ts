import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {httpInterceptorProviders} from './Interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //ligne pour importer la nouvelle manière de faire appelle à HttpClient
    provideHttpClient(withInterceptorsFromDi()),
    //ligne pour les tokens
    httpInterceptorProviders,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ]
};

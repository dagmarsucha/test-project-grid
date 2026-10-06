import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { PfxTranslateModule } from '@papirfly-ui/angular-extensions/translate';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideAnimations(), // replaces BrowserAnimationsModule
    provideHttpClient(withFetch()),
    importProvidersFrom(
      PfxTranslateModule.forRoot({
        translationSets: [{ set: 'core', repository: 'i18n-shared' }],
        defaultSet: 'core',
        //laeId: 4, //spanish
      }),
    ),
  ],
};

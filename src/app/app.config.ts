import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getCustomPaginatorIntl} from './shared/components/paginator/customePaginator';
import {provideHttpClient, withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide: MatPaginatorIntl, useFactory: getCustomPaginatorIntl
    }
  ]
};

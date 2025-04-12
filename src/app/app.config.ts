import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getCustomPaginatorIntl} from './shared/components/paginator/customePaginator';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: MatPaginatorIntl, useFactory: getCustomPaginatorIntl
    }
  ]
};

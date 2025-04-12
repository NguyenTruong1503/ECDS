import { signalStore, withState, withHooks } from '@ngrx/signals';
import {signal} from '@angular/core';


export const CollapsedStore = signalStore(
  { providedIn: 'root' },
  withState(() => ({
    collapsed: signal(
      false,
    ),
  })),
);

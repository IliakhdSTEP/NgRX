
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { tasksReducer } from './store/tasks/tasks.reducer';
import { TasksEffects } from './store/tasks/tasks.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      tasks: tasksReducer
    }),
    provideEffects(TasksEffects),
    provideStoreDevtools({
      maxAge: 25
    })
  ]
};

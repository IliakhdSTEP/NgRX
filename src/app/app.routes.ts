
import { Routes } from '@angular/router';
import { TaskManagement } from './features/task-management/task-management';

export const routes: Routes = [
  {
    path: '',
    component: TaskManagement
  },
  {
    path: '**',
    redirectTo: ''
  }
];

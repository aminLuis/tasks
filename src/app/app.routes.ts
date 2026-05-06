import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'features/tasks/task',
    pathMatch: 'full'
  },
  {
    path: 'features/tasks/task',
    loadComponent: () =>
      import('./features/tasks/task.page').then(m => m.TaskPage)
  }
];

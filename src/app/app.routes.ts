import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/tasks',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadComponent: () => import('./features/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'tasks',
        loadComponent: () => import('./features/tasks/task.page').then(m => m.TaskPage)
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/categories/category/category.page').then(m => m.CategoryPage)
      },
      {
        path: '',
        redirectTo: '/tabs/tasks',
        pathMatch: 'full'
      }
    ]
  }
];

import { Routes } from '@angular/router';
import {authGuard} from './_guards/auth-guard';


// Pour crée des sous routes, crée un fichier dans la _page/nom-de-la-page/nom-de-la-page.routes.ts avec la meme structure que ce fichier
// Dans ce fichier ajouter une routes /catalogue qui load la route catalogue.routes.ts
// Les urls seront donc /catalogue/sous-route
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./_pages/home/home').then(m => m.Home)
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./_pages/posts/detail/detail').then(m => m.Detail)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./_pages/login/login').then(m => m.Login)
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./_pages/account/account').then(m => m.Account),
    canActivate: [authGuard]
  },
  {
    path: '404',
    loadComponent: () =>
      import('./_pages/error/error404/error404').then(m => m.Error404)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

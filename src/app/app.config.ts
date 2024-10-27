import { provideRouter, Routes, withEnabledBlockingInitialNavigation } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { AuthGuardService } from './core/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) }
    ]
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    children: [
      { path: '', loadComponent: () => import('./dashboard/home/home.component').then(m => m.HomeComponent) },
      { path: 'profile', loadComponent: () => import('./dashboard/profile/profile.component').then(m => m.ProfileComponent) }
    ]
  },
  { path: '**', redirectTo: 'auth/login' }
];

// Configuração correta usando `ApplicationConfig`
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation())
  ]
};

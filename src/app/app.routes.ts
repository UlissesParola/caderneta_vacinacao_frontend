import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

// Definição das rotas
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona a rota inicial para Login
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent }
];
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Modelo de dados para criar o usuário
export interface CreateUsuarioRequest {
  Nome: string;
  Sobrenome: string;
  Cpf: string;
  Email: string;
  Password: string;
  DataNascimento: string;
  Sexo: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  // Método para criar um novo usuário com tratamento de erro
  createUsuario(usuarioData: CreateUsuarioRequest): Observable<any> {
    return this.http.post(this.apiUrl, usuarioData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao criar usuário:', error); // Log para depuração
        return throwError(() => error); // Lança o erro para o componente
      })
    );
  }
}

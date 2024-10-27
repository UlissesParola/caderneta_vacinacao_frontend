import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de dados para criar o usuário
export interface CreateUsuarioRequest {
  Nome: string;
  Sobrenome: string;
  Cpf: string;
  Email: string;
  Password: string;
  DataNascimento: string; // Usei string para DateOnly
  Sexo: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://seu-backend-url.com/api/usuarios'; // Defina a URL base da API aqui

  constructor(private http: HttpClient) {}

  // Método para criar um novo usuário
  createUsuario(usuarioData: CreateUsuarioRequest): Observable<any> {
    return this.http.post(this.apiUrl, usuarioData);
  }
}

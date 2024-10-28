import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = environment.apiUrl;
  private apiUrl = this.baseUrl + '/usuarios';

  constructor(private http: HttpClient) {}

  // Método para criar um novo usuário
  createUsuario(usuarioData: CreateUsuarioRequest): Observable<any> {
    return this.http.post(this.apiUrl, usuarioData);
  }
}

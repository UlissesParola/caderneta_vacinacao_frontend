import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService, CreateUsuarioRequest } from '../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }

  // Validação para emails ao sair do campo confirmEmail
  checkEmailMatch() {
    const email = this.cadastroForm.get('email')?.value;
    const confirmEmail = this.cadastroForm.get('confirmEmail')?.value;

    if (email !== confirmEmail) {
      this.cadastroForm.get('confirmEmail')?.setErrors({ emailsMismatch: true });
    } else {
      this.cadastroForm.get('confirmEmail')?.setErrors(null);
    }
  }

  // Validação para senhas ao sair do campo confirmPassword
  checkPasswordMatch() {
    const password = this.cadastroForm.get('password')?.value;
    const confirmPassword = this.cadastroForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.cadastroForm.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
    } else {
      this.cadastroForm.get('confirmPassword')?.setErrors(null);
    }
  }

  // Método para enviar os dados ao backend
  onSubmit() {
    if (this.cadastroForm.valid) {
      const formData = this.cadastroForm.value;

      // Criando o objeto para envio ao backend
      const usuarioData: CreateUsuarioRequest = {
        Nome: formData.nome,
        Sobrenome: formData.sobrenome,
        Cpf: formData.cpf,
        Email: formData.email,
        Password: formData.password,
        DataNascimento: formData.dataNascimento,
        Sexo: formData.sexo
      };

      // Utilizando o serviço para enviar os dados
      this.usuarioService.createUsuario(usuarioData).subscribe(
        response => {
          console.log('Usuário cadastrado com sucesso!', response);
          // Adicione lógica de sucesso aqui, como redirecionamento
        },
        error => {
          console.error('Erro ao cadastrar usuário', error);
          // Adicione lógica de erro aqui, como exibir mensagem ao usuário
        }
      );
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}

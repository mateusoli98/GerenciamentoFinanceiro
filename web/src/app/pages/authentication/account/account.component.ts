import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { SignUpRequest } from 'src/app/models/request/authRequest.model';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  hide = true;
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.intitForm();
  }

  intitForm() {
    this.form = this.fb.group({
      name: [null, [Validators.minLength(2), Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
      confirmPassword: [null, [Validators.minLength(6), Validators.required]],
    });
  }

  get name() {
    return this.form.get('name')?.value;
  }

  get email() {
    return this.form.get('email')?.value;
  }

  get password() {
    return this.form.get('password')?.value;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword')?.value;
  }

  navigateLogin() {
    this.route.navigate([RoutesEnum.Login]);
  }

  async onSubmitForm() {
    const request = this.getRequest();

    if (!this.validateForm()) return;

    if (request) {
      const result = await this.authService.createAccount(request).toPromise();

      if (result) {
        this.snackbarService.showMessage('Usuário criado com sucesso!');
        this.navigateLogin();
      }
    }
  }

  getRequest(): SignUpRequest | null {
    if (!this.name && !this.email && !this.password) {
      return null;
    }

    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }

  validateForm() {
    let isValid: boolean = true;

    if (this.form.get('email')?.invalid) {
      this.snackbarService.showMessage('E-mail invalido');
      isValid = false;
    }

    if (this.password !== this.confirmPassword) {
      this.snackbarService.showMessage('Erro: As senhas não correspondem!');
      isValid = false;
    }

    return isValid;
  }
}

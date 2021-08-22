import { LoginRequest } from './../../../models/request/authRequest.model';
import { AuthService } from './../../../services/auth.service';
import { RoutesEnum } from '../../../enums/routes.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.intitForm();
  }

  intitForm() {
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
    });
  }

  get email() {
    return this.form.get('email')?.value;
  }

  get password() {
    return this.form.get('password')?.value;
  }

  async onSubmitForm() {
    const request = this.getLoginRequest();

    if (this.form.valid && request) {
      let result = await this.authService.login(request);

      if (result) {
        this.route.navigate(['']);
      } else {
        //mostrar toast de login invalido
      }
    }
  }

  getLoginRequest(): LoginRequest | null {
    if (!this.email && !this.password) {
      return null;
    }

    return {
      email: this.email,
      password: this.password,
    };
  }

  navigateCreateAccount() {
    this.route.navigate([RoutesEnum.Account]);
  }
}

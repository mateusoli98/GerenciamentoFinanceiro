import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { SignUpRequest } from 'src/app/models/request/authRequest.model';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
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

  navigateLogin() {
    this.route.navigate([RoutesEnum.Login]);
  }

  onSubmitForm() {}

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
}

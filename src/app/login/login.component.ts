import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthServiceService} from '../service/auth-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService) {
      authService.getCurrentUser()
        .pipe()
        .subscribe(res => {
          if (res) {
            router.navigateByUrl('/test');
          }
        });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.authService.login(this.f.login.value, this.f.password.value)
      .pipe(first())
      .subscribe(() => this.router.navigateByUrl('/home'), () => this.loading = false);
  }

}

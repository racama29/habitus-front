import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email = '';
  password = '';
  isRegister = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async submit() {
    try {
      if (this.isRegister) {
        await this.auth.register(this.email, this.password);
      } else {
        await this.auth.login(this.email, this.password);
      }
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err.message;
    }
  }
}

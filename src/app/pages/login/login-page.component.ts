import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (userId: number) => {
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.error = 'Error al iniciar sesión';
        console.error(err);
      }
    });
  }
}

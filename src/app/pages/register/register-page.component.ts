import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.isLoading = true;

    this.authService.register(this.email, this.password, this.nombre).subscribe({
      next: (userId: number) => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.error = 'Error al crear la cuenta. Inténtalo de nuevo.';
        console.error(err);
      }
    });
  }
}

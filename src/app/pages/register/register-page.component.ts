import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class RegisterPageComponent implements OnInit, OnDestroy {
  nombre: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;

  isDarkMode = false;
  private darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private darkModeListener = (event: MediaQueryListEvent) => {
    this.isDarkMode = event.matches;
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isDarkMode = this.darkModeMediaQuery.matches;
    this.darkModeMediaQuery.addEventListener('change', this.darkModeListener);
  }

  ngOnDestroy(): void {
    this.darkModeMediaQuery.removeEventListener('change', this.darkModeListener);
  }

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

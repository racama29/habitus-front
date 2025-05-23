import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ProfilePageComponent implements OnInit {
  userId!: number;
  userEmail!: string;
  userData: any = {};
  metrics: any = null;

  editing: { [key: string]: boolean } = {
    nombre: false
  };

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    if (!id) {
      this.router.navigate(['/login']);
      return;
    }

    this.userId = id;
    this.getUser();
    this.getMetrics();
  }

  getUser(): void {
    this.http.get<any>(`${environment.apiUrl}/users/${this.userId}`).subscribe(user => {
      this.userData = user;
      this.userEmail = user.email;
    });
  }

  getMetrics(): void {
    this.http.get<any>(`${environment.apiUrl}/users/${this.userId}/metrics`).subscribe(metrics => {
      this.metrics = metrics;
    });
  }

  enableEdit(field: string): void {
    this.editing[field] = true;
  }

  updateField(field: string): void {
    this.http.put(`${environment.apiUrl}/users/${this.userId}`, {
      [field]: this.userData[field]
    }).subscribe(() => {
      this.editing[field] = false;
    });
  }

  resetPassword(): void {
    this.authService.resetPassword(this.userEmail);
  }

  logout(): void {
    this.authService.logout();
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitBoardComponent } from '../../components/habit-board/habit-board.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HabitBoardComponent],
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userName: string = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any>(`${environment.apiUrl}/api/users/${userId}`).subscribe({
      next: user => {
        this.userName = user.nombre;
      },
      error: () => {
        this.userName = 'Usuario';
      }
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}

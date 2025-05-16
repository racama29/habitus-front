import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { HabitBoardComponent } from '../../components/habit-board/habit-board.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HabitBoardComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userName = '';

  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      const ref = doc(this.firestore, 'users', user.uid);
      const snapshot = await getDoc(ref);
      const data = snapshot.data() as { firstName?: string };
      this.userName = data?.firstName ?? 'Usuario';
      
    }
  }
  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HabitService, Habit } from '../../core/habit/habit.service';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-habit-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './habit-board.component.html',
  styleUrls: ['./habit-board.component.css']
})
export class HabitBoardComponent implements OnInit {
  pending: Habit[] = [];
  inProgress: Habit[] = [];
  completed: Habit[] = [];

  showForm = false;

  newHabit = {
    titulo: '',
    objetivo: '',
    frecuencia: '',
    color: '#2196f3'
  };

  async addHabit() {
    const user = await this.auth.currentUser;
    if (!user) return;
  
    const habitData = {
      ...this.newHabit,
      estado: 'pending',
      userId: user.uid
    };
  
    this.habitService.createHabit(habitData).subscribe((habit: Habit) => {
      this.pending.push(habit);
      this.cancel();
    });
    
  }

  cancel() {
    this.showForm = false;
    this.newHabit = {
      titulo: '',
      objetivo: '',
      frecuencia: '',
      color: '#2196f3'
    };
  }

  private habitService = inject(HabitService);
  private auth = inject(Auth);

  async ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.habitService.getHabitsByUser(user.uid).subscribe(habits => {
          this.pending = habits.filter(h => h.estado === 'pending');
          this.inProgress = habits.filter(h => h.estado === 'in_progress');
          this.completed = habits.filter(h => h.estado === 'completed');
        });
      }
    });
  }

  marcarComoEnProceso(habit: Habit) {
    habit.estado = 'in_progress';
    this.habitService.updateHabitState(habit.id, 'in_progress').subscribe(() => {
      this.inProgress.push(habit);
      this.pending = this.pending.filter(h => h.id !== habit.id);
    });
  }
  
  marcarComoCompletado(habit: Habit) {
    habit.estado = 'completed';
    this.habitService.updateHabitState(habit.id, 'completed').subscribe(() => {
      this.completed.push(habit);
      this.inProgress = this.inProgress.filter(h => h.id !== habit.id);
    });
  }
  
  
  }

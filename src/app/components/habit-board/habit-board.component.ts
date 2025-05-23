import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../core/habit/habit.service';
import { AuthService } from '../../core/auth.service';
import { Habit } from '../../core/habit/habit.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitHistoryComponent } from '../habit-history/habit-history.component';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HabitHistoryComponent],
  selector: 'app-habit-board',
  templateUrl: './habit-board.component.html',
  styleUrls: ['./habit-board.component.css']
})
export class HabitBoardComponent implements OnInit {
  userId!: number;

  pending: Habit[] = [];
  inProgress: Habit[] = [];
  completed: Habit[] = [];

  newHabit: Partial<Habit> = {
    titulo: '',
    objetivo: '',
    frecuencia: 'DAILY',
    fechaFin: '',
    color: '#2196f3'
  };

  showForm: boolean = false;

  constructor(
    private habitService: HabitService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const uid = this.authService.getUserId();
    if (!uid) {
      this.router.navigate(['/login']);
      return;
    }

    this.userId = uid;
    this.loadHabits();
  }

  loadHabits(): void {
    this.habitService.getHabitsByUser(this.userId.toString()).subscribe(habits => {
      this.pending = habits.filter(h => h.estado === 'pending');
      this.inProgress = habits.filter(h => h.estado === 'in_progress');
      this.completed = habits.filter(h => h.estado === 'completed');
    });
  }

  addHabit(): void {
    if (!this.newHabit.titulo || !this.newHabit.objetivo || !this.newHabit.frecuencia) return;
  
    const habitData: any = {
      titulo: this.newHabit.titulo,
      objetivo: this.newHabit.objetivo,
      frecuencia: this.newHabit.frecuencia,
      color: this.newHabit.color,
      estado: 'pending'
    };
  
    if (this.newHabit.fechaFin && this.newHabit.fechaFin !== '') {
      habitData.fechaFin = this.newHabit.fechaFin;
    }

    this.habitService.addHabit(this.userId, habitData as Habit).subscribe((createdHabit: Habit) => {
      this.showForm = false;
      this.newHabit = {
        titulo: '',
        objetivo: '',
        frecuencia: 'DAILY',
        fechaFin: '',
        color: '#2196f3'
      };
      this.pending.push(createdHabit);
    });
  }

  cancel(): void {
    this.showForm = false;
  }

  marcarComoEnProceso(habit: Habit): void {
    const updatedHabit = { ...habit, estado: 'in_progress' as 'in_progress' };
    this.habitService.updateHabit(updatedHabit).subscribe(() => this.loadHabits());
  }

  marcarComoCompletado(habit: Habit): void {
    const updatedHabit = { ...habit, estado: 'completed' as 'completed' };
    this.habitService.updateHabit(updatedHabit).subscribe(() => this.loadHabits());
  }

  esActivo(habit: Habit): boolean {
    if (!habit.fechaFin) return true;
    const today = new Date().toISOString().split('T')[0];
    return habit.fechaFin >= today;
  }

  get pendingActivos(): Habit[] {
    return this.pending.filter(h => this.esActivo(h));
  }
  
  get inProgressActivos(): Habit[] {
    return this.inProgress.filter(h => this.esActivo(h));
  }
  
  get completedActivos(): Habit[] {
    return this.completed.filter(h => this.esActivo(h));
  }

}

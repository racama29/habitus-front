import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Habit {
  id: number;
  titulo: string;
  objetivo: string;
  frecuencia: string;
  color: string;
  estado: 'pending' | 'in_progress' | 'completed';
  fechaFin?: string;
}

export interface HabitMetrics {
  total: number;
  completados: number;
  fallidos: number;
  enProceso: number;
}


@Injectable({ providedIn: 'root' })
export class HabitService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHabitsByUser(userId: string): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${environment.apiUrl}/habits/user/${userId}`);
  }  
  
  createHabit(habit: any) {
    return this.http.post<Habit>(`${this.apiUrl}/habits/${habit.userId}`, habit);
  }

  updateHabitState(id: number, estado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/habits/${id}/estado`, { estado });
  }
  
  getUserMetrics(userId: string): Observable<HabitMetrics> {
    return this.http.get<HabitMetrics>(`${this.apiUrl}/habits/metrics/${userId}`);
  }
  
  addHabit(userId: number, habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(`${this.apiUrl}/habits/user/${userId}`, habit);
  }
  
  updateHabit(habit: Habit): Observable<Habit> {
    return this.http.put<Habit>(`${this.apiUrl}/habits/${habit.id}`, habit);
  }

}

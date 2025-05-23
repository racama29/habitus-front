import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getHabitsByUser(userId: string): Observable<Habit[]> {
    return this.http.get<Habit[]>(`http://localhost:8080/api/habits/user/${userId}`);
  }  
  
  createHabit(habit: any) {
    return this.http.post<Habit>(`http://localhost:8080/api/habits/${habit.userId}`, habit);
  }

  updateHabitState(id: number, estado: string): Observable<any> {
    return this.http.put(`http://localhost:8080/api/habits/${id}/estado`, { estado });
  }
  
  getUserMetrics(userId: string): Observable<HabitMetrics> {
    return this.http.get<HabitMetrics>(`http://localhost:8080/api/habits/metrics/${userId}`);
  }
  
  addHabit(userId: number, habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(`http://localhost:8080/api/habits/user/${userId}`, habit);
  }
  
  updateHabit(habit: Habit): Observable<Habit> {
    return this.http.put<Habit>(`http://localhost:8080/api/habits/${habit.id}`, habit);
  }

}

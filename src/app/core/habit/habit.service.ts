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
}

@Injectable({ providedIn: 'root' })
export class HabitService {
  private baseUrl = 'http://localhost:8080/api/habits'; // Cambia según backend

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
  

  

}

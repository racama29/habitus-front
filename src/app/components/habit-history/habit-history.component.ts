import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-habit-history',
  imports: [CommonModule],
  templateUrl: './habit-history.component.html',
  styleUrls: ['./habit-history.component.css']
})
export class HabitHistoryComponent implements OnInit {
  @Input() habitId!: number;
  updates: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.habitId) {
      this.http.get<any[]>(`${environment.apiUrl}/habits/${this.habitId}/history`)
        .subscribe(data => {
          this.updates = data;
        });
    }
  }
}

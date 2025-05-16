import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // o tu IP pública

  constructor(private http: HttpClient) {}

  createUser(userData: {
    uid: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }) {
    return this.http.post(this.apiUrl, userData).toPromise();
  }
}

import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { sendPasswordResetEmail } from '@angular/fire/auth';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private auth: Auth,
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Login en Firebase + obtener userId del backend
   */
  login(email: string, password: string): Observable<number> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(res => {
        const email = res.user?.email;
        if (!email) throw new Error('No se encontró el email');
        return this.http.get<any>(`${this.apiUrl}/users/by-email?email=${email}`);
      }),
      tap(user => {
        localStorage.setItem('userId', user.userId.toString());
      }),
      switchMap(user => of(user.userId))
    );
  }

  /**
   * Registro en Firebase + creación en backend
   */
  register(email: string, password: string, nombre: string): Observable<number> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(() => {
        const newUser = { email, nombre };
        return this.http.post<any>(`${this.apiUrl}/users/register`, newUser);
      }),
      tap(user => {
        localStorage.setItem('userId', user.userId.toString());
      }),
      switchMap(user => of(user.userId))
    );
  }

  /**
   * Obtener el userId del almacenamiento local
   */
  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id) : null;
  }

  /**
   * Verificar si el usuario está logueado
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    signOut(this.auth).then(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  resetPassword(email: string): void {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        alert('Correo de recuperación enviado.');
      })
      .catch(error => {
        console.error('Error enviando correo:', error);
        alert('No se pudo enviar el correo de recuperación.');
      });
  }
}

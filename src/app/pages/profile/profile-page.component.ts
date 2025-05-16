import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  userEmail = '';
  uid = '';
  userData: any = null;

  editing = {
    firstName: false,
    lastName: false,
    phone: false
  };

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  async ngOnInit() {
    const user = await this.auth.currentUser;
    if (user) {
      this.userEmail = user.email || '';
      this.uid = user.uid;

      const ref = doc(this.firestore, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        this.userData = snap.data();
      }
    }
  }

  enableEdit(field: 'firstName' | 'lastName' | 'phone') {
    this.editing[field] = true;
  }

  async updateField(field: 'firstName' | 'lastName' | 'phone') {
    if (!this.uid || !this.userData) return;
    const ref = doc(this.firestore, 'users', this.uid);

    try {
      await updateDoc(ref, { [field]: this.userData[field] });
      this.editing[field] = false;
      alert(`Campo "${field}" actualizado.`);
    } catch (error) {
      console.error(error);
      alert('Error al actualizar.');
    }
  }

  async resetPassword() {
    if (this.userEmail) {
      await sendPasswordResetEmail(this.auth, this.userEmail);
      alert('Correo de recuperación enviado.');
    }
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}

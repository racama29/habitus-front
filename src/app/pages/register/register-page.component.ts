import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  firstName = '';
  lastName = '';
  phone = '';
  email = '';
  password = '';
  error = '';
  

  constructor(private auth: AuthService, private router: Router, private userDataService: UserDataService) {}

  async submit() {
    try {
      const cred = await this.auth.register(this.email, this.password);
      const uid = cred.user.uid;
  
      console.log('Guardando usuario con UID:', uid);
      console.log('Datos:', {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        email: this.email
      });
  
      await this.userDataService.saveUser(uid, {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        email: this.email
      });
  
      this.router.navigate(['/login']);

    } catch (err: any) {
      console.error('Error al registrar o guardar:', err);
      this.error = err.message;
    }
  }
  
  
}

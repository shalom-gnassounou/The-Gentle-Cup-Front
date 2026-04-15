import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../commun/auth-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [FormsModule]
})
export class RegisterComponent {
   name: string = ''; 
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        // Rediriger vers le login
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erreur inscription', error);
        this.errorMessage = error.error.message || 'Erreur lors de l\'inscription';
      }
    });
  }
}

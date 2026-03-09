import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../commun/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule]

})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        // Rediriger vers la page d'accueil ou liste des drinks
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erreur connexion', error);
        this.errorMessage = error.error.message || 'Email ou mot de passe incorrect';
      }
    });
  }
}

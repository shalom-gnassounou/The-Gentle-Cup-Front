import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; 
  constructor(private http: HttpClient) { }

  // Inscription
register(name: string, email: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, { name, email, password });
}

  // Connexion
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response: any) => {
          // Stocker le token dans le localStorage
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('token');
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken(); // Renvoie true si token existe
  }
}

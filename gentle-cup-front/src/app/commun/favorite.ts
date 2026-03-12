import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3000/api/favorites';

  constructor(private http: HttpClient) {}

  // Ajouter un favori
  addFavorite(drinkId: number): Observable<any> {
    return this.http.post(this.apiUrl, { drinkId });
  }

  // Récupérer les favoris de l'utilisateur
  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Supprimer un favori
  removeFavorite(drinkId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${drinkId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from './interface/Drinks.interface';

@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  private apiUrl = 'http://localhost:3000/drinks'
  constructor(private http: HttpClient) {}
//  Get a list of drinks
  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.apiUrl);
  }
// Get drinks by category
  getDrinksByCategory(categoryName: string): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.apiUrl}?category=${categoryName}`);
  }
// Get a single drink by ID
  getDrinkById(id: number): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${id}`);
  }
//Get drinks by subcategory
  getDrinksBySubcategory(category: string, subcategory: string): Observable<Drink[]> {
  return this.http.get<Drink[]>(
    `${this.apiUrl}?category=${category}&subcategory=${subcategory}`
  );
}
  
}

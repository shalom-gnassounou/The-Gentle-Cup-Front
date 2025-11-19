import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from './interface/Drinks.interface';

@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  private apiUrl = 'http://localhost:3000/drinks'
  constructor(private http: HttpClient) {}
//  Get a list of drinks
  getDrinks(category?: string, subcat?: string): Observable<Drink[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (subcat)   params = params.set('subcat', subcat);

    // Make HTTP GET request with query parameters
    return this.http.get<Drink[]>(this.apiUrl, { params: params });
  }


// Get drinks by subcategory
getDrinksBySubcategory(subcat: string): Observable<Drink[]> {
  const params = new HttpParams().set('subcat', subcat);
  return this.http.get<Drink[]>(this.apiUrl, { params });
}
// Get drinks by category
  getDrinksByCategory(categoryName: string): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.apiUrl}?category=${categoryName}`);
  }
// Get a single drink by ID
  getDrinkById(id: number): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${id}`);
  }

  
}

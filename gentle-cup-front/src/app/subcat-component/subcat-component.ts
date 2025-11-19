import { Component } from '@angular/core';
import { ActivatedRoute, Params,RouterLink } from '@angular/router';
import { DrinksService } from '../commun/drinks-service';
import { Drink } from '../commun/interface/Drinks.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subcat-component',
  imports: [CommonModule,RouterLink],
  templateUrl: './subcat-component.html',
  styleUrls: ['./subcat-component.css'],
})
export class SubcatComponent {
  drinks: Drink[] = [];
  isLoading = false;
  errorMessage = '';
  currentSubcat?: string;
  constructor(private drinksService: DrinksService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const subcat = params['subcat'];
      this.currentSubcat = subcat;
      this.loadDrinks(subcat);
    });
  }
  loadDrinks(subcat?: string) {
    if (!subcat) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.drinksService.getDrinksBySubcategory(subcat).subscribe({
      next: (data: Drink[]) => {
        this.drinks = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur serveur:', err);
        this.errorMessage = 'Erreur lors du chargement des boissons.';
        this.isLoading = false;
      } 
    });
  }

}

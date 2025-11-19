import { Component } from '@angular/core';
import{ Drink } from '../commun/interface/Drinks.interface';
import { DrinksService } from '../commun/drinks-service';
import { ActivatedRoute,Params, RouterLink } from '@angular/router'; 
import { Subscription } from 'rxjs'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-drinks-list-component',
  imports: [RouterLink,CommonModule],
  templateUrl: './drinks-list-component.html',
  styleUrl: './drinks-list-component.css',
})
export class DrinksListComponent {
  drinks: Drink[] = []; 
  isLoading = false; // Indicate loading state
  errorMessage = '';
  currentCategory?: string;
  private sub: Subscription | null = null; // Subscription for route params
 constructor(private drinksService: DrinksService,private route: ActivatedRoute) {}
  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params: Params) => { // Récupère les paramètres de la route
      const category = params['category']; // Extrait la catégorie des paramètres
      this.currentCategory = category;// Met à jour la catégorie actuelle
      this.loadDrinks(category);// Charge les boissons en fonction de la catégorie
    });
  }
    loadDrinks(category?: string) {
    this.isLoading = true;
    this.errorMessage = '';

    const obs = category // Si une catégorie est spécifiée, récupère les boissons par catégorie
      ? this.drinksService.getDrinksByCategory(category)
      : this.drinksService.getDrinks();

    obs.subscribe({ // Souscrit à l'observable pour obtenir les données
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
  ngOnDestroy() { // Nettoie la souscription lors de la destruction du composant
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

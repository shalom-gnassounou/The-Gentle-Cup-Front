import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrinksService } from '../commun/drinks-service';
import { FavoritesService } from '../commun/favorite';
import { Drink } from '../commun/interface/Drinks.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-drinks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-drinks-component.html',
  styleUrls: ['./my-drinks-component.css']
})
export class MyDrinksComponent implements OnInit {
  myDrinks: Drink[] = [];
  favoriteDrinks: Drink[] = [];
  errorMessage = '';
  successMessage = '';
   activeTab: 'my-recipes' | 'favorites' = 'my-recipes';

  constructor(
    private drinksService: DrinksService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMyDrinks();
    this.loadFavoriteDrinks();
  }

  loadMyDrinks() {
    this.drinksService.getMyDrinks().subscribe({
      next: (data) => {
        this.myDrinks = data;
      },
      error: (error) => {
        console.error('Erreur chargement recettes', error);
        this.errorMessage = 'Impossible de charger vos recettes';
      }
    });
  }
    loadFavoriteDrinks() {
    this.favoritesService.getFavorites().subscribe({
      next: (favorites) => {
        if (favorites.length === 0) {
          this.favoriteDrinks = [];
          return;
        }

        // Récupérer les détails de chaque drink favori
        const drinkRequests = favorites.map(fav => 
          this.drinksService.getDrinkById(fav.drinkId)
        );

        forkJoin(drinkRequests).subscribe({
          next: (drinks) => {
            this.favoriteDrinks = drinks;
          },
          error: (error) => {
            console.error('Erreur chargement détails favoris', error);
          }
        });
      },
      error: (error) => {
        console.error('Erreur chargement favoris', error);
      }
    });
  }

  deleteDrink(id: number, name: string) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      this.drinksService.deleteDrink(id).subscribe({
        next: () => {
          this.successMessage = 'Recette supprimée avec succès !';
          // Recharger la liste
          this.loadMyDrinks();
          // Masquer le message après 3 secondes
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          console.error('Erreur suppression', error);
          this.errorMessage = error.error.message || 'Erreur lors de la suppression';
        }
      });
    }
  }
    removeFavorite(drinkId: number, drinkName: string) {
    if (confirm(`Retirer "${drinkName}" de vos favoris ?`)) {
      this.favoritesService.removeFavorite(drinkId).subscribe({
        next: () => {
          this.successMessage = 'Favori supprimé';
          this.loadFavoriteDrinks();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          console.error('Erreur suppression favori', error);
          this.errorMessage = 'Erreur lors de la suppression';
        }
      });
    }
  }
    switchTab(tab: 'my-recipes' | 'favorites') {
    this.activeTab = tab;
  }
}

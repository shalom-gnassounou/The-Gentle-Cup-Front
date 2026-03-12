import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { Drink } from '../commun/interface/Drinks.interface';
import { DrinksService } from '../commun/drinks-service';
import { FavoritesService } from '../commun/favorite';
import { AuthService } from '../commun/auth-service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router'; 
import { Subscription } from 'rxjs'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drinks-list-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './drinks-list-component.html',
  styleUrl: './drinks-list-component.css',
})
export class DrinksListComponent implements OnInit, OnDestroy { 
  drinks: Drink[] = []; 
  favoriteDrinkIds: number[] = []; 
  isLoading = false;
  errorMessage = '';
  currentCategory?: string;
  private sub: Subscription | null = null;

  constructor(
    private drinksService: DrinksService,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
    public authService: AuthService 
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params: Params) => {
      const category = params['category'];
      const subcat = params['subcat']; 
      this.currentCategory = category;
      this.loadDrinks(category, subcat);
    });

    
    if (this.authService.isLoggedIn()) {
      this.loadFavorites();
    }
  }

  loadDrinks(category?: string, subcat?: string) {
    this.isLoading = true;
    this.errorMessage = '';

    const obs = this.drinksService.getDrinks(category, subcat);

    obs.subscribe({
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

  
  loadFavorites() {
    this.favoritesService.getFavorites().subscribe({
      next: (favorites) => {
        // Extraire uniquement les IDs des drinks favoris
        this.favoriteDrinkIds = favorites.map(fav => fav.drinkId);
      },
      error: (error) => {
        console.error('Erreur chargement favoris', error);
      }
    });
  }

  
  isFavorite(drinkId: number): boolean {
    return this.favoriteDrinkIds.includes(drinkId);
  }

  
  toggleFavorite(drinkId: number, event: Event) {
    event.stopPropagation(); // Empêche la propagation du clic

    if (this.isFavorite(drinkId)) {
      // Retirer des favoris
      this.favoritesService.removeFavorite(drinkId).subscribe({
        next: () => {
          this.favoriteDrinkIds = this.favoriteDrinkIds.filter(id => id !== drinkId);
        },
        error: (error) => {
          console.error('Erreur suppression favori', error);
        }
      });
    } else {
      // Ajouter aux favoris
      this.favoritesService.addFavorite(drinkId).subscribe({
        next: () => {
          this.favoriteDrinkIds.push(drinkId);
        },
        error: (error) => {
          console.error('Erreur ajout favori', error);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

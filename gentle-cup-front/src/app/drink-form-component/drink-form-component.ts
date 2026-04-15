import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Drink } from '../commun/interface/Drinks.interface';
import { DrinkForm } from '../commun/interface/Drinks-form.interface';
import { DrinksService } from '../commun/drinks-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-drink-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './drink-form-component.html',
  styleUrls: ['./drink-form-component.css']
})
export class DrinkFormComponent implements OnInit {
  // Données du formulaire
  drink: DrinkForm = {
    name: '',
    description: '',
    image_url: '',
    difficulty: 'easy',
    ingredients: '',
    recipe: '',
    category_id: 1,
    subcat: ''
  };

  isEditMode = false; // Pour savoir si on est en mode création ou modification
  drinkId: number | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(
    private drinksService: DrinksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Vérifier si on a un ID dans l'URL (mode édition)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.isEditMode = true;
      this.drinkId = +id; // Convertir en number
      this.loadDrink(this.drinkId);
    }
  }

  // Charger les données de la recette (pour le mode édition)
  loadDrink(id: number) {
    this.drinksService.getDrinkById(id).subscribe({
      next: (data: Drink) => {
        this.drink = {
          name: data.name,
          description: data.description || '',
          image_url: data.image_url || '',
          difficulty: data.difficulty,
          ingredients: Array.isArray(data.ingredients) 
            ? data.ingredients.join('\n') 
            : data.ingredients || '',
          recipe: Array.isArray(data.recipe) 
            ? data.recipe.join('\n') 
            : data.recipe || '',
          category_id: data.category_id,
          subcat: data.subcat || ''
        };
      },
      error: (error) => {
        console.error('Erreur chargement recette', error);
        this.errorMessage = 'Impossible de charger la recette';
      }
    });
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.isEditMode && this.drinkId) {
      // Mode UPDATE
      this.drinksService.updateDrink(this.drinkId, this.drink).subscribe({
        next: (response) => {
          console.log('Recette modifiée', response);
          this.successMessage = 'Recette modifiée avec succès !';
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        error: (error) => {
          console.error('Erreur modification', error);
          this.errorMessage = error.error.message || 'Erreur lors de la modification';
        }
      });
    } else {
      // Mode CREATE
      this.drinksService.createDrink(this.drink).subscribe({
        next: (response) => {
          console.log('Recette créée', response);
          this.successMessage = 'Recette créée avec succès !';
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        error: (error) => {
          console.error('Erreur création', error);
          this.errorMessage = error.error.message || 'Erreur lors de la création';
        }
      });
    }
  }
}

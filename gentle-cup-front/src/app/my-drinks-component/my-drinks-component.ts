import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrinksService } from '../commun/drinks-service';
import { Drink } from '../commun/interface/Drinks.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-drinks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-drinks-component.html',
  styleUrls: ['./my-drinks-component.css']
})
export class MyDrinksComponent implements OnInit {
  myDrinks: Drink[] = [];
  errorMessage = '';
  successMessage = '';

  constructor(
    private drinksService: DrinksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMyDrinks();
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
}

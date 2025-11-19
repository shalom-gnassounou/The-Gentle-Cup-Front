import { Component } from '@angular/core';
import { Drink } from '../commun/interface/Drinks.interface';
import { Router,RouterLink } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DrinksService } from '../commun/drinks-service';


@Component({
  selector: 'app-drink-detail-component',
  imports: [RouterLink],
  templateUrl: './drink-detail-component.html',
  styleUrl: './drink-detail-component.css',
})
export class DrinkDetailComponent {
constructor( private drinksService: DrinksService,private route: ActivatedRoute, private router: Router ) {}
drink: Drink | null = null;
isLoading = false
errorMessage = '';

  ngOnInit():void{
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      if(isNaN(id) || id <= 0) {
        this.drink = null;
        return;
      }
      this.fetchdrink(id);
    })
  
  }
   private fetchdrink(id: number) {
    this.drinksService.getDrinkById(id).subscribe({
      
      next: (p) => {
        this.drink = p;
         if (typeof p.ingredients === 'string') {
        p.ingredients = p.ingredients.split(',').map(i => i.trim());
      }
      if (typeof p.recipe === 'string') {
        p.recipe = p.recipe.split('.').map(r => r.trim()).filter(r => r.length > 0); 
      }
      },
      error: () => {
        console.log("Impossible de chargeer l'article")
      }
    })
  }
}

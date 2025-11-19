import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { DrinksListComponent } from './drinks-list-component/drinks-list-component';
import { DrinkDetailComponent } from './drink-detail-component/drink-detail-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },      
  { path: 'home', component: HomeComponent },
  { path:'drinks',component: DrinksListComponent},
  { path: 'drinks/:id', component: DrinkDetailComponent },
];

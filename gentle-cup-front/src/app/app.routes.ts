import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { DrinksListComponent } from './drinks-list-component/drinks-list-component';
import { DrinkDetailComponent } from './drink-detail-component/drink-detail-component';
import { SubcatComponent } from './subcat-component/subcat-component';
import { LoginComponent } from './login-compenent/login';
import { RegisterComponent } from './register-component/register';

export const routes: Routes = [
  { path: '', component: HomeComponent },      
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'drinks',component: DrinksListComponent},
  { path: 'drinks/:id', component: DrinkDetailComponent },
  {path: 'subcat',component:SubcatComponent},
  {path: '**', redirectTo: 'home' },
];

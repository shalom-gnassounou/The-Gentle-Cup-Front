export interface DrinkForm {
  name: string;
  description: string;
  image_url: string;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string;
  recipe: string;
  category_id: number;
  subcat: string;
}
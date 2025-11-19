export interface Drink {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string | string[]|null;
  recipe: string |string[]| null;
  category_id: number;
}
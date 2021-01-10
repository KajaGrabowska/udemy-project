import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];
    
    getIngredients() {
        return this.ingredients.slice(); //returns a copy of the "ingredients" array
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);  //... - separates ingredients in the array into separate objects
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
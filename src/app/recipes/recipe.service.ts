import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Tasty Schnitzel', 
    //         'A super tasty Schnitzel - just awesome!',
    //         'https://upload.wikimedia.org/wikipedia/commons/9/90/2015_0723_Wiener_Schnitzel_vom_Schwein_Gaislachalm_S%C3%B6lden.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]),
    //     new Recipe(
    //         'Big Fat Burger',
    //         'What else you need to say?',
    //         'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/5/5/0/FNM_060115-Fatbuger-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1431449537270.jpeg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Tomato', 1),
    //             new Ingredient('Cheese', 1)
    //         ])
    //   ];
    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes; 
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();  //slice with no arguments returns a copy of the array
    }  

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients); 
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
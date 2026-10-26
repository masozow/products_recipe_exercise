import { ProductModule } from "./features/product/ProductModule.js";
import { apiRecipeRespository } from "./features/recipe/infrastructure/ApiRecipeRepository.js";
import { HttpClient } from "./shared/infrastructure/HttpClient.js";
import { recipeService } from "./features/recipe/application/RecipeService.js";
import { recipeUI } from "./features/recipe/ui/RecipeController.js";
document.addEventListener('DOMContentLoaded', () => {
    const error_prefix = '[Main error] ';
    try {
        //#region Product
        //DOM elements
        const productsSearch = document.getElementById('products-search');
        const productsResults = document.getElementById('products-result');
        //Logic
        ProductModule({ productsSearch, productsResults });
        //#endregion

        //#region Recipe
        //DOM elements
        const recipesSearch = document.getElementById('recipes-search');
        const recipesResults = document.getElementById('recipes-result');

        //Logic
        const recipeRepo = apiRecipeRespository(HttpClient);
        const recipe_service = recipeService({ recipeRepo });
        recipeUI({ dom: { recipesSearch, recipesResults }, recipeService: recipe_service });
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
});
// import('./shared/test/index.js');
import { ProductModule } from "./features/product/ProductModule.js";
import { apiRecipeRespository } from "./features/recipe/infrastructure/ApiRecipeRepository.js";
import { HttpClient } from "./shared/infrastructure/HttpClient.js";
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
        //#endregion
        //#region SearchLogic
        recipesSearch.addEventListener('input', async (e) => {
            const { getRecipes } = apiRecipeRespository(HttpClient);
            const recipes = await getRecipes(e.target.value);
            return (recipes);
        })
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
});
import('./shared/test/index.js');
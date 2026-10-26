import { ProductModule } from "./features/product/ProductModule.js";
import { RecipeModule } from "./features/recipe/RecipeModule.js";
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
        RecipeModule({ recipesSearch, recipesResults });
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
});
// import('./shared/test/index.js');
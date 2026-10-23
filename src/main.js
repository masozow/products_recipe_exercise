import { ProductModule } from "./features/product/ProductModule.js";
import { apiRecipeRespository } from "./features/recipe/infrastructure/ApiRecipeRepository.js";
import { HttpClient } from "./shared/infrastructure/HttpClient.js";
import { recipeService } from "./features/recipe/application/RecipeService.js";
import { RecipeCard } from "./features/recipe/ui/components/RecipeCard.js";
import { debounce } from './shared/utils/debounce.js';

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
        //#region UI logic
        const render = (recipes, query) => {
            if (recipes.length === 0) return query ? 'No data found.' : '';
            return `
            <div class='grid'>
                ${recipes.map((recipe) => RecipeCard(recipe)).join('')}
            </div>
            `;
        }
        //#endregion
        //#region SearchLogic
        const apiRepo = apiRecipeRespository(HttpClient);
        const { search } = recipeService({ recipeRepo: apiRepo });
        const handleSearch = async (query) => {
            const recipes = await search(query);
            recipesResults.innerHTML = render(recipes, query);
        }
        const debouncedSearch = debounce(handleSearch, 500);
        recipesSearch.addEventListener('input', async (e) =>
            debouncedSearch(e.target.value)
        )
        //#endregion
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
});
// import('./shared/test/index.js');
import { ProductModule } from "./features/product/ProductModule.js";
import { apiRecipeRespository } from "./features/recipe/infrastructure/ApiRecipeRepository.js";
import { HttpClient } from "./shared/infrastructure/HttpClient.js";
import { recipeService } from "./features/recipe/application/RecipeService.js";
import { RecipeCard } from "./features/recipe/ui/components/RecipeCard.js"
import { CardsGrid } from "./shared/ui/components/CardsGrid.js";
import { debounce } from "./shared/utils/debounce.js";
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
        const render = (state, query) => {
            if (state.recipes.length === 0) return query ? 'No data found.' : '';
            recipesResults.innerHTML = CardsGrid({ data: state.recipes, CardComponent: RecipeCard })
        }
        //#region SearchLogic
        const { search, toggleFavorite } = recipe_service;
        const handleSearch = async (query) => {
            const state = await search(query);
            render(state, query);
        }
        const debouncedSearch = debounce(async (query) => await handleSearch(query), 500);
        recipesSearch.addEventListener('input', (e) =>
            debouncedSearch(e.target.value)

        )
        //#endregion
        //#region favorite recipe logic
        const actions = {
            'toggle-recipe-favorite': (id) => toggleFavorite(Number(id))
        }
        recipesResults.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const action = actions[btn.dataset.action];
            if (!action) return;
            const card = btn.closest('.card');
            if (!card) return;
            const recipeId = card.dataset.id;
            const actionResult = action(recipeId);
            render(actionResult, recipesSearch.value);
        });
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
});
// import('./shared/test/index.js');
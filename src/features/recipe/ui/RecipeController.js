import { debounce } from "../../../shared/utils/debounce.js";
import { recipewView } from "./RecipeView.js";
export const recipeUI = ({ dom, recipeService }) => {
    const error_prefix = '[UI Error] RecipeController. ';
    try {
        const { recipesSearch, recipesResults } = dom;
        if (!recipesSearch) throw new Error(error_prefix + 'recipesSearch is required.');
        if (!recipesResults) throw new Error(error_prefix + 'recipesResults is required.');
        if (!recipeService) throw new Error(error_prefix + 'recipeService is required.');
        //Prepping needed functions
        const {
            updateCardFavoriteStatus,
            renderError,
            renderLoading,
            renderGrid
        } = recipewView({ results: recipesResults });
        const {
            search,
            toggleFavorite,
            onErrorChange,
            onRecipesChange,
            onLoadingChange,
        } = recipeService;
        //#region ErrorStatesLogic
        onErrorChange((errorState) => {
            renderError(errorState);
        });
        onLoadingChange((loadingState) => {
            renderLoading(loadingState);
        })
        //#endregion
        //#region SearchLogic
        onRecipesChange((state) => renderGrid(state, recipesSearch.value));
        const debouncedSearch = debounce(async (query) => await search(query), 500);
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
            const card = btn.closest('[data-component="recipe-card"]');
            if (!card) return;
            const recipeId = card.dataset.id;
            const isFavorite = action(recipeId);
            updateCardFavoriteStatus({ btn, card, isFavorite });

        });
        //updateCardFavoriteStatus({ toggleFavorite });
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
}
import { debounce } from "../../../shared/utils/debounce.js";
import { renderGrid } from "./RecipeView.js";
import { updateCardFavoriteStatus } from "./RecipeView.js";
export const recipeUI = ({ dom, recipeService }) => {
    const error_prefix = '[UI Error] RecipeController. ';
    try {
        const { recipesSearch, recipesResults } = dom;
        if (!recipesSearch) throw new Error(error_prefix + 'recipesSearch is required.');
        if (!recipesResults) throw new Error(error_prefix + 'recipesResults is required.');
        if (!recipeService) throw new Error(error_prefix + 'recipeService is required.');
        //#region SearchLogic
        const { search, toggleFavorite, subscribe } = recipeService;
        subscribe((state) => recipesResults.innerHTML = renderGrid(state, recipesSearch.value));
        const debouncedSearch = debounce(async (query) => await search(query), 500);
        recipesSearch.addEventListener('input', (e) =>
            debouncedSearch(e.target.value)
        )
        //#endregion
        //#region favorite recipe logic
        updateCardFavoriteStatus({ results: recipesResults, toggleFavorite });
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
}
import { CardsGrid } from "../../../shared/ui/components/CardsGrid.js";
import { RecipeCard } from "./components/RecipeCard.js";
import { debounce } from "../../../shared/utils/debounce.js";

const render = (state, query) => {
    if (state.recipes.length === 0) return query ? 'No data found.' : '';
    return CardsGrid({ data: state.recipes, CardComponent: RecipeCard })
}

export const recipeUI = ({ dom, recipeService }) => {
    const error_prefix = '[UI Error] RecipeController. ';
    try {
        const { recipesSearch, recipesResults } = dom;
        if (!recipesSearch) throw new Error(error_prefix + 'recipesSearch is required.');
        if (!recipesResults) throw new Error(error_prefix + 'recipesResults is required.');
        if (!recipeService) throw new Error(error_prefix + 'recipeService is required.');
        //#region SearchLogic
        const { search, toggleFavorite, subscribe } = recipeService;
        subscribe((state) => recipesResults.innerHTML = render(state, recipesSearch.value));
        const debouncedSearch = debounce(async (query) => await search(query), 500);
        recipesSearch.addEventListener('input', async (e) =>
            debouncedSearch(e.target.value)
        )
        //#endregion
        //#region favorite recipe logic
        const actions = {
            'toggle-recipe-favorite': (id) => toggleFavorite(Number(id))
        }
        recipesResults.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            console.dir(btn.dataset);
            if (!btn) return;
            const action = actions[btn.dataset.action];
            if (!action) return;
            const card = btn.closest('[data-component="recipe-card"]');
            if (!card) return;
            const recipeId = card.dataset.id;
            action(recipeId);
        });
    } catch (error) {
        console.error(error_prefix, error);
    }
    //#endregion
}
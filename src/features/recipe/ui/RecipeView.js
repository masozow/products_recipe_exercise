import { CardsGrid } from "../../../shared/ui/components/CardsGrid.js";
import { RecipeCard } from "./components/RecipeCard.js";

export const renderGrid = (state, query) => {
    if (state.recipes.length === 0) return query ? 'No data found.' : '';
    return CardsGrid({ data: state.recipes, CardComponent: RecipeCard })
}

export const updateCardFavoriteStatus = ({ results, toggleFavorite }) => {
    const error_prefix = '[UI Error] RecipeView. ';
    if (!results)
        throw new Error(error_prefix + 'results is required.');
    if (typeof toggleFavorite !== 'function')
        throw new Error(error_prefix + 'toggleFavorite must be a function.');
    const actions = {
        'toggle-recipe-favorite': (id) => toggleFavorite(Number(id))
    }
    results.addEventListener('click', (e) => {
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
}
import { debounce } from "../../../shared/utils/debounce.js";
import { recipewView } from "./RecipeView.js";
import { RenderStates } from "../../../shared/ui/components/RenderStates.js";
import { validStates } from "../../../shared/dictionaries/validStates.js";
export const recipeUI = ({ dom, recipeService }) => {
    const error_prefix = '[UI Error] RecipeController. ';
    const { ERROR, IDLE, SUCCESS, EMPTY, LOADING } = validStates;
    const moduleName = 'recipes';
    try {
        const { recipesSearch, recipesResults } = dom;
        if (!recipesSearch) throw new Error(error_prefix + 'recipesSearch is required.');
        if (!recipesResults) throw new Error(error_prefix + 'recipesResults is required.');
        if (!recipeService) throw new Error(error_prefix + 'recipeService is required.');
        //Prepping needed functions
        const {
            updateCardFavoriteStatus,
            renderGrid
        } = recipewView({ results: recipesResults });
        const {
            search,
            toggleFavorite,
            onStateChange,
        } = recipeService;
        const renderStates = RenderStates(recipesResults);
        //#region ErrorStatesLogic
        onStateChange((state) => {
            switch (state.state) {
                case IDLE:
                    renderStates.renderIdle(moduleName); break;
                case ERROR:
                    renderStates.renderError(); break;
                case LOADING:
                    renderStates.renderLoading(moduleName); break;
                case EMPTY:
                    renderStates.renderEmpty(); break;
                case SUCCESS:
                    renderGrid(state.recipes, recipesSearch.value); break;
                default:
                    renderStates.renderIdle(moduleName); break;
            }
        });
        //#endregion
        //#region SearchLogin
        const debouncedSearch = debounce(async (query) => await search(query), 500);
        recipesSearch.addEventListener('input', (e) =>
            debouncedSearch(e.target.value)
        )
        const currentQuery = recipesSearch.value.trim();
        if (currentQuery !== '')
            search(currentQuery)
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
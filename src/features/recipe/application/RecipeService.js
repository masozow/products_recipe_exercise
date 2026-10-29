import { createSignal } from "../../../shared/utils/createSignal.js";
import { validStates } from "../../../shared/dictionaries/validStates.js";
export const recipeService = ({ recipeRepo, favoriteRepo }) => {
    const error_prefix = '[Application error] RecipeService. ';
    if (!recipeRepo) throw new Error(error_prefix + ' Recipe repository is required.');
    if (!favoriteRepo) throw new Error(error_prefix + ' Favorites repository is required.');
    const { getFavorites, setFavorites } = favoriteRepo;
    const { ERROR, IDLE, LOADING, EMPTY, SUCCESS } = validStates;
    let favorites = getFavorites();
    const initialState = {
        recipes: [],
        state: IDLE
    }
    const state = createSignal(initialState);
    let reqId = 0;
    let lastQuery = '';
    const searchViewState = (data) => {
        if (!Array.isArray(data)) throw new Error(error_prefix + ' Data Array is needed to make the searchViewState.');
        const favoritesSet = new Set(favorites);
        return data.map((recipe) => ({ ...recipe, isFavorite: favoritesSet.has(Number(recipe.id)) }))
    }
    return {
        onStateChange: state.subscribe,
        search: async (query) => {
            if (typeof query !== 'string') throw new Error(error_prefix + ' Query must be a string.');
            const normalizedQuery = query.trim();
            if (normalizedQuery === '') {
                state.set(initialState);
                lastQuery = '';
                ++reqId;
                return;
            }
            if (lastQuery === normalizedQuery) return;
            lastQuery = normalizedQuery;
            state.set({ recipes: [], state: LOADING })
            const currentReqId = ++reqId;
            try {
                const data = await recipeRepo.getRecipes(query);
                if (currentReqId !== reqId) return;
                if (data.length === 0 && normalizedQuery) {
                    state.set({ recipes: [], state: EMPTY });
                    return;
                }
                const viewState = searchViewState(data);
                state.set({ state: SUCCESS, recipes: viewState })
            } catch (error) {
                if (currentReqId !== reqId) return;
                console.error(error_prefix, error);
                state.set({ recipes: [], state: ERROR })
            }
        },
        toggleFavorite(recipeId) {
            if (!recipeId) throw new Error(error_prefix + ' The recipe Id is required');
            const id = Number(recipeId);
            const isCurrentlyFavorite = favorites.includes(id);
            if (isCurrentlyFavorite) {
                favorites = favorites.filter((id) => id !== recipeId);
            } else {
                favorites = [...favorites, id];
            }
            setFavorites(favorites);
            return !isCurrentlyFavorite;
        }
    }
}
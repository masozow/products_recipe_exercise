import { createSignal } from "../../../shared/utils/createSignal.js";
export const recipeService = ({ recipeRepo, favoriteRepo }) => {
    const error_prefix = '[Application error] RecipeService. ';
    if (!recipeRepo) throw new Error(error_prefix + ' Recipe repository is required.');
    if (!favoriteRepo) throw new Error(error_prefix + ' Favorites repository is required.');
    const { getFavorites, setFavorites } = favoriteRepo;
    let favorites = getFavorites();
    const initialState = {
        recipes: [],
        isLoading: false,
        isError: false,
        isEmpty: false
    }
    const recipes = createSignal(initialState.recipes);
    const isLoading = createSignal(initialState.isLoading);
    const isError = createSignal(initialState.isError);
    const isEmpty = createSignal(initialState.isEmpty);
    let reqId = 0;
    let lastQuery = '';
    const resetSignals = () => {
        recipes.set(initialState.recipes),
            isLoading.set(initialState.isLoading),
            isError.set(initialState.isError),
            isEmpty.set(initialState.isEmpty);
    }
    const searchViewState = (data) => {
        if (!Array.isArray(data)) throw new Error(error_prefix, ' Data Array is needed to make the searchViewState.');
        const favoritesSet = new Set(favorites);
        return data.map((recipe) => ({ ...recipe, isFavorite: favoritesSet.has(Number(recipe.id)) }))
    }
    return {
        onRecipesChange: recipes.subscribe,
        onLoadingChange: isLoading.subscribe,
        onErrorChange: isError.subscribe,
        search: async (query) => {
            if (typeof query !== 'string') throw new Error(error_prefix + ' Query must be a string.');
            const normalizedQuery = query.trim();
            if (lastQuery === normalizedQuery) return;
            lastQuery = normalizedQuery;
            isError.set(false);
            isEmpty.set(false);
            isLoading.set(true)
            const currentReqId = ++reqId;
            try {
                const data = await recipeRepo.getRecipes(query);
                if (currentReqId !== reqId) return;
                if (data.length === 0 && normalizedQuery) {
                    isEmpty.set(true);
                }
                const viewState = searchViewState(data);
                isLoading.set(false);
                recipes.set(viewState);
            } catch (error) {
                if (currentReqId !== reqId) return;
                console.error(error_prefix, error);
                isLoading.set(false);
                isError.set(true);
            }
        },
        toggleFavorite(recipeId) {
            if (!recipeId) throw new Error(error_prefix, ' The recipe Id is required');
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
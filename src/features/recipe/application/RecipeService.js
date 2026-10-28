import { createSignal } from "../../../shared/utils/createSignal.js";
export const recipeService = ({ recipeRepo, favoriteRepo }) => {
    const error_prefix = '[Application error] RecipeService. ';
    if (!recipeRepo) throw new Error(error_prefix + ' Recipe repository is required.');
    if (!favoriteRepo) throw new Error(error_prefix + ' Favorites repository is required.');
    const { getFavorites, setFavorites } = favoriteRepo;
    let favorites = getFavorites();
    const recipes = createSignal([]);
    const isLoading = createSignal(false);
    const isError = createSignal(false);

    let reqId = 0;
    let lastQuery = '';
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
            const currentReqId = ++reqId;
            const normalizedQuery = query.trim();
            if (lastQuery === normalizedQuery) return;
            lastQuery = normalizedQuery;
            if (currentReqId !== reqId) return;
            isError.set(false);
            isLoading.set(true)
            try {
                const data = await recipeRepo.getRecipes(query);
                const viewState = searchViewState(data);
                recipes.set(viewState);
                isLoading.set(false);
            } catch (error) {
                isLoading.set(false);
                isError.set(true);
                console.error(error_prefix, error);
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
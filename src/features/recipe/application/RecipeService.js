import { localFavoriteRepository } from "../../../shared/infrastructure/LocalFavoriteRepository.js";

export const recipeService = ({ recipeRepo }) => {
    const error_prefix = '[Application error] RecipeService. ';
    if (!recipeRepo) throw new Error(error_prefix + ' Recipe repository is required.');
    const { getFavorites, setFavorites } = localFavoriteRepository({ key: 'recipes-favorites' })

    const state = {
        recipes: [],
    }
    let reqId = 0;
    let lastQuery = '';
    const listeners = new Set();
    const getViewState = () => {
        const favorites = getFavorites();
        const favoritesSet = new Set(favorites);
        return {
            recipes: state.recipes.map((recipe) => ({ ...recipe, isFavorite: favoritesSet.has(recipe.id) })),
            favorites: [...favorites]
        }
    }
    const notify = () => {
        const viewState = getViewState();
        listeners.forEach((listener) => listener(viewState));
    }
    return {
        search: async (query) => {
            const currentReqId = ++reqId;
            if (typeof query !== 'string') throw new Error(error_prefix + ' Query must be a string.');
            const normalizedQuery = query.trim();
            if (lastQuery === normalizedQuery) return;
            lastQuery = normalizedQuery;
            if (currentReqId !== reqId) return;
            state.recipes = await recipeRepo.getRecipes(query);
            notify();
        },
        toggleFavorite(recipeId) {
            if (!recipeId) throw new Error(error_prefix, ' The recipe Id is required');
            const favorites = getFavorites();
            let favs = favorites;
            if (favorites.includes(recipeId)) {
                favs = favorites.filter((id) => id !== recipeId);
            } else {
                favs.push(recipeId);
            }
            setFavorites(favs);
            notify();
        },
        subscribe: (listener_callback) => {
            if (typeof listener_callback !== 'function') throw new Error(error_prefix + 'Listener must be a function.');
            listeners.add(listener_callback);
            const viewState = getViewState();
            listener_callback(viewState);
            return () => listeners.delete(listener_callback);
        }
    }
}
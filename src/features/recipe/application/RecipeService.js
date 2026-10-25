export const recipeService = ({ recipeRepo }) => {
    const error_prefix = '[Application error] RecipeService. ';
    if (!recipeRepo) throw new Error(error_prefix + ' Recipe repository is required.');
    const state = {
        recipes: [],
        favorites: []
    }
    const listeners = new Set();

    const getViewState = () => {
        const favs = state.favorites;
        return {
            recipes: state.recipes.map((recipe) => ({ ...recipe, isFavorite: favs.includes(recipe.id) })),
            favorites: [...state.favorites]
        }
    }
    const notify = () => {
        const viewState = getViewState();
        listeners.forEach((listener) => listener(viewState));
    }
    return {
        search: async (query) => {
            if (typeof query !== 'string') throw new Error(error_prefix + ' Query must be a string.');
            state.recipes = await recipeRepo.getRecipes(query);
            notify();
        },
        toggleFavorite(recipeId) {
            if (!recipeId) throw new Error(error_prefix, ' The recipe Id is required');
            let favs = state.favorites;
            if (state.favorites.includes(recipeId)) {
                favs = state.favorites.filter((id) => id !== recipeId);
            } else {
                favs.push(recipeId);
            }
            state.favorites = favs;
            notify();
        },
        subscribe: (listener) => {
            if (typeof listener !== 'function') throw new Error(error_prefix, 'Listener must be a function.');
            listeners.add(listener);
            const viewState = getViewState();
            listener(viewState);
            return () => listeners.delete(listener);
        }
    }
}
export const recipeService = ({ recipeRepo }) => {
    const error_prefix = '[Application error] RecipeService. ';
    if (!recipeRepo) throw new Error(error_prefix + ' Recipe repository is required.');
    const state = {
        recipes: [],
        favorites: []
    }
    const getViewState = () => {
        const favoritesSet = new Set(state.favorites);
        return {
            recipes: state.recipes.map((recipe) => ({ ...recipe, isFavorite: favoritesSet.has(recipe.id) })),
            favorites: [...state.favorites]
        }
    }

    return {
        search: async (query) => {
            if (typeof query !== 'string') throw new Error(error_prefix + ' Query must be a string.');
            state.recipes = await recipeRepo.getRecipes(query);
            return getViewState();
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
            return getViewState();
        },

    }
}
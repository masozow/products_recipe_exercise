export const recipeService = ({ recipeRepo }) => {
    const error_prefix = '[Application error] RecipeService. ';
    if (!recipeRepo) throw new Error(error_prefix + ' Recipe repository is required.');
    return {
        search: async (query) => {
            if (typeof query !== 'string') throw new Error(error_prefix + ' Query must be a string.');
            const recipes = await recipeRepo.getRecipes(query);
            return recipes;
        }
    }
}
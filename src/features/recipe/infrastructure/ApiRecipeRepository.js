import { RecipesSearchURL } from "../../../shared/dictionaries/ApiURLs.js";
import { Recipe } from "../domain/Recipe.js";

export const apiRecipeRespository = (httpClient) => {
    const error_prefix = '[Infra error] Recipe. ';
    if (typeof httpClient !== 'function') throw new Error(error_prefix + ' HttpClient must be a function.');
    return {
        getRecipes: async (query) => {
            if (typeof query !== 'string') throw new Error(error_prefix + ' Query must be a string.');
            const url = RecipesSearchURL(query);
            const rawData = await httpClient({ url });
            const { recipes } = rawData;
            console.log(recipes);
            if (!recipes) throw new Error(error_prefix + " Server didn't returned a recipes object.");
            if (!Array.isArray(recipes)) throw new Error(error_prefix + ' Api returned an invalid array.');
            return recipes.map((recipe) => Recipe({ ...recipe }));
        }
    }
}
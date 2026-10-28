import { RecipesSearchURL } from "../../../shared/dictionaries/ApiURLs.js";
import { Recipe } from "../domain/Recipe.js";
import { getItems } from "../../../shared/utils/getItems.js";
export const apiRecipeRespository = (httpClient) => {
    const error_prefix = '[Infra error] Recipe. ';
    if (typeof httpClient !== 'function') throw new Error(error_prefix + ' HttpClient must be a function.');
    return {
        getRecipes: async (query) => {
            const url = RecipesSearchURL(query);
            return getItems({
                query,
                item_acces_key:
                    'recipes',
                ItemShape: Recipe,
                url,
                error_message_prefix: error_prefix,
                httpClient
            })
        }
    }
}
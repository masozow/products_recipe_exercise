
import { recipeService } from "./application/RecipeService.js";
import { recipeUI } from "./ui/RecipeController.js";
import { apiRecipeRespository } from "./infrastructure/ApiRecipeRepository.js";
import { localFavoriteRepository } from "../../shared/infrastructure/LocalFavoriteRepository.js";
import { HttpClient } from "../../shared/infrastructure/HttpClient.js";
export const RecipeModule = ({ recipesSearch, recipesResults }) => {
    const recipeRepo = apiRecipeRespository(HttpClient);
    const favoriteRepo = localFavoriteRepository({ key: 'favorites-recipes' });
    const recipe_service = recipeService({ recipeRepo, favoriteRepo });
    recipeUI({ dom: { recipesSearch, recipesResults }, recipeService: recipe_service });
}
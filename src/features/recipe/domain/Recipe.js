export const Recipe = ({ id, name, cuisine, difficulty, rating, image, prepTimeMinutes, cookTimeMinutes, isFavorite = false }) => {
    const error_prefix = '[Domain error] Recipe.';
    const requiredFields = [id, name, cuisine, difficulty, rating, image, prepTimeMinutes, cookTimeMinutes];
    if (requiredFields.some(field => field === undefined || field === null))
        throw new Error(error_prefix + ' Some required fields are missing at: ' + id);
    const recipe = {
        id,
        name,
        cuisine,
        difficulty,
        rating,
        image,
        isFavorite,
        total_time: Number(prepTimeMinutes) + Number(cookTimeMinutes)
    };
    return recipe;
}
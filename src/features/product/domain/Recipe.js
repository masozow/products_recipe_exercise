export const Recipe = ({ id, name, cuisine, difficulty, rating, image, prepTimeMinutes, cookTimeMinutes }) => {
    const error_prefix = '[Domain error] Recipe.';
    if (!Number(prepTimeMinutes) || !Number(cookTimeMinutes))
        throw new Error(error_prefix + 'PrepTimeMinutes and CookTimeMinutes must be numbers.');
    const recipe = {
        id,
        name,
        cuisine,
        difficulty,
        rating,
        image,
        total_time: prepTimeMinutes + cookTimeMinutes
    };
    return recipe;
}
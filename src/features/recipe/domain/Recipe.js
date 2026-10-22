export const Recipe = ({ id, name, cuisine, difficulty, rating, image, prepTimeMinutes, cookTimeMinutes }) => {
    const error_prefix = '[Domain error] Recipe.';
    // if (!id || !name || !cuisine || !difficulty || !rating || !image || !prepTimeMinutes || !cookTimeMinutes)
    //     throw new Error(error_prefix + ' Some required fields are missing');

    const recipe = {
        id,
        name,
        cuisine,
        difficulty,
        rating,
        image,
        total_time: Number(prepTimeMinutes) + Number(cookTimeMinutes)
    };
    console.log(recipe);
    return recipe;
}
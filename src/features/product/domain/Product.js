export const Product = ({ id, title, price, category, rating, thumbnail, brand = '', isFavorite = false }) => {
    const error_prefix = '[Domain error] Product.'
    if (!id || !title || !price || !category || !rating || !thumbnail) {
        throw new Error(error_prefix + ' Some of the required fields is missing.')
    }
    return {
        id,
        title,
        price,
        category,
        rating,
        thumbnail,
        brand,
        isFavorite,
        toggleFavorite() {
            isFavorite = !isFavorite;
        }
    }
}
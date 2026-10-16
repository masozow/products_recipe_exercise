
export function createProduct({ id, title, price, category, rating, thumbnail, brand = '' }) {
    const ERROR_PREFIX = '[Domain Error] Product.';
    if (!id || !title || !price || !category || !rating || !thumbnail) {
        throw new Error(ERROR_PREFIX + ' Required fields are missing');
    }
    return {
        id,
        title,
        price,
        category,
        rating,
        thumbnail,
        brand
    };
}
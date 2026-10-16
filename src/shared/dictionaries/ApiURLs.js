const BASE_URL = 'https://dummyjson.com';

const createSearchURL = (path) => (query) => {
    const url = new URL(`${BASE_URL}${path}`);
    if (query?.trim()) url.searchParams.set('q', query.trim());
    return url.toString();
};

export const ProductsSearchURL = createSearchURL('/products/search');
export const RecipesSearchURL = createSearchURL('/recipes/search');
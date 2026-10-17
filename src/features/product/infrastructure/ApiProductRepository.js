import { ProductsSearchURL } from "../../../shared/dictionaries/ApiURLs.js";
import { Product } from "../domain/Product.js";

export const apiProductRepository = (httpClient) => {
    const error_prefix = '[Infra error] ApiProductRepository. ';
    if (typeof httpClient !== 'function') throw new Error(error_prefix + 'httpClient must be a function.');
    const state = {
        products: [],
        favorites: []
    }
    return {
        getProducts: async (query) => {
            try {
                if (typeof query !== 'string') throw new Error(error_prefix + 'Query must be a string.');
                const url = ProductsSearchURL(query);
                const rawProducts = await httpClient({ url });
                if (!rawProducts.products) throw new Error(error_prefix + `Products object didn't returned: ${rawProducts}`)
                if (!Array.isArray(rawProducts.products)) throw new Error(error_prefix + `Endpoint returned an invalid type: ${rawProducts}`);
                state.products = rawProducts.products.map((product) => Product({ ...product }));
                return state.products;
            } catch (error) {
                console.error(error_prefix, error);
            }
        },
        toggleFavorite: (productId) => {
            if (!productId) throw new Error(error_prefix + 'Id is required');
            if (state.favorites.includes(productId)) {
                let favs = state.favorites.filter((id) => id !== productId);
                state.favorites = favs;
            } else {
                state.favorites.push(productId);
            }
            const productFound = state.products.find((product) => product.id === productId);
            if (productFound) productFound.toggleFavorite();
            return state.favorites;
        }
    }
}
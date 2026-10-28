import { createSignal } from "../../../shared/utils/createSignal.js";

export const productService = ({ productRepo, favoriteRepo }) => {
    const error_prefix = '[Application error] ProductService. ';
    if (!productRepo || !favoriteRepo) throw new Error(error_prefix + ' Repositories are required.');
    const products = createSignal([]);
    const isLoading = createSignal(false);
    const isError = createSignal(false);
    let reqId = 0;
    let lastQuery = '';
    let favorites = favoriteRepo.getFavorites();
    const searchState = (data) => {
        if (!Array.isArray(data)) throw new Error(error_prefix + ' data is required as an Array.');
        const favoritesSet = new Set(favorites);
        return data.map((product) => ({ ...product, isFavorite: favoritesSet.has(product.id) }))
    }
    return {
        onErrorChange: isError.subscribe,
        onLoadingChange: isLoading.subscribe,
        onProductChange: products.subscribe,
        search: async (query) => {
            if (typeof query !== 'string') throw new Error(error_prefix + 'Query must be a string.');
            const currentReqId = ++reqId;
            const normalizedQuery = query.trim();
            if (currentReqId !== reqId) return;
            if (lastQuery === normalizedQuery) return;
            lastQuery = normalizedQuery;
            try {
                isError.set(false);
                isLoading.set(true);
                const data = await productRepo.getProducts(query);
                const state = searchState(data);
                products.set(state);
            } catch (error) {
                isError.set(true);
                isLoading.set(false);
            }
        },
        toggleFavorite: (productId) => {
            if (!productId) throw new Error(error_prefix + 'Id is required');
            const id = Number(productId);
            let isCurrentlyFavorite = favorites.includes(id);
            if (isCurrentlyFavorite) {
                favorites = favorites.filter((productId) => productId !== id);
            } else {
                favorites = [...favorites, id];
            }
            favoriteRepo.setFavorites(favorites);
            return !isCurrentlyFavorite;
            // const productFound = products.find((product) => product.id === productId);
            // if (productFound) productFound.isFavorite = favorites.includes(productId);

        }
    }
}
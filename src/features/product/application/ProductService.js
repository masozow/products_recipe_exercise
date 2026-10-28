import { createSignal } from "../../../shared/utils/createSignal.js";

export const productService = ({ productRepo, favoriteRepo }) => {
    const error_prefix = '[Application error] ProductService. ';
    if (!productRepo || !favoriteRepo) throw new Error(error_prefix + ' Repositories are required.');
    const initialState = {
        products: [],
        isLoading: false,
        isError: false,
        isEmpty: false
    }
    const products = createSignal(initialState.products);
    const isLoading = createSignal(initialState.isLoading);
    const isError = createSignal(initialState.isError);
    const isEmpty = createSignal(initialState.isEmpty);
    let reqId = 0;
    let lastQuery = '';
    let favorites = favoriteRepo.getFavorites();
    const searchState = (data) => {
        if (!Array.isArray(data)) throw new Error(error_prefix + ' data is required as an Array.');
        const favoritesSet = new Set(favorites);
        return data.map((product) => ({ ...product, isFavorite: favoritesSet.has(product.id) }))
    }
    const resetSignals = () => {
        products.set(initialState.products);
        isLoading.set(initialState.isLoading);
        isError.set(initialState.isError);
        isEmpty.set(initialState.isEmpty);
    }
    return {
        onErrorChange: isError.subscribe,
        onLoadingChange: isLoading.subscribe,
        onProductChange: products.subscribe,
        onEmptyChange: isEmpty.subscribe,
        search: async (query) => {
            if (typeof query !== 'string') throw new Error(error_prefix + 'Query must be a string.');
            const normalizedQuery = query.trim();
            if (normalizedQuery === '') {
                resetSignals();
            }
            if (lastQuery === normalizedQuery) return;
            lastQuery = normalizedQuery;
            const currentReqId = ++reqId;
            try {
                isError.set(false);
                isLoading.set(true);
                isEmpty.set(false);
                const data = await productRepo.getProducts(query);
                if (currentReqId !== reqId) return;
                if (data.length === 0 && normalizedQuery)
                    isEmpty.set(true);
                const state = searchState(data);
                isLoading.set(false);
                products.set(state);
            } catch (error) {
                if (reqId !== currentReqId) return;
                console.error(error_prefix, error);
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
        }
    }
}
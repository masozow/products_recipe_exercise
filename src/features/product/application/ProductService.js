import { createSignal } from "../../../shared/utils/createSignal.js";
import { validStates } from "../../../shared/dictionaries/validStates.js";

export const productService = ({ productRepo, favoriteRepo }) => {
    const error_prefix = '[Application error] ProductService. ';
    if (!productRepo || !favoriteRepo) throw new Error(error_prefix + ' Repositories are required.');
    const { IDLE, ERROR, SUCCESS, LOADING, EMPTY } = validStates;
    const initialState = {
        products: [],
        state: IDLE
    }
    const state = createSignal(initialState);
    let reqId = 0;
    let lastQuery = '';
    let favorites = favoriteRepo.getFavorites();
    const displayState = (data) => {
        if (!Array.isArray(data)) throw new Error(error_prefix + ' data is required as an Array.');
        const favoritesSet = new Set(favorites);
        return data.map((product) => ({ ...product, isFavorite: favoritesSet.has(product.id) }))
    }
    return {
        onStateChange: state.subscribe,
        search: async (query) => {
            if (typeof query !== 'string') throw new Error(error_prefix + 'Query must be a string.');
            const normalizedQuery = query.trim();
            if (normalizedQuery === '') {
                state.set(initialState);
                lastQuery = '';
                return;
            }
            if (lastQuery === normalizedQuery) return;
            lastQuery = normalizedQuery;
            state.set({ products: [], state: LOADING });
            const currentReqId = ++reqId;
            try {
                const data = await productRepo.getProducts(query);
                if (currentReqId !== reqId) return;
                if (data.length === 0 && normalizedQuery) {
                    state.set({ products: [], state: EMPTY })
                    return;
                }
                const products = displayState(data);
                state.set({ products, state: SUCCESS });
            } catch (error) {
                if (reqId !== currentReqId) return;
                console.error(error_prefix, error);
                state.set({ products: [], state: ERROR });
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
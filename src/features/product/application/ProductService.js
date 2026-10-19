export const productService = ({ getProducts } = {}) => {
    const error_prefix = '[Application error] ProductService. ';
    const state = {
        products: [],
        favorites: []
    }
    const listeners = new Set();
    const notify = () => {
        console.log('State at notify: ', state);
        listeners.forEach((listener) => listener(state));
    }
    return {
        subscribe: (listener) => {
            if (typeof listener !== 'function') throw new Error(error_prefix + ' Listener must be a function');
            listeners.add(listener);
            listener(state);
            return () => listeners.delete(listener);
        },
        search: async (query) => {
            try {
                if (!getProducts) throw new Error(error_prefix + 'Get Products function is required');
                if (typeof query !== 'string') throw new Error(error_prefix + 'Query must be a string.');
                state.products = await getProducts(query);
                //#region Sync favorites to products state
                state.products.forEach((product) => {
                    if (state.favorites.includes(product.id)) product.isFavorite = true;
                })
                //#endregion
                notify();
                return state.products;
            } catch (error) {
                console.error(error_prefix, error);
                return [];
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
            if (productFound) productFound.isFavorite = state.favorites.includes(productId);
            notify();
        }
    }
}
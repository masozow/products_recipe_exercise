export const productService = ({ productRepo, favoriteRepo }) => {
    const error_prefix = '[Application error] ProductService. ';
    if (!productRepo || !favoriteRepo) throw new Error(error_prefix + ' Repositories are required.');
    const state = {
        products: [],
    }
    const listeners = new Set();
    const getViewState = () => {
        const favs = favoriteRepo.getFavorites();
        return {
            products: state.products.map((product) => ({ ...product, isFavorite: favs.includes(product.id) })),
            favorites: [...favoriteRepo.getFavorites()]
        }
    }
    const notify = () => {
        const viewState = getViewState();
        listeners.forEach((listener) => listener(viewState));
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
                if (typeof query !== 'string') throw new Error(error_prefix + 'Query must be a string.');
                state.products = await productRepo.getProducts(query);
                notify();
                return state.products;
            } catch (error) {
                console.error(error_prefix, error);
                return [];
            }
        },
        toggleFavorite: (productId) => {
            if (!productId) throw new Error(error_prefix + 'Id is required');
            let favorites = favoriteRepo.getFavorites();
            if (favorites.includes(productId)) {
                favorites = favorites.filter((id) => id !== productId);
            } else {
                favorites.push(productId);
            }
            favoriteRepo.setFavorites(favorites);
            const productFound = state.products.find((product) => product.id === productId);
            if (productFound) productFound.isFavorite = favorites.includes(productId);
            notify();
        }
    }
}
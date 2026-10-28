export const productService = ({ productRepo, favoriteRepo }) => {
    const error_prefix = '[Application error] ProductService. ';
    if (!productRepo || !favoriteRepo) throw new Error(error_prefix + ' Repositories are required.');
    const state = {
        products: [],
    }
    let favorites = favoriteRepo.getFavorites();
    const listeners = new Set();
    const getViewState = () => {
        const favoritesSet = new Set(favorites);
        return {
            products: state.products.map((product) => ({ ...product, isFavorite: favoritesSet.has(product.id) })),
            favorites: [...favorites]
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

            if (typeof query !== 'string') throw new Error(error_prefix + 'Query must be a string.');
            state.products = await productRepo.getProducts(query);
            notify();
            return state.products;
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
            // const productFound = state.products.find((product) => product.id === productId);
            // if (productFound) productFound.isFavorite = favorites.includes(productId);

        }
    }
}
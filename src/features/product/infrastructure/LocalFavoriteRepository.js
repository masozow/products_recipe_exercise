export const localFavoriteRepository = () => {
    const error_prefix = '[Infra error] LocalFavoriteRepo.';
    const key = 'favorites';
    return {
        getFavorites: () => {
            try {
                const favs = JSON.parse(localStorage.getItem(key)) || [];
                return favs;
            } catch (error) {
                console.error(error_prefix, error);
                return [];
            }
        },
        setFavorites: (favorites) => {
            if (!favorites) throw new Error(error_prefix + 'Favorites are required.')
            try {
                localStorage.setItem(key, JSON.stringify(favorites))
            } catch (error) {
                console.error(error_prefix, error);
            }
        }
    }
}
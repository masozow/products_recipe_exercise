export const localFavoriteRepository = () => {
    const error_prefix = '[Infra error] LocalFavoriteRepo.';
    const key = 'favorites';
    return {
        getFavorites: () => {
            const favs = JSON.parse(localStorage.getItem(key)) || [];
            return favs;
        },
        setFavorites: (favorites) => {
            if (!favorites) throw new Error(error_prefix + 'Favorites are required.')
            localStorage.setItem(key, JSON.stringify(favorites))
        }
    }
}
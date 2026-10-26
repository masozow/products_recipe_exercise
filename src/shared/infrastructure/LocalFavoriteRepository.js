export const localFavoriteRepository = ({ key, errorLocationCall = '' }) => {
    const error_prefix = '[Infra error] ' + errorLocationCall + '. ';
    if (!key) throw new Error(error_prefix + 'Key is required.');
    return {
        getFavorites: () => {
            const favs = JSON.parse(localStorage.getItem(key)) || [];
            return favs;
        },
        setFavorites: (favorites) => {
            if (!favorites) throw new Error()
            localStorage.setItem(key, JSON.stringify(favorites));
        }
    }
}
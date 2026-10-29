export const localFavoriteRepository = ({ key, errorLocationCall = '' }) => {
    const error_prefix = '[Infra error] ' + errorLocationCall + '. ';
    if (!key) throw new Error(error_prefix + 'Key is required.');
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
            try {
                if (!favorites) throw new Error(error_prefix + ' favorites is required.')
                localStorage.setItem(key, JSON.stringify(favorites));
            } catch (error) {
                console.error(error_prefix, error);
            }
        }
    }
}
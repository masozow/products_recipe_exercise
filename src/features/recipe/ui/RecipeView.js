import { CardsGrid } from "../../../shared/ui/components/CardsGrid.js";
import { RecipeCard } from "./components/RecipeCard.js";

export const recipewView = ({ results }) => {
    const error_prefix = '[UI Error] RecipeView. ';
    if (!results)
        throw new Error(error_prefix + 'results is required.');
    return {
        renderError: (errorState) => {
            if (errorState)
                results.innerHTML = `
                <p class='.error'>
                    Something went wrong, please try again later.
                </p>
                `;
        },
        renderLoading: (loadingState) => {
            if (loadingState)
                results.innerHTML = `
                <p class='.loading'>
                    Loading recipes...
                </p>
                `;
        },
        renderGrid: (data, query) => {
            if (data.length === 0) return query ? 'No data found.' : '';
            results.innerHTML = CardsGrid({ data, CardComponent: RecipeCard })
        },
        updateCardFavoriteStatus: ({ btn, card, isFavorite }) => {
            if (!btn) throw new Error(error_prefix + ' Button (btn) is required.');
            if (!card) throw new Error(error_prefix + ' Card is rquired.');
            if (isFavorite === undefined) throw new Error(error_prefix + ' isFavorite is required.');
            const activeClass = card.dataset.activeClass;
            const btnActiveText = btn.dataset.activeText;
            const btnInactiveText = btn.dataset.inactiveText;
            if (isFavorite) {
                card.classList.add(activeClass);
                btn.textContent = btnActiveText;
            } else {
                card.classList.remove(activeClass);
                btn.textContent = btnInactiveText;
            }
        }
    }
}



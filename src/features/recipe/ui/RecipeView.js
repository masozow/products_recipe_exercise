import { CardsGrid } from "../../../shared/ui/components/CardsGrid.js";
import { RecipeCard } from "./components/RecipeCard.js";

export const recipewView = ({ results }) => {
    const error_prefix = '[UI Error] RecipeView. ';
    if (!results)
        throw new Error(error_prefix + 'results is required.');
    return {
        renderGrid: (data) => {
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



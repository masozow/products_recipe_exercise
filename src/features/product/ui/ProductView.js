import { CardsGrid } from "../../../shared/ui/components/CardsGrid.js";
import { ProductCard } from "./components/ProductCard.js";

export const productView = ({ productResults }) => {
    const error_prefix = '[UI error] ProductView.';
    if (!productResults) throw new Error(error_prefix + 'productResults is required');
    return {
        renderGrid: (data, query) => {
            if (data.length === 0) return query ? 'No data found' : '';
            productResults.innerHTML = CardsGrid({ data, CardComponent: ProductCard });
        },
        updateCardFavoriteStatus: ({ card, btn, isFavorite }) => {
            if (!btn) throw new Error(error_prefix + ' Button (btn) is required.');
            if (!card) throw new Error(error_prefix + ' Card is rquired.');
            if (isFavorite === undefined) throw new Error(error_prefix + ' isFavorite is required.');
            const cardActiveClass = card.dataset.activeClass;
            const btnActiveText = btn.dataset.activeText;
            const btnInactiveText = btn.dataset.inactiveText;
            if (isFavorite) {
                card.classList.add(cardActiveClass);
                btn.textContent = btnActiveText;
            } else {
                card.classList.remove(cardActiveClass);
                btn.textContent = btnInactiveText
            }
        }
    }
}
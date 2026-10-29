import { CardsGrid } from "../../../shared/ui/components/CardsGrid.js";
import { ProductCard } from "./components/ProductCard.js";

export const productView = ({ productResults }) => {
    const error_prefix = '[UI error] ProductView.';
    if (!productResults) throw new Error(error_prefix + 'productResults is required');
    return {
        renderLoading: (loadingState) => {
            if (loadingState)
                productResults.innerHTML = `
                <p class='loading'>
                    Loading products...
                </p>
                `;
        },
        renderError: (errorState) => {
            if (errorState)
                productResults.innerHTML = `
                <p class='error'>
                    An error has ocurred. Try again later.
                </p>
                `;
        },
        renderEmpty: (emptyState) => {
            if (emptyState)
                productResults.innerHTML = `
                <p class='empty'>
                    No data found
                </p>
                `;
        },
        renderGrid: (data) => {
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
                btn.setAttribute('aria-pressed', 'true');
            } else {
                card.classList.remove(cardActiveClass);
                btn.textContent = btnInactiveText
                btn.setAttribute('aria-pressed', 'false');
            }
        }
    }
}
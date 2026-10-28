import { debounce } from "../../../shared/utils/debounce.js";
import { productView } from "./ProductView.js";


export const productUI = ({ dom, productService }) => {
    const error_prefix = '[UI error] ProductController. ';
    try {
        const { productsSearch, productsResults } = dom;
        if (!productsSearch) throw new Error(error_prefix + ' Products search is required.');
        if (!productsResults) throw new Error(error_prefix + ' Products results is required.');
        if (!productService) throw new Error(error_prefix + 'Service is required');
        //Getting needed functions from factories
        const {
            renderEmpty,
            renderLoading,
            renderError,
            renderGrid,
            updateCardFavoriteStatus
        } = productView({ productResults: productsResults });
        const {
            search,
            toggleFavorite,
            onProductChange,
            onErrorChange,
            onLoadingChange,
            onEmptyChange,
        } = productService;
        //Subscriptions to signals for rendering control according to loading states:
        onErrorChange((errorState) =>
            renderError(errorState)
        );
        onLoadingChange((loadingState) =>
            renderLoading(loadingState)
        );
        onEmptyChange((emptyState) =>
            renderEmpty(emptyState)
        );
        onProductChange((data) => {
            renderGrid(data, productsSearch.value.trim())
        });
        //#region Search logic
        const debouncedSearch = debounce(async (query) => await search(query), 500);
        productsSearch.addEventListener('input', async (e) => {
            debouncedSearch(e.target.value);
        });
        //#endregion
        //#region favorite logic
        const actions = {
            'toggle-product-favorite': (id) => toggleFavorite(Number(id))
        }
        productsResults.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const action = actions[btn.dataset.action];
            if (!action) return;
            const card = btn.closest('[data-component="product-card"]');
            if (!card) return;
            const isFavorite = action(card.dataset.id);
            updateCardFavoriteStatus({ card, btn, isFavorite });
        })
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
}

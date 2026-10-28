import { debounce } from "../../../shared/utils/debounce.js";
import { productView } from "./ProductView.js";


export const productUI = ({ dom, productService }) => {
    const error_prefix = '[UI error] ProductController. ';
    try {
        const { productsSearch, productsResults } = dom;
        if (!productsSearch) throw new Error(error_prefix + ' Products search is required.');
        if (!productsResults) throw new Error(error_prefix + ' Products results is required.');
        if (!productService) throw new Error(error_prefix + 'Service is required');

        const { renderGrid, updateCardFavoriteStatus } = productView({ productResults: productsResults });

        //#region Search logic
        const { search, subscribe, toggleFavorite } = productService;
        subscribe((state) => renderGrid(state, productsSearch.value.trim()));

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
            console.dir(btn.dataset)
            if (!btn) return;
            const action = actions[btn.dataset.action];
            if (!action) return;
            const card = btn.closest('[data-component="product-card"]');
            console.dir(card.dataset);
            if (!card) return;
            const isFavorite = action(card.dataset.id);
            updateCardFavoriteStatus({ card, btn, isFavorite });
        })
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
}

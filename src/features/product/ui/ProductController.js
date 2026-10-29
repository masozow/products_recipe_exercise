import { debounce } from "../../../shared/utils/debounce.js";
import { productView } from "./ProductView.js";
import { RenderStates } from "../../../shared/ui/components/RenderStates.js";
import { validStates } from "../../../shared/dictionaries/validStates.js";
export const productUI = ({ dom, productService }) => {
    const error_prefix = '[UI error] ProductController. ';
    const featureName = 'products';
    try {
        const { productsSearch, productsResults } = dom;
        if (!productsSearch) throw new Error(error_prefix + ' Products search is required.');
        if (!productsResults) throw new Error(error_prefix + ' Products results is required.');
        if (!productService) throw new Error(error_prefix + 'Service is required');
        //Getting needed functions from factories
        const {
            renderError,
            renderIdle,
            renderLoading,
            renderEmpty
        } = RenderStates(productsResults);
        const {
            renderGrid,
            updateCardFavoriteStatus
        } = productView({ productResults: productsResults });
        const {
            ERROR,
            IDLE,
            LOADING,
            SUCCESS,
            EMPTY
        } = validStates;
        const {
            search,
            toggleFavorite,
            onStateChange
        } = productService;

        //Subscriptions to signals for rendering control according to loading states:
        onStateChange((state) => {
            switch (state.state) {
                case ERROR: renderError(); break;
                case LOADING: renderLoading(featureName); break;
                case EMPTY: renderEmpty(); break;
                case IDLE: renderIdle(featureName); break;
                case SUCCESS: renderGrid(state.products, productsSearch.value.trim()); break;
                default: renderIdle(featureName); break;
            }
        });
        //#region Search logic
        const debouncedSearch = debounce(async (query) => await search(query), 500);
        productsSearch.addEventListener('input', async (e) => {
            debouncedSearch(e.target.value);
        });
        //Necessary to store the value the user wrote while JS was loading
        const currentQuery = productsSearch.value.trim();
        if (currentQuery !== '')
            search(currentQuery)
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

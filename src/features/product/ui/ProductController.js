import { ProductCard } from "./components/ProductCard.js"
import { CardsGrid } from "../../../shared/ui/components/CardsGrid.js";
import { debounce } from "../../../shared/utils/debounce.js";

const renderGrid = (state) => {
    return CardsGrid({ data: state.products, CardComponent: ProductCard });
}
export const productUI = ({ dom, productService }) => {
    const error_prefix = '[UI error] ProductController. ';
    const { productsSearch, productsResults } = dom;
    if (!productsSearch) throw new Error(error_prefix + ' Products search is required.');
    if (!productsResults) throw new Error(error_prefix + ' Products results is required.');
    if (!productService) throw new Error(error_prefix + 'Service is required');
    //#region Search logic
    const { search, subscribe, toggleFavorite } = productService;
    subscribe((state) => productsResults.innerHTML = renderGrid(state));

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
        const card = btn.closest('.card');
        if (!card) return;
        action(card.dataset.id);
    })
    //#endregion
}

import { HttpClient } from "./shared/infrastructure/HttpClient.js";
import { apiProductRepository } from "./features/product/infrastructure/ApiProductRepository.js";
import { ProductCard } from "./features/ui/components/ProductCard.js";
import { CardsGrid } from "./shared/ui/components/CardsGrid.js";
import { debounce } from "./shared/utils/debounce.js";
import { productService } from "./features/product/application/ProductService.js";
document.addEventListener('DOMContentLoaded', () => {
    const error_prefix = '[Main error] ';
    try {
        //#region DOM elements
        const productsSearch = document.getElementById('products-search');
        const results = document.getElementById('products-result');
        //#endregion
        //Render products grid
        const renderGrid = (state) => {
            console.log('products:', state.products);
            return CardsGrid({ data: state.products, CardComponent: ProductCard });
        }

        //#region Search logic
        const { getProducts } = apiProductRepository(HttpClient);
        const { search, subscribe, toggleFavorite } = productService({ getProducts });
        subscribe((state) => results.innerHTML = renderGrid(state));
        // const handleSearch = async (query) => {
        //     //Search
        //     const response = await getProducts(query);
        //     //Render
        //     // if (response) renderGrid(response);
        // }
        const debouncedSearch = debounce(async (query) => await search(query), 500);
        productsSearch.addEventListener('input', async (e) => {
            debouncedSearch(e.target.value);
        });
        //#endregion
        //#region favorite logic
        const actions = {
            'toggle-product-favorite': (id) => toggleFavorite(Number(id))
        }
        results.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const action = actions[btn.dataset.action];
            if (!action) return;
            const card = btn.closest('.card');
            if (!card) return;
            const action_result = action(card.dataset.id);
            console.log(action_result);
        })
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
});
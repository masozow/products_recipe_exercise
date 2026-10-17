import { HttpClient } from "./shared/infrastructure/HttpClient.js";
import { apiProductRepository } from "./features/product/infrastructure/ApiProductRepository.js";
import { ProductCard } from "./features/ui/components/ProductCard.js";
import { CardsGrid } from "./shared/ui/components/CardsGrid.js";
import { debounce } from "./shared/utils/debounce.js";
document.addEventListener('DOMContentLoaded', () => {
    const error_prefix = '[Main error] ';
    try {
        //#region DOM elements
        const productsSearch = document.getElementById('products-search');
        const results = document.getElementById('products-result');
        //#endregion
        //#region Search logic
        const handleSearch = async (query) => {
            //Search
            const { getProducts } = apiProductRepository(HttpClient);
            const response = await getProducts(query);
            //Render
            if (response) results.innerHTML = CardsGrid({ data: response, CardComponent: ProductCard });
        }
        const debouncedSearch = debounce(handleSearch, 500);
        productsSearch.addEventListener('input', async (e) => {
            debouncedSearch(e.target.value);
        });
        //#endregion

    } catch (error) {
        console.error(error_prefix, error);
    }
});
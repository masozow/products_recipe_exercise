import { ProductsSearchURL } from "./shared/dictionaries/ApiURLs.js";
import { HttpClient } from "./shared/infrastructure/HttpClient.js";
import { apiProductRepository } from "./features/product/infrastructure/ApiProductRepository.js";
import { ProductCard } from "./features/ui/components/ProductCard.js";

document.addEventListener('DOMContentLoaded', () => {
    const error_prefix = '[Main error] ';
    try {
        //#region DOM elements
        const productsSearch = document.getElementById('products-search');
        const results = document.getElementById('results');
        //#endregion
        //#region Search logic
        productsSearch.addEventListener('input', async (e) => {
            const { getProducts } = apiProductRepository(HttpClient);
            const response = await getProducts(e.target.value);
            // const response = await HttpClient({ url: ProductsSearchURL(e.target.value) })
            console.log('Response at main: ', response);
        });
        //#endregion
        //#region Render cards
        //const CardsGrid = r
        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
});
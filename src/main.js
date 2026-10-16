import { ProductsSearchURL } from "./shared/dictionaries/ApiURLs.js";
import { HttpClient } from "./shared/infrastructure/HttpClient.js";
document.addEventListener('DOMContentLoaded', () => {
    const error_prefix = '[Main error] ';
    try {
        //#region DOM elements
        const productsSearch = document.getElementById('products-search');
        //#endregion
        //#region Search logic
        productsSearch.addEventListener('input', async (e) => {
            const response = await HttpClient({ url: ProductsSearchURL(e.target.value) })
            console.log(response);
            console.log(e.target.value);
        });
        //#endregion

    } catch (error) {
        console.error(error_prefix, error);
    }
});
import { ProductModule } from "./features/product/ProductModule.js";
document.addEventListener('DOMContentLoaded', () => {
    const error_prefix = '[Main error] ';
    try {
        //#region DOM elements
        const productsSearch = document.getElementById('products-search');
        const productsResults = document.getElementById('products-result');
        //#endregion
        ProductModule({ productsSearch, productsResults });
    } catch (error) {
        console.error(error_prefix, error);
    }
});
import('./shared/test/index.js');

const error_prefix = '[Main error] ';
//#region Product
//DOM elements
const productsSearch = document.getElementById('products-search');
const productsResults = document.getElementById('products-result');
//Logic
if (productsSearch && productsResults) {
    productsSearch.addEventListener('input', async (e) => {
        productsResults.innerHTML = `<p class="loading">Loading products...</p>`;
        try {
            const { ProductModule } = await import('./features/product/ProductModule.js');
            ProductModule({ productsSearch, productsResults });
        } catch (error) {
            console.error(error_prefix, error);
            productsResults.innerHTML = '';
        }

    }, { once: true });
}
//#endregion

//#region Recipe
//DOM elements
const recipesSearch = document.getElementById('recipes-search');
const recipesResults = document.getElementById('recipes-result');
//Logic
if (recipesSearch && recipesResults) {
    recipesSearch.addEventListener('input', async (e) => {
        recipesResults.innerHTML = `<p class="loading">Loading recipes...</p>`;
        try {
            const { RecipeModule } = await import('./features/recipe/RecipeModule.js');
            RecipeModule({ recipesSearch, recipesResults });
        } catch (error) {
            console.error(error_prefix, error);
            recipesResults.innerHTML = '';
        }
    }, { once: true })
}
//#endregion


// import('./shared/test/index.js');
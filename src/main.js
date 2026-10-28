document.addEventListener('DOMContentLoaded', async () => {
    const error_prefix = '[Main error] ';
    try {
        //#region Product
        //DOM elements
        const productsSearch = document.getElementById('products-search');
        const productsResults = document.getElementById('products-result');
        //Logic
        if (productsSearch && productsResults) {
            const { ProductModule } = await import('./features/product/ProductModule.js');
            ProductModule({ productsSearch, productsResults });
        }
        //#endregion

        //#region Recipe
        //DOM elements
        const recipesSearch = document.getElementById('recipes-search');
        const recipesResults = document.getElementById('recipes-result');
        //Logic
        if (recipesSearch && recipesResults) {
            const { RecipeModule } = await import('./features/recipe/RecipeModule.js');
            RecipeModule({ recipesSearch, recipesResults });
        }

        //#endregion
    } catch (error) {
        console.error(error_prefix, error);
    }
});
// import('./shared/test/index.js');
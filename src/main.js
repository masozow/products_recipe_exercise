
const error_prefix = '[Main error] ';
const createLoader = (featureName = '') => `
    <p class="loading">Loading${featureName ? ' ' + featureName : ''}...</p>
`;
const validLoadingStatuses = Object.freeze({
    IDLE: 'idle',
    DOWNLOADING: 'downloading',
    LOADED: 'loaded',
})
const { IDLE, DOWNLOADING, LOADED } = validLoadingStatuses;
let loadingStatus = IDLE;
const lazyLoadFeature = ({ searchElement, resultsElement, featureName, importModuleCallback }) => {
    if (!searchElement || !resultsElement) return;

    searchElement.addEventListener('input', async () => {
        // Guard clauses to prevent multiple parallel imports or redundant work
        if (loadingStatus === DOWNLOADING || loadingStatus === LOADED) return;

        loadingStatus = DOWNLOADING;
        resultsElement.innerHTML = createLoader(featureName);

        try {
            // Execute the specific dynamic import callback, to
            // extract the Module Namespace Object (ProductModule or RecipeModule)
            const module = await importModuleCallback();
            // Extract the array of the exported names (keys) by the module
            const moduleKeys = Object.keys(module);
            // Extracting the name of the first exported member, which
            // in this case corresponds to the module name
            const moduleNameAsString = moduleKeys[0];
            // Extracting the function that will be executed, that represents the
            // module, passing a named property with its name
            const moduleExecutableFunction = module[moduleNameAsString];
            // Assembling the elements names to be passed as a named properties
            const featureSearchElement = `${featureName}Search`;
            const featureResultsElement = `${featureName}Results`;
            // Execute the module, passing it the elements it needs:
            moduleExecutableFunction({
                [featureSearchElement]: searchElement,
                [featureResultsElement]: resultsElement
            });

            loadingStatus = LOADED; // Mark as successfully mounted
        } catch (error) {
            console.error(error_prefix + `Failed to lazy-load ${featureName}:`, error);
            resultsElement.innerHTML = `<p class="error">Connection failed. Type again to retry.</p>`;
            loadingStatus = IDLE;
        }
    });
};

//#region Initialization
// Products
lazyLoadFeature({
    searchElement: document.getElementById('products-search'),
    resultsElement: document.getElementById('products-result'),
    featureName: 'products',
    importModuleCallback: () => import('./features/product/ProductModule.js')
});

//  Recipes
lazyLoadFeature({
    searchElement: document.getElementById('recipes-search'),
    resultsElement: document.getElementById('recipes-result'),
    featureName: 'recipes',
    importModuleCallback: () => import('./features/recipe/RecipeModule.js')
});
//#endregion

// import('./shared/test/index.js');
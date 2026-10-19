import { ProductsSearchURL } from "../../../shared/dictionaries/ApiURLs.js";
import { Product } from "../domain/Product.js";

export const apiProductRepository = (httpClient) => {
    const error_prefix = '[Infra error] ApiProductRepository. ';
    if (typeof httpClient !== 'function') throw new Error(error_prefix + 'httpClient must be a function.');

    return {
        getProducts: async (query) => {
            try {
                if (typeof query !== 'string') throw new Error(error_prefix + 'Query must be a string.');
                const url = ProductsSearchURL(query);
                const rawProducts = await httpClient({ url });
                if (!rawProducts.products) throw new Error(error_prefix + `Products object didn't returned: ${rawProducts}`)
                if (!Array.isArray(rawProducts.products)) throw new Error(error_prefix + `Endpoint returned an invalid type: ${rawProducts}`);
                return rawProducts.products.map((product) => Product({ ...product }));
            } catch (error) {
                console.error(error_prefix, error);
                return [];
            }
        },
    }
}
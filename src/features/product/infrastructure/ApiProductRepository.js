import { ProductsSearchURL } from "../../../shared/dictionaries/ApiURLs.js";
import { Product } from "../domain/Product.js";
import { getItems } from "../../../shared/utils/getItems.js";
export const apiProductRepository = (httpClient) => {
    const error_prefix = '[Infra error] ApiProductRepository. ';
    if (typeof httpClient !== 'function') throw new Error(error_prefix + 'httpClient must be a function.');

    return {
        getProducts: async (query) => {
            const url = ProductsSearchURL(query);
            return getItems({
                query,
                item_acces_key:
                    'products',
                ItemShape: Product,
                url,
                error_message_prefix: error_prefix,
                httpClient
            })
        },
    }
}
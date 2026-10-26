import { HttpClient } from "../../shared/infrastructure/HttpClient.js";
import { apiProductRepository } from "./infrastructure/ApiProductRepository.js";
import { localFavoriteRepository } from "../../shared/infrastructure/LocalFavoriteRepository.js";
import { productService } from "./application/ProductService.js";
import { productUI } from "./ui/ProductController.js";

export const ProductModule = ({ productsSearch, productsResults }) => {
    //#region Ensamble product parts
    const apiRepo = apiProductRepository(HttpClient);
    const favRepo = localFavoriteRepository({ key: 'products-favorites' });
    const service = productService({ productRepo: apiRepo, favoriteRepo: favRepo });
    //#endregion
    //init productUI
    productUI({ dom: { productsSearch, productsResults }, productService: service });
}
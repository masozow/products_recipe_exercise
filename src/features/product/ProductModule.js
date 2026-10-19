import { HttpClient } from "../../shared/infrastructure/HttpClient.js";
import { apiProductRepository } from "./infrastructure/ApiProductRepository.js";
import { productService } from "./application/ProductService.js";
import { productUI } from "./ui/ProductController.js";

export const ProductModule = ({ productsSearch, productsResults }) => {
    //#region Ensamble product parts
    const { getProducts } = apiProductRepository(HttpClient);
    const service = productService({ getProducts });
    //#endregion
    //init productUI
    productUI({ dom: { productsSearch, productsResults }, productService: service });
}
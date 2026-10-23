import { esc } from "../../../../shared/utils/escapeHTML.js";
export const ProductCard = (product) => `
    <article data-id=${esc(product.id)} class='card ${product.isFavorite ? 'fav' : ''}'>
        <h3>${esc(product.title)}</h3>
        <p>Category</p><p> ${esc(product.category)}</p>
        <p>Rating</p><p>${esc(product.rating)}</p>
        ${esc(product.brand) ? '<p>Brand</p><p>' + esc(product.brand) + '</p>' : ''}       
        <img loading='lazy' src=${esc(product.thumbnail)} alt=${esc(product.title)}/>    
        <p class="price">${esc(product.price)}</p>
        <button data-action='toggle-product-favorite'>
            ${product.isFavorite ? '[*] Remove favorite' : '[ ] Add to favorites'}
        </button>
    </article>
`;
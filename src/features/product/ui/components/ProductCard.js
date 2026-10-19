import { esc } from "../../../../shared/utils/escapeHTML.js";
export const ProductCard = (product) => `
    <article data-id=${esc(product.id)} class='card ${product.isFavorite ? 'fav' : ''}'>
        <h3>${esc(product.title)}</h3>
        <div class='content'>
            <div class='data'>   
                <p>Category: ${esc(product.category)}</p>
                <p>Rating: ${esc(product.rating)}</p>
                ${esc(product.brand) ? '<p>' + esc(product.brand) + '</p>' : ''}
            </div>
            <img loading='lazy' src=${esc(product.thumbnail)} alt=${esc(product.title)}/>
            
        </div>
        <p class="price">${esc(product.price)}</p>
        <button data-action='toggle-product-favorite'>
            ${product.isFavorite ? '[*] Remove favorite' : '[ ] Add to favorites'}
        </button>
    </article>
`;
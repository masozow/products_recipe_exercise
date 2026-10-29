import { esc } from "../../../../shared/utils/escapeHTML.js";
export const ProductCard = (product) => {
    const { id, isFavorite, ...rest } = product;
    const presentationState = {
        dataComponent: 'product-card',
        activeClass: 'fav',
        btnText: (isFavorite) => isFavorite ? '[*] Remove from favorites' : '[ ] Add to favorites'
    }
    return `
    <article 
    data-component="${presentationState.dataComponent}"
    data-active-class="${presentationState.activeClass}"
    data-id="${esc(id)}" 
    class='card ${isFavorite ? presentationState.activeClass : ''}'
    >
        <h3>${esc(rest.title)}</h3>
        <p>Category</p><p> ${esc(rest.category)}</p>
        <p>Rating</p><p>${esc(rest.rating)}</p>
        ${esc(rest.brand) ? '<p>Brand</p><p>' + esc(product.brand) + '</p>' : ''}       
        <img loading='lazy' src="${esc(rest.thumbnail)}" alt="${esc(product.title)}"/>    
        <p class="price">${esc(rest.price)}</p>
        <button 
        data-action='toggle-product-favorite'
        data-active-text='${presentationState.btnText(true)}'
        data-inactive-text='${presentationState.btnText(false)}'
        aria-pressed="${isFavorite ? 'true' : 'false'}"
        >
            ${presentationState.btnText(isFavorite)}
        </button>
    </article>
`};
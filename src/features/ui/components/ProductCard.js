export const ProductCard = (product) => `
    <article data-id=${product.id} class='card ${product.isFavorite ? 'fav' : ''}'>
        <h3>${product.title}</h3>
        <div class='content'>
            <div class='data'>   
                <p>Category: ${product.category}</p>
                <p>Rating: ${product.rating}</p>
                ${product.brand ? '<p>' + product.brand + '</p>' : ''}
            </div>
            <img loading='lazy' src=${product.thumbnail} alt=${product.title}/>
            
        </div>
        <p class="price">${product.price}</p>
        <button>
            ${product.isFavorite ? '[*] Remove favorite' : '[ ] Add to favorites'}
        </button>
    </article>
`;
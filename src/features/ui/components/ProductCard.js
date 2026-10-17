export const ProductCard = (product) => `
    <article data-id=${product.id} class='card ${product.isFavorite ? 'fav' : ''}'>
        <h3>${product.title}</h3>
        <div>   
            <p>Category: ${product.category}</p>
            <p>Rating: ${product.rating}</p>
            ${product.brand ? '<p>' + product.brand + '</p>' : ''}
        </div>
        <img loading='lazy' src=${product.thumbnail} alt=${product.title}/>
        <p class=".price">${product.price}</p>
    </article>
`;
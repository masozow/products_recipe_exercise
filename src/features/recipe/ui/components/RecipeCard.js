import { esc } from "../../../../shared/utils/escapeHTML.js";

export const RecipeCard = (recipe) => {
    const { image, id, isFavorite, name, ...rest } = recipe;
    console.log('Recipe at card: ', recipe);
    return `  
    <article data-id=${esc(id)} class='card ${isFavorite ? 'fav' : ''}'>
        <h3>${esc(name)}</h3>
            ${Object.entries(rest).map(([key, value]) =>
        `
                <p>${esc(String(key).replace('_', ' '))}</p>
                <p class='value'>${esc(value)}</p>
            `).join('')}
        
        <img loading=lazy src=${image} alt=${name}/>
        <button data-action='toggle-recipe-favorite'>
        ${isFavorite ? '[*] Remove favorite' : '[ ] Add to favorites'}
        </button>
    </article>
`};
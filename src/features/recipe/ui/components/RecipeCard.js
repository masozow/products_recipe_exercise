import { esc } from "../../../../shared/utils/escapeHTML.js";

export const RecipeCard = (recipe) => {
    const { image, id, isFavorite, name, ...rest } = recipe;
    return `  
    <article data-id=${esc(id)} class='card ${isFavorite ? 'fav' : ''}'>
        <h3>${esc(name)}</h3>
        
        <div class='data'>
            ${Object.entries(rest).map(([key, value]) =>
        `<div class='data-row'>
                <p>${esc(String(key).replace('_', ' '))}</p>
                <p class='value'>${esc(value)}</p>
            </div>`).join('')}
        
        </div>
        <img loading=lazy src=${image} alt=${name}/>
    </article>
`};
import { esc } from "../../../../shared/utils/escapeHTML.js";

export const RecipeCard = (recipe) => {
    const { image, id, isFavorite, name, ...rest } = recipe;
    const presentationState = {
        dataComponent: "recipe-card",
        activeClass: "fav",
        btnText: (condition) => condition ? '[*] Remove favorite' : '[ ] Add to favorites'
    }
    return `  
    <article 
    data-id="${esc(id)}" 
    data-active-class="${presentationState.activeClass}"
    data-component="${presentationState.dataComponent}"
    class='card ${isFavorite ? presentationState.activeClass : ''}'>
        <h3>${esc(name)}</h3>
            ${Object.entries(rest).map(([key, value]) =>
        `
                <p>${esc(String(key).replace('_', ' '))}</p>
                <p class='value'>${esc(value)}</p>
            `).join('')}
        
        <img loading=lazy src="${esc(image)}" alt="${esc(name)}"/>
        <button 
        data-action='toggle-recipe-favorite'
        data-active-text="${presentationState.btnText(true)}"
        data-inactive-text="${presentationState.btnText(false)}"
        >
        ${presentationState.btnText(isFavorite)}
        </button>
    </article>
`};
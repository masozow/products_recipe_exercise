export const CardsGrid = ({ data, CardComponent }) => {
    return `
            <div class='grid'>
                ${data.map((d) => CardComponent(d)).join('')}
            </div>
            `;
}
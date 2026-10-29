
export const RenderStates = (resultsHTMLComponent) => {
    return {
        renderIdle: (featureName = '') => {
            resultsHTMLComponent.innerHTML = `
            <p class='idle'>
                Search for some${featureName ? ' ' + featureName : 'thing'}.
            </p>
            `;
        },
        renderError: () => {
            resultsHTMLComponent.innerHTML = `
                    <p class='error'>
                        Something went wrong, please try again later.
                    </p>
                    `;
        },
        renderLoading: (featureName = '') => {
            resultsHTMLComponent.innerHTML = `
                    <p class='loading'>
                        Loading${featureName ? ' ' + featureName : ''}...
                    </p>
                    `;
        },
        renderEmpty: () => {
            resultsHTMLComponent.innerHTML = `
                    <p class='empty'>No data found.</p>
                `;
        },
    }
}
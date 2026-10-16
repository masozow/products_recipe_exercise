export const Section = ({ id, searchBoxProperties = {}, resultsId }) => `
    <section id=${id}>
        <div id=${searchBoxProperties.id}>
          <label for="prdoucts-search" id="products-search-label"
            >Search products</label
          >
          <input
            type="text"
            id="products-search"
            placeholder="Search products..."
          />
        </div>
        <div id="produts-result"></div>
      </section>
`;
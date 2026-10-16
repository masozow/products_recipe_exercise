# Products & Recipes: two features, one architecture

## 1. The exercise

Use these two URLs to build **two search features on the same page**:

| Feature  | URL                                             |
| -------- | ----------------------------------------------- |
| Products | `https://dummyjson.com/products/search?q=phone` |
| Recipes  | `https://dummyjson.com/recipes/search?q=pizza`  |

For **each** feature:

1. A search box. The search runs every time the user presses a key (debounced, so it does not fire on every single keystroke).
2. A responsive grid of cards. Each card shows the image (with a proper `alt`), the relevant fields and a favorite button.
3. The button marks a card as favorite; clicking again unmarks it. Use a CSS class to tell favorites apart. Favorites must be kept **after every search** and **after reloading the page**. Favorites of one feature must never leak into the other.
4. The results area is **empty when the search box is empty**.
5. Show distinct _Loading_, _No results_ and _Error_ states.
6. A slow, older response must never overwrite a newer one.
7. The API is untrusted input: no HTML injection (XSS).

Relevant fields:

| Product                                                   | Recipe                                                          |
| --------------------------------------------------------- | --------------------------------------------------------------- |
| `id`, `title`, `price`, `category`, `rating`, `thumbnail` | `id`, `name`, `cuisine`, `difficulty`, `rating`, `image`        |
| `brand` is **optional**: never print `undefined`          | show **one** total time = `prepTimeMinutes` + `cookTimeMinutes` |

Page requirements (this is what the role is about):

- No horizontal scroll at 360 px wide; the grid adapts by itself.
- Images must not make the layout jump while loading, and images below the fold must not slow the first paint.
- Usable with a keyboard; semantic HTML; the search box has a label.

Constraints: no frameworks, no libraries, no build step. ES modules and the browser DevTools are fine.

Begin from the simple: make it work first, refactor later. Your final solution should apply design and architectural patterns with **testability, decoupling and SOLID** in mind.

**Definition of done**

- [ ] Typing shows results for each feature; clearing the box empties the screen
- [ ] Loading, empty and error states work (try the offline mode in DevTools)
- [ ] Typing fast never shows results for an older query
- [ ] Favorite toggles, survives a new search, survives a reload, and is independent per feature
- [ ] `<img onerror=...>` typed into a search box or returned by the API does not execute
- [ ] Looks right at 360 px and at 1440 px

---

## 2. API cheat sheet

No API key. Open the URLs in a browser tab **before** writing code.

|                  | Products                                        | Recipes                                              |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------- |
| Search           | `https://dummyjson.com/products/search?q=phone` | `https://dummyjson.com/recipes/search?q=pizza`       |
| List lives under | `products`                                      | `recipes`                                            |
| Image field      | `thumbnail` (also `images[]`)                   | `image`                                              |
| Text fields      | `title`, `category`, `brand`, `price`, `rating` | `name`, `cuisine`, `difficulty`, `rating`            |
| Numbers          | `price`, `rating`, `id`                         | `prepTimeMinutes`, `cookTimeMinutes`, `rating`, `id` |

Notes:

- The response is an **object**, not an array: `{ "products": [...], "total": 23, "skip": 0, "limit": 23 }` (or `recipes` instead of `products`). Unwrapping it is the repository's job.
- Search is done by the **server** (`q`), so you do not download the whole catalog to filter it in the browser.
- Optional query params: `limit`, `skip`, `select` (e.g. `select=id,title,thumbnail` to get a smaller payload). Check in the Network tab that the payload actually shrinks.
- Images are hosted on DummyJSON's own CDN (a recipe image looks like `https://cdn.dummyjson.com/recipe-images/1.webp`). Open one in a tab and look at its size: it tells you why `thumbnail` beats `images[0]` in a grid.
- Docs: <https://dummyjson.com/docs/products> · <https://dummyjson.com/docs/recipes>

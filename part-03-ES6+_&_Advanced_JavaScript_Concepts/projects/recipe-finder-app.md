# Project 3: Recipe Finder Application
## Applying Modern JavaScript Concepts

Build a dynamic Recipe Finder application that fetches data from a real-world API. This project is designed to make you use all the modern ES6+ features, including modules, classes, destructuring, and promises.

## 🎯 Project Objectives

By completing this project, you will demonstrate your ability to:
- ✅ Structure a complex application using ES6 Modules (`import`/`export`).
- ✅ Use ES6 Classes to create reusable, organized components.
- ✅ Fetch data from a third-party API using Promises (`.then/.catch`).
- ✅ Use `async/await` syntax for cleaner asynchronous code (Bonus).
- ✅ Use destructuring and the spread operator to handle API data efficiently.
- ✅ Manipulate the DOM to display dynamic data.

---

## 📋 Requirements

### API
You can use a free recipe API. A great choice is **TheMealDB**: `https://www.themealdb.com/api.php`
- Search for meals by name: `www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`
- Look up a full meal detail by ID: `www.themealdb.com/api/json/v1/1/lookup.php?i=52772`

### Core Features (Must Implement)
1.  **Search for Recipes**: An input field and a search button to allow users to search for recipes by name.
2.  **Display Results**: Show a list or grid of matching recipes, including the recipe's image and name.
3.  **View Recipe Details**: When a user clicks on a recipe from the results, display a detailed view. This should include ingredients, measurements, and instructions.
4.  **Modular Code**: Your JavaScript code **must** be split into at least three modules (e.g., `app.js`, `api.js`, `ui.js`).

### Bonus Features (For an Extra Challenge)
5.  **Random Recipe**: A button to fetch and display a random recipe. (TheMealDB API: `www.themealdb.com/api/json/v1/1/random.php`)
6.  **Loading State**: Show a spinner or loading message while data is being fetched from the API.
7.  **Error Handling**: Gracefully handle cases where the API returns no results or an error occurs.
8.  **Save to Favorites**: Allow users to save their favorite recipes to `localStorage` and view them on a separate "Favorites" page or section.

---

## 🏗️ Project Structure

Create these files inside a `recipe-finder-app` folder:
```
part-03-es6-and-advanced-concepts/projects/recipe-finder-app/
├── index.html       # The HTML structure for your app
├── style.css        # Styles to make your app look good
├── js/
│   ├── app.js       # Main application logic (entry point)
│   ├── api.js       # Handles all communication with TheMealDB API
│   └── ui.js        # Handles all DOM manipulation and UI updates
└── README.md        # Your project documentation
```

---

## 📝 Step-by-Step Implementation Guide

### Step 1: HTML Structure (`index.html`)
- Create a header with the app title.
- Add a search form with an `input` and a `button`.
- Create a container `div` to display search results.
- Create a container `div` for displaying single recipe details (it can be a modal or a separate view).
- **Crucially**, link your main script with `type="module"`: `<script type="module" src="js/app.js"></script>`.

### Step 2: CSS Styling (`style.css`)
- Style the search bar, results grid, and recipe detail view to be clean and user-friendly.
- Create a class for a loading spinner.
- Style a modal popup for recipe details if you choose that route.

### Step 3: JavaScript Logic (The Core of the Project)

#### `js/api.js`
- Create an `APIManager` class.
- The constructor can hold the base URL for the API.
- Create methods like `searchRecipes(term)` and `getRecipeById(id)`.
- These methods will use `fetch()` to make API calls. They should return a `Promise` that resolves with the JSON data.
- Use `async/await` inside these methods for cleaner code.
- Export an instance of this class.

```javascript
// Example structure for api.js
class APIManager {
  // ...
  async searchRecipes(term) {
    // ... fetch logic ...
  }
}
export default new APIManager();
```

#### `js/ui.js`
- Create a `UIManager` class.
- The constructor can select and store references to key DOM elements (e.g., results grid, details view).
- Create methods like `displayRecipes(recipes)`, `displayRecipeDetails(recipe)`, `showLoading()`, and `hideLoading()`.
- These methods will be responsible for all `innerHTML` changes and DOM manipulation.
- Export an instance of this class.

```javascript
// Example structure for ui.js
class UIManager {
  // ...
  displayRecipes(recipes) {
    // ... loop and create HTML for each recipe ...
  }
}
export default new UIManager();
```

#### `js/app.js`
- This is your main controller file.
- `import` the instances from `api.js` and `ui.js`.
- Add an event listener to the search form's `submit` event.
- Inside the event handler:
    1. Prevent default form submission.
    2. Get the search term from the input.
    3. Call `ui.showLoading()`.
    4. Call the `api.searchRecipes(term)` method.
    5. Use `.then()` to handle the returned data: call `ui.displayRecipes(data)` and `ui.hideLoading()`.
    6. Use `.catch()` to handle any errors.
- Add an event listener to the results container (using event delegation) to handle clicks on individual recipes.

---

## 🎖️ Evaluation Criteria

**Beginner Level (Pass)**
- ✅ Can search for and display a list of recipes.
- ✅ Code is correctly split into modules.

**Intermediate Level (Good)**
- ✅ All beginner requirements met.
- ✅ Can click a recipe to view its full details.
- ✅ Uses ES6 classes for API and UI management.
- ✅ Handles loading states and basic errors.

**Advanced Level (Excellent)**
- ✅ All intermediate requirements met.
- ✅ Implemented at least two bonus features (e.g., random recipe, favorites).
- ✅ Code is well-commented, clean, and follows modern best practices.
- ✅ The user interface is polished and responsive.

Good luck! This project is a fantastic demonstration of modern JavaScript skills.
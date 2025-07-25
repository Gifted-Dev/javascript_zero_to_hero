/**
 * ui.js
 * This module is responsible for all DOM manipulation and UI updates.
 * It keeps the presentation logic separate from the application logic.
 */

class UIManager {
    constructor() {
        // Select all necessary elements once and store them
        this.resultsContainer = document.getElementById('results-container');
        this.modalContainer = document.getElementById('recipe-modal');
        this.modalDetailsContent = document.getElementById('modal-details-content');
        this.closeModalBtn = document.querySelector('.close-modal-btn');

        // Bind the closeModal method to the instance to ensure `this` is correct
        this.closeModal = this.closeModal.bind(this);
        this.closeModalBtn.addEventListener('click', this.closeModal);
        this.modalContainer.addEventListener('click', (e) => {
            if (e.target === this.modalContainer) {
                this.closeModal();
            }
        });
    }

    /**
     * Displays a list of recipe cards in the results container.
     * @param {Array} recipes - An array of recipe objects from the API.
     */
    displayRecipes(recipes) {
        this.clearResults();
        if (recipes.length === 0) {
            this.resultsContainer.innerHTML = '<p>No recipes found. Try another search!</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            // Store the recipe ID in a data attribute for easy access
            recipeCard.dataset.id = recipe.idMeal;

            recipeCard.innerHTML = `
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <div class="recipe-card-content">
                    <h3>${recipe.strMeal}</h3>
                </div>
            `;
            this.resultsContainer.appendChild(recipeCard);
        });
    }

    /**
     * Displays the full details of a single recipe in a modal.
     * @param {Object} recipe - A single, detailed recipe object from the API.
     */
    displayRecipeDetails(recipe) {
        // Create a list of ingredients and their measurements
        let ingredientsList = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient) {
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            } else {
                break; // No more ingredients
            }
        }

        this.modalDetailsContent.innerHTML = `
            <h2>${recipe.strMeal}</h2>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>Ingredients</h3>
            <ul>${ingredientsList}</ul>
            <h3>Instructions</h3>
            <p>${recipe.strInstructions}</p>
        `;
        this.modalContainer.classList.remove('hidden');
    }

    /**
     * Closes the recipe details modal.
     */
    closeModal() {
        this.modalContainer.classList.add('hidden');
    }

    /**
     * Clears the results container and shows a loading spinner.
     */
    showLoading() {
        this.resultsContainer.innerHTML = '<div class="loading-spinner"></div>';
    }

    /**
     * Clears the results container.
     */
    clearResults() {
        this.resultsContainer.innerHTML = '';
    }
}

// Export a single, shared instance of the UIManager.
export default new UIManager();
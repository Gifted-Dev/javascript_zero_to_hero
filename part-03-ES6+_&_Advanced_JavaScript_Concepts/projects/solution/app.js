/**
 * app.js
 * This is the main controller of the application.
 * It imports the other modules and orchestrates the application flow.
 * It handles user input and decides when to call the API and update the UI.
 */

import api from './api.js';
import ui from './ui.js';

class App {
    constructor() {
        // Store references to the imported modules
        this.api = api;
        this.ui = ui;

        // Select the main interactive elements
        this.searchForm = document.getElementById('search-form');
        this.searchInput = document.getElementById('search-input');
        this.resultsContainer = document.getElementById('results-container');

        // Bind event handlers to the App instance to maintain `this` context
        this.handleSearch = this.handleSearch.bind(this);
        this.handleResultClick = this.handleResultClick.bind(this);

        // Attach the event listeners
        this.searchForm.addEventListener('submit', this.handleSearch);
        this.resultsContainer.addEventListener('click', this.handleResultClick);
    }

    /**
     * Handles the search form submission.
     * @param {Event} e - The submit event object.
     */
    async handleSearch(e) {
        e.preventDefault();
        const searchTerm = this.searchInput.value.trim();

        if (!searchTerm) {
            alert('Please enter a search term.');
            return;
        }

        this.ui.showLoading();

        try {
            const recipes = await this.api.searchRecipes(searchTerm);
            this.ui.displayRecipes(recipes);
        } catch (error) {
            this.ui.displayRecipes([]); // Display a "not found" message
            console.error("Search failed:", error);
        }
    }

    /**
     * Handles clicks within the results container, using event delegation.
     * @param {Event} e - The click event object.
     */
    async handleResultClick(e) {
        const card = e.target.closest('.recipe-card');
        if (card) {
            const recipeId = card.dataset.id;
            const recipe = await this.api.getRecipeById(recipeId);
            this.ui.displayRecipeDetails(recipe);
        }
    }
}

// Initialize the application by creating an instance of the App class.
new App();
/**
 * api.js
 * This module is responsible for all communication with TheMealDB API.
 * It encapsulates the fetch logic and provides simple methods to get recipe data.
 */

class APIManager {
    constructor() {
        this.baseUrl = 'https://www.themealdb.com/api/json/v1/1/';
    }

    /**
     * Searches for recipes based on a search term.
     * @param {string} term - The search term (e.g., "chicken").
     * @returns {Promise<Array>} A promise that resolves to an array of meal objects.
     */
    async searchRecipes(term) {
        const url = `${this.baseUrl}search.php?s=${term}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // The API returns { meals: [...] } or { meals: null } if no results
            return data.meals || [];
        } catch (error) {
            console.error("Error searching for recipes:", error);
            // Re-throw the error to be handled by the caller
            throw error;
        }
    }

    /**
     * Fetches the full details for a single recipe by its ID.
     * @param {string} id - The ID of the meal.
     * @returns {Promise<Object>} A promise that resolves to a single meal object.
     */
    async getRecipeById(id) {
        const url = `${this.baseUrl}lookup.php?i=${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // The lookup API returns { meals: [mealObject] }
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            console.error(`Error fetching recipe with ID ${id}:`, error);
            throw error;
        }
    }
}

// Export a single, shared instance of the APIManager.
// This is a common pattern called a Singleton.
export default new APIManager();
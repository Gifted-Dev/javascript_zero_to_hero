# Bonus: Framework Introduction - Exercises

Master the transition from vanilla JavaScript to modern frameworks! These exercises will help you apply your existing JavaScript knowledge to React and Vue.js, preparing you for modern frontend development.

## 🎯 How to Use These Exercises

1. **Build on your JavaScript foundation** - Use everything you've learned in the course
2. **Start with simple conversions** - Convert vanilla components to framework equivalents
3. **Compare approaches** - Understand the differences and similarities
4. **Practice framework patterns** - Learn idiomatic ways of doing things
5. **Build complete applications** - Apply framework concepts to real projects

---

## 📚 Basic Level (Must Complete All)

### Exercise 1: Component Conversion Challenge
Convert vanilla JavaScript components to both React and Vue.js.

#### Part A: Counter Component
```javascript
// TODO: Convert this vanilla JavaScript counter to React and Vue

// Vanilla JavaScript Counter
class Counter {
    constructor(container) {
        this.count = 0;
        this.container = container;
        this.render();
        this.setupEventListeners();
    }
    
    increment() {
        this.count++;
        this.render();
    }
    
    decrement() {
        this.count--;
        this.render();
    }
    
    reset() {
        this.count = 0;
        this.render();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="counter">
                <h2>Counter: ${this.count}</h2>
                <button class="btn-increment">+</button>
                <button class="btn-decrement">-</button>
                <button class="btn-reset">Reset</button>
            </div>
        `;
    }
    
    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-increment')) {
                this.increment();
            } else if (e.target.classList.contains('btn-decrement')) {
                this.decrement();
            } else if (e.target.classList.contains('btn-reset')) {
                this.reset();
            }
        });
    }
}

// TODO: Convert to React functional component
function Counter() {
    // TODO: Implement React version
    // Requirements:
    // 1. Use useState hook for count state
    // 2. Implement increment, decrement, and reset functions
    // 3. Use proper event handlers
    // 4. Apply CSS classes for styling
}

// TODO: Convert to Vue.js component
// <template>
//   <!-- TODO: Implement Vue template -->
//   <!-- Requirements: -->
//   <!-- 1. Display current count -->
//   <!-- 2. Three buttons for increment, decrement, reset -->
//   <!-- 3. Use proper event handlers (@click) -->
//   <!-- 4. Apply CSS classes for styling -->
// </template>
// 
// <script setup>
// // TODO: Implement Vue composition API version
// // Requirements:
// // 1. Use ref for reactive count
// // 2. Implement increment, decrement, and reset functions
// // 3. Export functions for template use
// </script>
```

#### Part B: Todo List Component
```javascript
// TODO: Convert this vanilla JavaScript todo list to React and Vue

// Vanilla JavaScript Todo List
class TodoList {
    constructor(container) {
        this.todos = [];
        this.container = container;
        this.render();
        this.setupEventListeners();
    }
    
    addTodo(text) {
        if (text.trim()) {
            this.todos.push({
                id: Date.now(),
                text: text.trim(),
                completed: false
            });
            this.render();
        }
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.render();
        }
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.render();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="todo-app">
                <div class="todo-input">
                    <input type="text" placeholder="Add a todo..." />
                    <button class="btn-add">Add</button>
                </div>
                <ul class="todo-list">
                    ${this.todos.map(todo => `
                        <li class="todo-item ${todo.completed ? 'completed' : ''}">
                            <span class="todo-text">${todo.text}</span>
                            <button class="btn-toggle" data-id="${todo.id}">
                                ${todo.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button class="btn-delete" data-id="${todo.id}">Delete</button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            
            if (e.target.classList.contains('btn-add')) {
                const input = this.container.querySelector('input');
                this.addTodo(input.value);
                input.value = '';
            } else if (e.target.classList.contains('btn-toggle')) {
                this.toggleTodo(id);
            } else if (e.target.classList.contains('btn-delete')) {
                this.deleteTodo(id);
            }
        });
        
        this.container.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                const input = e.target;
                this.addTodo(input.value);
                input.value = '';
            }
        });
    }
}

// TODO: Convert to React
function TodoList() {
    // TODO: Implement React version
    // Requirements:
    // 1. Use useState for todos array
    // 2. Use useState for input value
    // 3. Implement addTodo, toggleTodo, deleteTodo functions
    // 4. Create separate TodoItem component
    // 5. Handle form submission and enter key
}

function TodoItem({ todo, onToggle, onDelete }) {
    // TODO: Implement TodoItem component
    // Requirements:
    // 1. Display todo text with conditional styling
    // 2. Toggle and delete buttons with proper handlers
    // 3. Apply completed class conditionally
}

// TODO: Convert to Vue.js
// <template>
//   <!-- TODO: Implement Vue template -->
//   <!-- Requirements: -->
//   <!-- 1. Input field with v-model -->
//   <!-- 2. Add button and enter key handling -->
//   <!-- 3. List of todos with v-for -->
//   <!-- 4. Toggle and delete buttons for each todo -->
//   <!-- 5. Conditional styling for completed todos -->
// </template>
// 
// <script setup>
// // TODO: Implement Vue composition API version
// // Requirements:
// // 1. Use ref for todos array and input value
// // 2. Implement addTodo, toggleTodo, deleteTodo functions
// // 3. Handle form submission
// </script>
```

### Exercise 2: State Management Comparison
Compare different state management approaches across vanilla JS, React, and Vue.

```javascript
// TODO: Implement a shopping cart with the following features:
// 1. Add items to cart
// 2. Remove items from cart
// 3. Update item quantities
// 4. Calculate total price
// 5. Apply discounts
// 6. Persist cart to localStorage

// Vanilla JavaScript approach
class ShoppingCart {
    constructor() {
        this.items = this.loadFromStorage();
        this.listeners = [];
    }
    
    // TODO: Implement all cart methods
    addItem(product, quantity = 1) {
        // TODO: Add item to cart
    }
    
    removeItem(productId) {
        // TODO: Remove item from cart
    }
    
    updateQuantity(productId, quantity) {
        // TODO: Update item quantity
    }
    
    getTotal() {
        // TODO: Calculate total price
    }
    
    // TODO: Add more methods
}

// TODO: React approach with Context API
const CartContext = React.createContext();

function CartProvider({ children }) {
    // TODO: Implement cart state and methods
    // Use useReducer for complex state management
}

function useCart() {
    // TODO: Custom hook to use cart context
}

// TODO: Vue approach with Pinia
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        // TODO: Define cart state
    }),
    
    getters: {
        // TODO: Define computed properties
    },
    
    actions: {
        // TODO: Define cart actions
    }
});
```

### Exercise 3: Event Handling Patterns
Compare event handling approaches across frameworks.

```javascript
// TODO: Build a form with complex validation and event handling

// Requirements:
// 1. Real-time validation as user types
// 2. Submit handling with async validation
// 3. Error display and clearing
// 4. Loading states
// 5. Success/error feedback

// Vanilla JavaScript approach
class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = {};
        this.isSubmitting = false;
        this.setupEventListeners();
    }
    
    // TODO: Implement validation methods
    validateField(field, value) {
        // TODO: Validate individual field
    }
    
    validateForm() {
        // TODO: Validate entire form
    }
    
    handleSubmit(e) {
        // TODO: Handle form submission
    }
    
    // TODO: Add more methods
}

// TODO: React approach with custom hooks
function useFormValidation(initialValues, validationRules) {
    // TODO: Implement form validation hook
    // Return: values, errors, handleChange, handleSubmit, isSubmitting
}

function ContactForm() {
    // TODO: Use the custom hook
    // Implement form with validation
}

// TODO: Vue approach with composables
function useFormValidation(initialValues, validationRules) {
    // TODO: Implement Vue composable for form validation
    // Return reactive values and methods
}

// <template>
//   <!-- TODO: Implement Vue form template -->
// </template>
// 
// <script setup>
// // TODO: Use the composable
// </script>
```

### Exercise 4: Component Communication
Implement parent-child and sibling component communication.

```javascript
// TODO: Build a product catalog with the following components:
// 1. ProductCatalog (parent)
// 2. ProductFilter (child)
// 3. ProductList (child)
// 4. ProductItem (grandchild)
// 5. ShoppingCart (sibling)

// Requirements:
// 1. Filter products by category, price, rating
// 2. Add products to cart from product items
// 3. Update cart count in header
// 4. Share state between components

// TODO: React approach
function ProductCatalog() {
    // TODO: Implement parent component
    // Manage products, filters, and cart state
    // Pass props to children
    // Handle callbacks from children
}

function ProductFilter({ filters, onFilterChange }) {
    // TODO: Implement filter component
    // Emit filter changes to parent
}

function ProductList({ products, onAddToCart }) {
    // TODO: Implement product list
    // Render ProductItem components
}

function ProductItem({ product, onAddToCart }) {
    // TODO: Implement individual product
    // Handle add to cart action
}

// TODO: Vue approach
// <template>
//   <!-- TODO: Implement Vue template structure -->
// </template>
// 
// <script setup>
// // TODO: Implement Vue component communication
// // Use props, emits, and provide/inject as needed
// </script>
```

### Exercise 5: Lifecycle and Effects
Compare lifecycle management across frameworks.

```javascript
// TODO: Build a data dashboard that:
// 1. Fetches data on component mount
// 2. Updates data every 30 seconds
// 3. Handles loading and error states
// 4. Cleans up timers on unmount
// 5. Refetches data when filters change

// Vanilla JavaScript approach
class DataDashboard {
    constructor(container) {
        this.container = container;
        this.data = null;
        this.loading = false;
        this.error = null;
        this.updateInterval = null;
        this.filters = {};
        
        this.init();
    }
    
    async init() {
        // TODO: Initialize component
        await this.fetchData();
        this.startAutoUpdate();
        this.setupEventListeners();
    }
    
    async fetchData() {
        // TODO: Fetch data with error handling
    }
    
    startAutoUpdate() {
        // TODO: Set up auto-refresh
    }
    
    destroy() {
        // TODO: Cleanup timers and listeners
    }
    
    // TODO: Add more methods
}

// TODO: React approach with useEffect
function DataDashboard() {
    // TODO: Implement with hooks
    // Use useEffect for:
    // 1. Initial data fetch
    // 2. Auto-refresh timer
    // 3. Cleanup
    // 4. Filter changes
}

// TODO: Vue approach with lifecycle hooks
// <script setup>
// import { ref, onMounted, onUnmounted, watch } from 'vue'
// 
// // TODO: Implement Vue lifecycle management
// // Use onMounted, onUnmounted, watch for reactive updates
// </script>
```

---

## 🚀 Intermediate Level

### Exercise 6: Routing Implementation
Implement client-side routing in each framework.

```javascript
// TODO: Build a multi-page application with:
// 1. Home page
// 2. Products page with category filtering
// 3. Product detail page
// 4. Cart page
// 5. User profile page
// 6. 404 page

// Requirements:
// 1. URL-based navigation
// 2. Route parameters and query strings
// 3. Route guards/protection
// 4. Nested routes
// 5. Programmatic navigation

// TODO: Vanilla JavaScript router
class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.init();
    }
    
    addRoute(path, component) {
        // TODO: Add route with pattern matching
    }
    
    navigate(path) {
        // TODO: Navigate to route
    }
    
    // TODO: Implement router methods
}

// TODO: React with React Router
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

function App() {
    // TODO: Set up React Router
    // Implement all routes with proper components
}

// TODO: Vue with Vue Router
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    // TODO: Define all routes
];

export default createRouter({
    history: createWebHistory(),
    routes
});
```

### Exercise 7: Advanced State Management
Implement complex state management patterns.

```javascript
// TODO: Build a collaborative todo app with:
// 1. Multiple users
// 2. Real-time updates
// 3. Optimistic updates
// 4. Conflict resolution
// 5. Offline support

// TODO: React with Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// TODO: Define async thunks for API calls
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (userId) => {
        // TODO: Implement API call
    }
);

// TODO: Create todo slice
const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        // TODO: Define initial state
    },
    reducers: {
        // TODO: Define synchronous actions
    },
    extraReducers: (builder) => {
        // TODO: Handle async actions
    }
});

// TODO: Vue with Pinia
export const useTodoStore = defineStore('todos', {
    state: () => ({
        // TODO: Define state
    }),
    
    getters: {
        // TODO: Define getters
    },
    
    actions: {
        // TODO: Define actions including async ones
    }
});
```

### Exercise 8: Performance Optimization
Implement performance optimization techniques.

```javascript
// TODO: Optimize a large list application with:
// 1. Virtual scrolling
// 2. Memoization
// 3. Lazy loading
// 4. Code splitting
// 5. Bundle optimization

// TODO: React optimization
import { memo, useMemo, useCallback, lazy, Suspense } from 'react';

// TODO: Memoized component
const ProductItem = memo(({ product, onAddToCart }) => {
    // TODO: Implement optimized component
});

// TODO: Virtual scrolling hook
function useVirtualScrolling(items, itemHeight, containerHeight) {
    // TODO: Implement virtual scrolling logic
}

// TODO: Lazy loaded component
const LazyProductDetail = lazy(() => import('./ProductDetail'));

// TODO: Vue optimization
// <script setup>
// import { computed, defineAsyncComponent } from 'vue'
// 
// // TODO: Implement Vue performance optimizations
// // Use computed, defineAsyncComponent, v-memo
// </script>
```

### Exercise 9: Testing Strategies
Implement comprehensive testing for each framework.

```javascript
// TODO: Write tests for todo application covering:
// 1. Unit tests for components
// 2. Integration tests for user flows
// 3. API mocking
// 4. User interaction testing
// 5. Accessibility testing

// TODO: React testing with Testing Library
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TodoApp', () => {
    test('adds a new todo', async () => {
        // TODO: Test todo addition
    });
    
    test('toggles todo completion', async () => {
        // TODO: Test todo toggle
    });
    
    test('deletes a todo', async () => {
        // TODO: Test todo deletion
    });
    
    // TODO: Add more tests
});

// TODO: Vue testing with Vue Test Utils
import { mount } from '@vue/test-utils';

describe('TodoApp', () => {
    test('adds a new todo', async () => {
        // TODO: Test todo addition
    });
    
    // TODO: Add more tests
});
```

### Exercise 10: Framework Migration
Plan and execute a migration from one framework to another.

```javascript
// TODO: Migrate a React application to Vue.js (or vice versa)
// 1. Analyze existing application structure
// 2. Create migration plan
// 3. Identify reusable business logic
// 4. Implement gradual migration strategy
// 5. Maintain feature parity
// 6. Test thoroughly

// Migration checklist:
const migrationPlan = {
    phase1: {
        tasks: [
            'Set up new framework project',
            'Migrate shared utilities and constants',
            'Create component mapping strategy',
            'Set up testing framework'
        ]
    },
    phase2: {
        tasks: [
            'Migrate leaf components first',
            'Convert state management',
            'Implement routing',
            'Migrate API layer'
        ]
    },
    phase3: {
        tasks: [
            'Migrate complex components',
            'Implement advanced features',
            'Performance optimization',
            'Final testing and deployment'
        ]
    }
};

// TODO: Document lessons learned and best practices
```

---

## 🔥 Advanced Level

### Exercise 11: Custom Framework Features
Build custom solutions that work across frameworks.

```javascript
// TODO: Create a custom form validation library that works with:
// 1. Vanilla JavaScript
// 2. React
// 3. Vue.js

// Framework-agnostic core
class FormValidator {
    constructor(rules) {
        this.rules = rules;
        this.errors = {};
        this.values = {};
    }
    
    // TODO: Implement validation logic
}

// TODO: React integration
function useFormValidator(rules) {
    // TODO: Create React hook wrapper
}

// TODO: Vue integration
function useFormValidator(rules) {
    // TODO: Create Vue composable wrapper
}
```

### Exercise 12: Micro-Frontend Architecture
Implement micro-frontend patterns.

```javascript
// TODO: Build a micro-frontend system where:
// 1. Shell app manages routing and layout
// 2. React micro-frontend handles user management
// 3. Vue micro-frontend handles product catalog
// 4. Vanilla JS micro-frontend handles checkout

// TODO: Implement module federation or single-spa approach
```

---

## 🧪 Testing Your Solutions

For each exercise, ensure:

1. **Functionality** - All features work correctly
2. **Performance** - Optimized for production use
3. **Accessibility** - Follows accessibility guidelines
4. **Testing** - Comprehensive test coverage
5. **Documentation** - Clear setup and usage instructions

## 💡 Hints

- Start with simple conversions before tackling complex features
- Focus on understanding the mental model of each framework
- Pay attention to the different ways of handling state and events
- Practice the idiomatic patterns of each framework
- Don't try to force vanilla JS patterns into frameworks

## 🎯 Success Criteria

You've mastered framework fundamentals when you can:
- ✅ Convert vanilla JavaScript applications to React and Vue
- ✅ Choose the appropriate framework for different project types
- ✅ Implement proper state management patterns
- ✅ Handle component communication effectively
- ✅ Apply performance optimization techniques
- ✅ Write comprehensive tests for framework applications
- ✅ Plan and execute framework migrations

Congratulations on completing the JavaScript Zero to Hero course! You now have the skills to build modern web applications with vanilla JavaScript and popular frameworks.

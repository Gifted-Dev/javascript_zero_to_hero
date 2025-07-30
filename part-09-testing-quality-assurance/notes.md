# Part 9: Testing & Quality Assurance - Complete Guide
## Master Testing Strategies and Code Quality Practices

Welcome to the testing and quality assurance part! This section covers everything you need to know about writing reliable, maintainable code through comprehensive testing strategies and quality assurance practices.

## 📚 Table of Contents

1. [Introduction to Testing](#introduction-to-testing)
2. [Unit Testing with Jest](#unit-testing-with-jest)
3. [Integration Testing](#integration-testing)
4. [End-to-End Testing](#end-to-end-testing)
5. [Test-Driven Development (TDD)](#test-driven-development-tdd)
6. [Code Quality Tools](#code-quality-tools)
7. [Testing Best Practices](#testing-best-practices)
8. [Continuous Integration](#continuous-integration)
9. [Performance Testing](#performance-testing)
10. [Quality Assurance Workflows](#quality-assurance-workflows)

---

## 1. Introduction to Testing

### Why Testing Matters

```javascript
// Without tests - fragile code
function calculateTotal(items) {
    let total = 0;
    for (let item of items) {
        total += item.price * item.quantity;
    }
    return total;
}

// What happens when items is null? undefined? empty?
// What if item.price is a string? What if quantity is negative?
// Without tests, we don't know if our code handles edge cases!

// With tests - robust code
function calculateTotal(items) {
    if (!Array.isArray(items)) {
        throw new Error('Items must be an array');
    }
    
    return items.reduce((total, item) => {
        if (typeof item.price !== 'number' || item.price < 0) {
            throw new Error('Item price must be a non-negative number');
        }
        if (typeof item.quantity !== 'number' || item.quantity < 0) {
            throw new Error('Item quantity must be a non-negative number');
        }
        
        return total + (item.price * item.quantity);
    }, 0);
}
```

### Types of Testing

```javascript
// 1. Unit Tests - Test individual functions/components
describe('calculateTotal', () => {
    test('calculates total for valid items', () => {
        const items = [
            { price: 10, quantity: 2 },
            { price: 5, quantity: 3 }
        ];
        expect(calculateTotal(items)).toBe(35);
    });
});

// 2. Integration Tests - Test component interactions
describe('ShoppingCart Integration', () => {
    test('adding items updates total correctly', () => {
        const cart = new ShoppingCart();
        cart.addItem({ id: 1, price: 10, quantity: 2 });
        cart.addItem({ id: 2, price: 5, quantity: 1 });
        
        expect(cart.getTotal()).toBe(25);
        expect(cart.getItemCount()).toBe(2);
    });
});

// 3. End-to-End Tests - Test complete user workflows
describe('E-commerce Checkout Flow', () => {
    test('user can complete purchase', async () => {
        await page.goto('/products');
        await page.click('[data-testid="add-to-cart-1"]');
        await page.click('[data-testid="cart-icon"]');
        await page.click('[data-testid="checkout-button"]');
        await page.fill('[data-testid="email"]', 'test@example.com');
        await page.click('[data-testid="place-order"]');
        
        await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    });
});
```

### Testing Pyramid

```javascript
// Testing Pyramid - More unit tests, fewer E2E tests
//
//        /\
//       /  \     E2E Tests (Few, Slow, Expensive)
//      /____\    
//     /      \   Integration Tests (Some, Medium)
//    /________\  
//   /          \ Unit Tests (Many, Fast, Cheap)
//  /__________\

// Unit Tests: 70%
// Integration Tests: 20%
// E2E Tests: 10%

// Example test distribution for a shopping cart:
// Unit Tests (70%):
// - calculateTotal()
// - addItem()
// - removeItem()
// - validateItem()
// - formatPrice()

// Integration Tests (20%):
// - ShoppingCart + LocalStorage
// - ShoppingCart + API
// - Cart + Checkout flow

// E2E Tests (10%):
// - Complete purchase flow
// - User registration and login
// - Critical business workflows
```

---

## 2. Unit Testing with Jest

### Jest Setup and Configuration

```javascript
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "@testing-library/jest-dom": "^5.16.0"
  }
}

// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx}'
  ]
};

// src/setupTests.js
import '@testing-library/jest-dom';

// Global test utilities
global.mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: global.mockLocalStorage
});
```

### Writing Effective Unit Tests

```javascript
// src/utils/math.js
export function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a + b;
}

export function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
}

export function factorial(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// src/utils/__tests__/math.test.js
import { add, divide, factorial } from '../math';

describe('Math utilities', () => {
    describe('add', () => {
        test('adds two positive numbers correctly', () => {
            expect(add(2, 3)).toBe(5);
        });
        
        test('adds negative numbers correctly', () => {
            expect(add(-2, -3)).toBe(-5);
            expect(add(-2, 3)).toBe(1);
        });
        
        test('adds zero correctly', () => {
            expect(add(0, 5)).toBe(5);
            expect(add(5, 0)).toBe(5);
        });
        
        test('adds decimal numbers correctly', () => {
            expect(add(0.1, 0.2)).toBeCloseTo(0.3);
        });
        
        test('throws error for non-number inputs', () => {
            expect(() => add('2', 3)).toThrow('Both arguments must be numbers');
            expect(() => add(2, null)).toThrow('Both arguments must be numbers');
            expect(() => add(undefined, 3)).toThrow('Both arguments must be numbers');
        });
    });
    
    describe('divide', () => {
        test('divides numbers correctly', () => {
            expect(divide(10, 2)).toBe(5);
            expect(divide(7, 2)).toBe(3.5);
        });
        
        test('handles negative numbers', () => {
            expect(divide(-10, 2)).toBe(-5);
            expect(divide(10, -2)).toBe(-5);
            expect(divide(-10, -2)).toBe(5);
        });
        
        test('throws error for division by zero', () => {
            expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
        });
        
        test('throws error for non-number inputs', () => {
            expect(() => divide('10', 2)).toThrow('Both arguments must be numbers');
        });
    });
    
    describe('factorial', () => {
        test('calculates factorial correctly', () => {
            expect(factorial(0)).toBe(1);
            expect(factorial(1)).toBe(1);
            expect(factorial(5)).toBe(120);
            expect(factorial(10)).toBe(3628800);
        });
        
        test('throws error for negative numbers', () => {
            expect(() => factorial(-1)).toThrow('Input must be a non-negative integer');
        });
        
        test('throws error for non-integers', () => {
            expect(() => factorial(3.5)).toThrow('Input must be a non-negative integer');
            expect(() => factorial('5')).toThrow('Input must be a non-negative integer');
        });
    });
});
```

### Testing Asynchronous Code

```javascript
// src/services/api.js
export class APIService {
    constructor(baseURL = 'https://api.example.com') {
        this.baseURL = baseURL;
    }
    
    async fetchUser(id) {
        if (!id) {
            throw new Error('User ID is required');
        }
        
        const response = await fetch(`${this.baseURL}/users/${id}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('User not found');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    }
    
    async createUser(userData) {
        if (!userData || !userData.email) {
            throw new Error('User data with email is required');
        }
        
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error(`Failed to create user: ${response.status}`);
        }
        
        return response.json();
    }
}

// src/services/__tests__/api.test.js
import { APIService } from '../api';

// Mock fetch globally
global.fetch = jest.fn();

describe('APIService', () => {
    let apiService;
    
    beforeEach(() => {
        apiService = new APIService();
        fetch.mockClear();
    });
    
    describe('fetchUser', () => {
        test('fetches user successfully', async () => {
            const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
            
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser
            });
            
            const user = await apiService.fetchUser(1);
            
            expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
            expect(user).toEqual(mockUser);
        });
        
        test('throws error when user not found', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 404
            });
            
            await expect(apiService.fetchUser(999)).rejects.toThrow('User not found');
        });
        
        test('throws error for server error', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 500
            });
            
            await expect(apiService.fetchUser(1)).rejects.toThrow('HTTP error! status: 500');
        });
        
        test('throws error when ID is not provided', async () => {
            await expect(apiService.fetchUser()).rejects.toThrow('User ID is required');
            await expect(apiService.fetchUser(null)).rejects.toThrow('User ID is required');
        });
        
        test('handles network errors', async () => {
            fetch.mockRejectedValueOnce(new Error('Network error'));
            
            await expect(apiService.fetchUser(1)).rejects.toThrow('Network error');
        });
    });
    
    describe('createUser', () => {
        test('creates user successfully', async () => {
            const userData = { name: 'Jane Doe', email: 'jane@example.com' };
            const createdUser = { id: 2, ...userData };
            
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => createdUser
            });
            
            const result = await apiService.createUser(userData);
            
            expect(fetch).toHaveBeenCalledWith('https://api.example.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            expect(result).toEqual(createdUser);
        });
        
        test('throws error when userData is invalid', async () => {
            await expect(apiService.createUser()).rejects.toThrow('User data with email is required');
            await expect(apiService.createUser({})).rejects.toThrow('User data with email is required');
            await expect(apiService.createUser({ name: 'John' })).rejects.toThrow('User data with email is required');
        });
        
        test('throws error when creation fails', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 400
            });
            
            const userData = { name: 'Jane', email: 'jane@example.com' };
            await expect(apiService.createUser(userData)).rejects.toThrow('Failed to create user: 400');
        });
    });
});
```

### Mocking and Spies

```javascript
// src/services/logger.js
export class Logger {
    constructor(level = 'info') {
        this.level = level;
        this.logs = [];
    }
    
    log(message, level = 'info') {
        const logEntry = {
            message,
            level,
            timestamp: new Date().toISOString()
        };
        
        this.logs.push(logEntry);
        
        if (this.shouldLog(level)) {
            console.log(`[${level.toUpperCase()}] ${message}`);
        }
    }
    
    error(message) {
        this.log(message, 'error');
    }
    
    warn(message) {
        this.log(message, 'warn');
    }
    
    info(message) {
        this.log(message, 'info');
    }
    
    debug(message) {
        this.log(message, 'debug');
    }
    
    shouldLog(level) {
        const levels = { debug: 0, info: 1, warn: 2, error: 3 };
        return levels[level] >= levels[this.level];
    }
    
    getLogs() {
        return [...this.logs];
    }
    
    clearLogs() {
        this.logs = [];
    }
}

// src/services/__tests__/logger.test.js
import { Logger } from '../logger';

describe('Logger', () => {
    let logger;
    let consoleSpy;
    
    beforeEach(() => {
        logger = new Logger();
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });
    
    afterEach(() => {
        consoleSpy.mockRestore();
    });
    
    test('logs messages with correct format', () => {
        logger.info('Test message');
        
        expect(consoleSpy).toHaveBeenCalledWith('[INFO] Test message');
    });
    
    test('stores log entries', () => {
        logger.info('Test message');
        
        const logs = logger.getLogs();
        expect(logs).toHaveLength(1);
        expect(logs[0]).toMatchObject({
            message: 'Test message',
            level: 'info'
        });
        expect(logs[0].timestamp).toBeDefined();
    });
    
    test('respects log level filtering', () => {
        const warnLogger = new Logger('warn');
        
        warnLogger.debug('Debug message');
        warnLogger.info('Info message');
        warnLogger.warn('Warn message');
        warnLogger.error('Error message');
        
        expect(consoleSpy).toHaveBeenCalledTimes(2);
        expect(consoleSpy).toHaveBeenCalledWith('[WARN] Warn message');
        expect(consoleSpy).toHaveBeenCalledWith('[ERROR] Error message');
    });
    
    test('convenience methods work correctly', () => {
        logger.error('Error message');
        logger.warn('Warning message');
        logger.debug('Debug message');
        
        const logs = logger.getLogs();
        expect(logs).toHaveLength(3);
        expect(logs[0].level).toBe('error');
        expect(logs[1].level).toBe('warn');
        expect(logs[2].level).toBe('debug');
    });
    
    test('can clear logs', () => {
        logger.info('Message 1');
        logger.info('Message 2');
        
        expect(logger.getLogs()).toHaveLength(2);
        
        logger.clearLogs();
        
        expect(logger.getLogs()).toHaveLength(0);
    });
});
```

---

## 3. Integration Testing

### Testing Component Interactions

```javascript
// src/components/ShoppingCart.js
import { Logger } from '../services/logger.js';
import { APIService } from '../services/api.js';

export class ShoppingCart {
    constructor(apiService = new APIService(), logger = new Logger()) {
        this.items = [];
        this.apiService = apiService;
        this.logger = logger;
    }

    addItem(product, quantity = 1) {
        if (!product || !product.id) {
            throw new Error('Product must have an ID');
        }

        if (quantity <= 0) {
            throw new Error('Quantity must be positive');
        }

        const existingItem = this.items.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
            this.logger.info(`Updated quantity for product ${product.id}`);
        } else {
            this.items.push({ product, quantity });
            this.logger.info(`Added product ${product.id} to cart`);
        }

        this.saveToStorage();
    }

    removeItem(productId) {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.product.id !== productId);

        if (this.items.length < initialLength) {
            this.logger.info(`Removed product ${productId} from cart`);
            this.saveToStorage();
        }
    }

    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeItem(productId);
            return;
        }

        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
            this.logger.info(`Updated quantity for product ${productId} to ${quantity}`);
            this.saveToStorage();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    async checkout() {
        if (this.items.length === 0) {
            throw new Error('Cart is empty');
        }

        try {
            this.logger.info('Starting checkout process');

            const orderData = {
                items: this.items.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price
                })),
                total: this.getTotal()
            };

            const order = await this.apiService.createOrder(orderData);

            this.items = [];
            this.saveToStorage();

            this.logger.info(`Checkout completed. Order ID: ${order.id}`);
            return order;
        } catch (error) {
            this.logger.error(`Checkout failed: ${error.message}`);
            throw error;
        }
    }

    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('cart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }
}

// src/components/__tests__/ShoppingCart.integration.test.js
import { ShoppingCart } from '../ShoppingCart';
import { APIService } from '../../services/api';
import { Logger } from '../../services/logger';

// Mock the API service
jest.mock('../../services/api');

describe('ShoppingCart Integration Tests', () => {
    let cart;
    let mockApiService;
    let mockLogger;

    beforeEach(() => {
        // Create mock instances
        mockApiService = new APIService();
        mockLogger = new Logger();

        // Mock API methods
        mockApiService.createOrder = jest.fn();

        // Mock logger methods
        mockLogger.info = jest.fn();
        mockLogger.error = jest.fn();

        // Create cart with mocked dependencies
        cart = new ShoppingCart(mockApiService, mockLogger);

        // Clear localStorage
        localStorage.clear();
    });

    describe('Cart operations with logging', () => {
        test('adding items logs correctly', () => {
            const product = { id: 1, name: 'Test Product', price: 10 };

            cart.addItem(product, 2);

            expect(mockLogger.info).toHaveBeenCalledWith('Added product 1 to cart');
        });

        test('updating existing item logs correctly', () => {
            const product = { id: 1, name: 'Test Product', price: 10 };

            cart.addItem(product, 1);
            cart.addItem(product, 2);

            expect(mockLogger.info).toHaveBeenCalledWith('Added product 1 to cart');
            expect(mockLogger.info).toHaveBeenCalledWith('Updated quantity for product 1');
        });

        test('removing items logs correctly', () => {
            const product = { id: 1, name: 'Test Product', price: 10 };
            cart.addItem(product);

            cart.removeItem(1);

            expect(mockLogger.info).toHaveBeenCalledWith('Removed product 1 from cart');
        });
    });

    describe('Cart persistence', () => {
        test('saves to localStorage when items are added', () => {
            const product = { id: 1, name: 'Test Product', price: 10 };

            cart.addItem(product, 2);

            const stored = JSON.parse(localStorage.getItem('cart'));
            expect(stored).toHaveLength(1);
            expect(stored[0]).toMatchObject({
                product,
                quantity: 2
            });
        });

        test('loads from localStorage correctly', () => {
            const items = [
                { product: { id: 1, name: 'Product 1', price: 10 }, quantity: 2 },
                { product: { id: 2, name: 'Product 2', price: 15 }, quantity: 1 }
            ];

            localStorage.setItem('cart', JSON.stringify(items));

            cart.loadFromStorage();

            expect(cart.getItemCount()).toBe(3);
            expect(cart.getTotal()).toBe(35);
        });

        test('clears localStorage after successful checkout', async () => {
            const product = { id: 1, name: 'Test Product', price: 10 };
            cart.addItem(product, 2);

            mockApiService.createOrder.mockResolvedValue({ id: 'order-123' });

            await cart.checkout();

            expect(localStorage.getItem('cart')).toBe('[]');
        });
    });

    describe('Checkout integration', () => {
        test('successful checkout calls API and logs', async () => {
            const product1 = { id: 1, name: 'Product 1', price: 10 };
            const product2 = { id: 2, name: 'Product 2', price: 15 };

            cart.addItem(product1, 2);
            cart.addItem(product2, 1);

            const mockOrder = { id: 'order-123', total: 35 };
            mockApiService.createOrder.mockResolvedValue(mockOrder);

            const result = await cart.checkout();

            expect(mockApiService.createOrder).toHaveBeenCalledWith({
                items: [
                    { productId: 1, quantity: 2, price: 10 },
                    { productId: 2, quantity: 1, price: 15 }
                ],
                total: 35
            });

            expect(mockLogger.info).toHaveBeenCalledWith('Starting checkout process');
            expect(mockLogger.info).toHaveBeenCalledWith('Checkout completed. Order ID: order-123');

            expect(result).toEqual(mockOrder);
            expect(cart.getItemCount()).toBe(0);
        });

        test('failed checkout logs error and preserves cart', async () => {
            const product = { id: 1, name: 'Test Product', price: 10 };
            cart.addItem(product, 2);

            const error = new Error('Payment failed');
            mockApiService.createOrder.mockRejectedValue(error);

            await expect(cart.checkout()).rejects.toThrow('Payment failed');

            expect(mockLogger.error).toHaveBeenCalledWith('Checkout failed: Payment failed');
            expect(cart.getItemCount()).toBe(2); // Cart should not be cleared
        });

        test('cannot checkout empty cart', async () => {
            await expect(cart.checkout()).rejects.toThrow('Cart is empty');

            expect(mockApiService.createOrder).not.toHaveBeenCalled();
        });
    });
});
```

---

## 4. End-to-End Testing

### Cypress E2E Testing

```javascript
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: true,
        screenshotOnRunFailure: true,
        defaultCommandTimeout: 10000,
        requestTimeout: 10000,
        responseTimeout: 10000,
        env: {
            apiUrl: 'http://localhost:8080/api'
        }
    }
});

// cypress/support/commands.js
// Custom commands for reusable test actions
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('addToCart', (productId, quantity = 1) => {
    cy.get(`[data-testid="product-${productId}"]`).within(() => {
        if (quantity > 1) {
            cy.get('[data-testid="quantity-input"]').clear().type(quantity.toString());
        }
        cy.get('[data-testid="add-to-cart"]').click();
    });
});

Cypress.Commands.add('clearCart', () => {
    cy.window().then((win) => {
        win.localStorage.removeItem('cart');
    });
});

// cypress/e2e/shopping-cart.cy.js
describe('Shopping Cart E2E Tests', () => {
    beforeEach(() => {
        cy.clearCart();
        cy.visit('/products');
    });

    it('should add products to cart and display correct total', () => {
        // Add first product
        cy.addToCart(1, 2);

        // Verify cart icon shows item count
        cy.get('[data-testid="cart-count"]').should('contain', '2');

        // Add second product
        cy.addToCart(2, 1);

        // Verify cart count updated
        cy.get('[data-testid="cart-count"]').should('contain', '3');

        // Open cart
        cy.get('[data-testid="cart-icon"]').click();

        // Verify cart contents
        cy.get('[data-testid="cart-item"]').should('have.length', 2);
        cy.get('[data-testid="cart-total"]').should('contain', '$35.00');
    });

    it('should complete checkout process', () => {
        // Add products to cart
        cy.addToCart(1, 2);
        cy.addToCart(2, 1);

        // Go to cart
        cy.get('[data-testid="cart-icon"]').click();

        // Proceed to checkout
        cy.get('[data-testid="checkout-button"]').click();

        // Fill checkout form
        cy.get('[data-testid="email-input"]').type('test@example.com');
        cy.get('[data-testid="name-input"]').type('John Doe');
        cy.get('[data-testid="address-input"]').type('123 Main St');
        cy.get('[data-testid="city-input"]').type('Anytown');
        cy.get('[data-testid="zip-input"]').type('12345');

        // Fill payment information
        cy.get('[data-testid="card-number"]').type('4111111111111111');
        cy.get('[data-testid="expiry"]').type('12/25');
        cy.get('[data-testid="cvv"]').type('123');

        // Submit order
        cy.get('[data-testid="place-order"]').click();

        // Verify success
        cy.get('[data-testid="success-message"]').should('be.visible');
        cy.get('[data-testid="order-number"]').should('contain', 'Order #');

        // Verify cart is empty
        cy.get('[data-testid="cart-count"]').should('contain', '0');
    });

    it('should handle cart persistence across page reloads', () => {
        // Add items to cart
        cy.addToCart(1, 2);
        cy.addToCart(2, 1);

        // Reload page
        cy.reload();

        // Verify cart persisted
        cy.get('[data-testid="cart-count"]').should('contain', '3');

        // Open cart and verify contents
        cy.get('[data-testid="cart-icon"]').click();
        cy.get('[data-testid="cart-item"]').should('have.length', 2);
    });

    it('should update cart quantities correctly', () => {
        // Add product to cart
        cy.addToCart(1, 1);

        // Open cart
        cy.get('[data-testid="cart-icon"]').click();

        // Update quantity
        cy.get('[data-testid="quantity-input"]').first().clear().type('5');
        cy.get('[data-testid="update-quantity"]').first().click();

        // Verify updated total
        cy.get('[data-testid="cart-total"]').should('contain', '$50.00');
        cy.get('[data-testid="cart-count"]').should('contain', '5');
    });

    it('should remove items from cart', () => {
        // Add multiple products
        cy.addToCart(1, 2);
        cy.addToCart(2, 1);

        // Open cart
        cy.get('[data-testid="cart-icon"]').click();

        // Remove first item
        cy.get('[data-testid="remove-item"]').first().click();

        // Verify item removed
        cy.get('[data-testid="cart-item"]').should('have.length', 1);
        cy.get('[data-testid="cart-total"]').should('contain', '$15.00');
        cy.get('[data-testid="cart-count"]').should('contain', '1');
    });

    it('should handle API errors gracefully', () => {
        // Intercept API call and return error
        cy.intercept('POST', '/api/orders', {
            statusCode: 500,
            body: { error: 'Server error' }
        }).as('createOrder');

        // Add product and proceed to checkout
        cy.addToCart(1, 1);
        cy.get('[data-testid="cart-icon"]').click();
        cy.get('[data-testid="checkout-button"]').click();

        // Fill form and submit
        cy.get('[data-testid="email-input"]').type('test@example.com');
        cy.get('[data-testid="place-order"]').click();

        // Wait for API call
        cy.wait('@createOrder');

        // Verify error message displayed
        cy.get('[data-testid="error-message"]').should('be.visible');
        cy.get('[data-testid="error-message"]').should('contain', 'Unable to process order');

        // Verify cart is not cleared
        cy.get('[data-testid="cart-count"]').should('contain', '1');
    });
});
```

---

## 5. Test-Driven Development (TDD)

### TDD Cycle: Red-Green-Refactor

```javascript
// TDD Example: Building a Password Validator
// Step 1: Write failing test (RED)

// src/utils/__tests__/passwordValidator.test.js
import { PasswordValidator } from '../passwordValidator';

describe('PasswordValidator', () => {
    let validator;

    beforeEach(() => {
        validator = new PasswordValidator();
    });

    // First test - RED phase
    test('should reject passwords shorter than 8 characters', () => {
        const result = validator.validate('short');

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must be at least 8 characters long');
    });
});

// Step 2: Write minimal code to pass (GREEN)
// src/utils/passwordValidator.js
export class PasswordValidator {
    validate(password) {
        const errors = [];

        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

// Step 3: Add more tests (RED)
test('should require at least one uppercase letter', () => {
    const result = validator.validate('lowercase123');

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one uppercase letter');
});

test('should require at least one lowercase letter', () => {
    const result = validator.validate('UPPERCASE123');

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one lowercase letter');
});

test('should require at least one number', () => {
    const result = validator.validate('NoNumbers');

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one number');
});

test('should require at least one special character', () => {
    const result = validator.validate('NoSpecial123');

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one special character');
});

test('should accept valid passwords', () => {
    const result = validator.validate('ValidPass123!');

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
});

// Step 4: Implement features to pass tests (GREEN)
export class PasswordValidator {
    constructor(options = {}) {
        this.minLength = options.minLength || 8;
        this.requireUppercase = options.requireUppercase !== false;
        this.requireLowercase = options.requireLowercase !== false;
        this.requireNumbers = options.requireNumbers !== false;
        this.requireSpecialChars = options.requireSpecialChars !== false;
        this.specialChars = options.specialChars || '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }

    validate(password) {
        const errors = [];

        if (password.length < this.minLength) {
            errors.push(`Password must be at least ${this.minLength} characters long`);
        }

        if (this.requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (this.requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }

        if (this.requireNumbers && !/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }

        if (this.requireSpecialChars && !this.hasSpecialChar(password)) {
            errors.push('Password must contain at least one special character');
        }

        return {
            isValid: errors.length === 0,
            errors,
            strength: this.calculateStrength(password)
        };
    }

    hasSpecialChar(password) {
        return this.specialChars.split('').some(char => password.includes(char));
    }

    calculateStrength(password) {
        let score = 0;

        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (this.hasSpecialChar(password)) score += 1;

        if (score <= 2) return 'weak';
        if (score <= 4) return 'medium';
        return 'strong';
    }
}

// Step 5: Refactor and add more comprehensive tests
describe('PasswordValidator Advanced Features', () => {
    test('should calculate password strength correctly', () => {
        const validator = new PasswordValidator();

        expect(validator.validate('weak').strength).toBe('weak');
        expect(validator.validate('Medium123').strength).toBe('medium');
        expect(validator.validate('StrongPass123!').strength).toBe('strong');
    });

    test('should allow custom configuration', () => {
        const validator = new PasswordValidator({
            minLength: 12,
            requireSpecialChars: false
        });

        const result = validator.validate('LongPassword123');
        expect(result.isValid).toBe(true);
    });

    test('should handle edge cases', () => {
        const validator = new PasswordValidator();

        expect(() => validator.validate(null)).toThrow();
        expect(() => validator.validate(undefined)).toThrow();
        expect(validator.validate('').isValid).toBe(false);
    });
});
```

---

## 6. Code Quality Tools

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true
    },
    extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'plugin:security/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint',
        'jest',
        'security',
        'import'
    ],
    rules: {
        // Error prevention
        'no-console': 'warn',
        'no-debugger': 'error',
        'no-unused-vars': 'error',
        'no-undef': 'error',
        'no-unreachable': 'error',

        // Best practices
        'prefer-const': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-template': 'error',
        'prefer-arrow-callback': 'error',
        'no-duplicate-imports': 'error',

        // Code complexity
        'complexity': ['warn', 10],
        'max-depth': ['warn', 4],
        'max-lines-per-function': ['warn', 50],
        'max-params': ['warn', 4],

        // Import/Export
        'import/order': ['error', {
            'groups': [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'index'
            ],
            'newlines-between': 'always'
        }],
        'import/no-unresolved': 'error',
        'import/no-cycle': 'error',

        // Jest specific
        'jest/expect-expect': 'error',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',

        // Security
        'security/detect-object-injection': 'warn',
        'security/detect-non-literal-regexp': 'warn',
        'security/detect-unsafe-regex': 'error'
    },
    overrides: [
        {
            files: ['**/*.test.js', '**/*.spec.js'],
            env: {
                jest: true
            },
            rules: {
                'no-console': 'off',
                'max-lines-per-function': 'off'
            }
        }
    ]
};

// .prettierrc.js
module.exports = {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'avoid',
    endOfLine: 'lf'
};

// package.json scripts
{
  "scripts": {
    "lint": "eslint src/**/*.{js,jsx,ts,tsx}",
    "lint:fix": "eslint src/**/*.{js,jsx,ts,tsx} --fix",
    "format": "prettier --write src/**/*.{js,jsx,ts,tsx,css,md}",
    "format:check": "prettier --check src/**/*.{js,jsx,ts,tsx,css,md}",
    "quality": "npm run lint && npm run format:check && npm run test",
    "quality:fix": "npm run lint:fix && npm run format && npm run test"
  }
}
```

### SonarQube Integration

```javascript
// sonar-project.properties
sonar.projectKey=javascript-zero-to-hero
sonar.projectName=JavaScript Zero to Hero
sonar.projectVersion=1.0
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.test.js,**/*.spec.js
sonar.exclusions=**/node_modules/**,**/dist/**,**/coverage/**
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.testExecutionReportPaths=coverage/test-reporter.xml

// Quality gates configuration
const qualityGates = {
    coverage: {
        overall: 80,
        new: 85
    },
    duplicatedLines: {
        overall: 3,
        new: 3
    },
    maintainabilityRating: 'A',
    reliabilityRating: 'A',
    securityRating: 'A',
    bugs: 0,
    vulnerabilities: 0,
    codeSmells: {
        overall: 10,
        new: 0
    }
};
```

This comprehensive testing guide provides everything needed to implement professional testing and quality assurance practices. The remaining sections will cover testing best practices, CI/CD integration, and quality workflows.
```

This comprehensive testing guide covers unit testing, integration testing, and E2E testing with practical examples. The remaining sections will cover TDD, code quality tools, and testing best practices.
```

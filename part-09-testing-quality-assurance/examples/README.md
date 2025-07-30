# Part 9 Examples: Testing & Quality Assurance

This folder contains comprehensive examples demonstrating testing strategies, quality assurance practices, and professional development workflows.

## 📂 Files Overview

- **`unit-testing-examples.js`** - Jest unit testing patterns and best practices
- **`integration-testing-examples.js`** - Component integration and API testing
- **`e2e-testing-examples.js`** - Cypress end-to-end testing scenarios
- **`tdd-examples.js`** - Test-driven development workflow examples
- **`mocking-examples.js`** - Advanced mocking and stubbing techniques
- **`quality-tools-config/`** - ESLint, Prettier, and quality tool configurations
- **`ci-cd-examples/`** - Continuous integration and deployment workflows
- **`performance-testing.js`** - Performance and load testing examples

## 🚀 How to Run These Examples

### Prerequisites
```bash
# Node.js (version 16 or higher)
node --version

# Install testing dependencies
npm install --save-dev jest @testing-library/jest-dom cypress eslint prettier
```

### Running Tests
```bash
# Unit tests with Jest
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests with Cypress
npm run cypress:open

# Run all quality checks
npm run quality
```

## 📚 What You'll Learn

### From `unit-testing-examples.js`:
- Writing effective unit tests with Jest
- Testing pure functions and classes
- Mocking dependencies and external services
- Testing asynchronous code and promises
- Snapshot testing for UI components
- Test coverage and reporting

### From `integration-testing-examples.js`:
- Testing component interactions
- API integration testing
- Database testing with test containers
- Testing with real dependencies
- Contract testing between services
- Testing error scenarios and edge cases

### From `e2e-testing-examples.js`:
- Complete user workflow testing
- Cross-browser testing strategies
- Visual regression testing
- Performance testing in E2E
- Testing responsive designs
- Accessibility testing automation

### From `tdd-examples.js`:
- Red-Green-Refactor cycle
- Writing tests before implementation
- Incremental feature development
- Refactoring with confidence
- Test-first design principles
- TDD for complex business logic

### From `mocking-examples.js`:
- Jest mocking strategies
- Stubbing external dependencies
- Spy functions and call verification
- Mock implementations and return values
- Testing with fake timers
- Module mocking patterns

### From `quality-tools-config/`:
- ESLint configuration and custom rules
- Prettier formatting standards
- Pre-commit hooks with Husky
- SonarQube integration
- Code quality metrics
- Automated quality gates

### From `ci-cd-examples/`:
- GitHub Actions workflows
- Automated testing pipelines
- Quality gates and deployment
- Multi-environment testing
- Performance regression detection
- Security scanning automation

### From `performance-testing.js`:
- Load testing with Artillery
- Memory leak detection
- Performance profiling
- Bundle size monitoring
- Core Web Vitals testing
- Performance budgets

## 🎯 Key Concepts Demonstrated

### 1. Testing Pyramid
```javascript
// Unit Tests (70%) - Fast, isolated, many
describe('calculateTotal', () => {
    test('calculates total correctly', () => {
        expect(calculateTotal([{price: 10, qty: 2}])).toBe(20);
    });
});

// Integration Tests (20%) - Medium speed, some dependencies
describe('ShoppingCart', () => {
    test('persists to localStorage', () => {
        const cart = new ShoppingCart();
        cart.addItem({id: 1, price: 10});
        expect(localStorage.getItem('cart')).toBeTruthy();
    });
});

// E2E Tests (10%) - Slow, full system, few
describe('Checkout Flow', () => {
    test('completes purchase', () => {
        cy.visit('/products');
        cy.get('[data-testid="add-to-cart"]').click();
        cy.get('[data-testid="checkout"]').click();
        // ... complete flow
    });
});
```

### 2. Test-Driven Development
```javascript
// 1. Write failing test (RED)
test('should validate email format', () => {
    expect(validateEmail('invalid')).toBe(false);
});

// 2. Write minimal code (GREEN)
function validateEmail(email) {
    return email.includes('@');
}

// 3. Refactor and improve (REFACTOR)
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### 3. Mocking Strategies
```javascript
// Mock external dependencies
jest.mock('./api', () => ({
    fetchUser: jest.fn().mockResolvedValue({id: 1, name: 'John'})
}));

// Spy on methods
const consoleSpy = jest.spyOn(console, 'log');
expect(consoleSpy).toHaveBeenCalledWith('Expected message');

// Mock timers
jest.useFakeTimers();
setTimeout(() => callback(), 1000);
jest.advanceTimersByTime(1000);
expect(callback).toHaveBeenCalled();
```

### 4. Quality Assurance
```javascript
// ESLint rules for quality
module.exports = {
    rules: {
        'complexity': ['error', 10],
        'max-lines-per-function': ['error', 50],
        'no-duplicate-code': 'error',
        'prefer-const': 'error'
    }
};

// Prettier for consistent formatting
module.exports = {
    semi: true,
    singleQuote: true,
    trailingComma: 'es5'
};
```

## 🔧 Testing Tools and Frameworks

### Unit Testing
- **Jest** - JavaScript testing framework
- **Vitest** - Fast unit test runner
- **Mocha + Chai** - Alternative testing stack
- **Testing Library** - Simple testing utilities

### Integration Testing
- **Supertest** - HTTP assertion library
- **Testcontainers** - Integration testing with real services
- **MSW** - Mock Service Worker for API mocking
- **Nock** - HTTP server mocking

### E2E Testing
- **Cypress** - Modern E2E testing framework
- **Playwright** - Cross-browser automation
- **Puppeteer** - Chrome automation
- **WebDriver** - Browser automation standard

### Code Quality
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **SonarQube** - Code quality analysis
- **Husky** - Git hooks automation

## 🧪 Hands-On Exercises

### Exercise 1: Unit Testing Practice
Write comprehensive unit tests for a utility library:
```javascript
// Test these functions with edge cases
function debounce(func, delay) { /* implementation */ }
function throttle(func, limit) { /* implementation */ }
function memoize(func) { /* implementation */ }
```

### Exercise 2: TDD Implementation
Use TDD to build a shopping cart:
1. Write tests for adding items
2. Implement minimal functionality
3. Add tests for removing items
4. Refactor and improve

### Exercise 3: Integration Testing
Test a complete user registration flow:
- Form validation
- API communication
- Database persistence
- Email notification

### Exercise 4: E2E Testing
Create E2E tests for an e-commerce site:
- Product browsing
- Cart management
- Checkout process
- Order confirmation

## 🚨 Common Testing Pitfalls

### 1. Testing Implementation Details
```javascript
// Bad - testing internal implementation
test('should call internal method', () => {
    const spy = jest.spyOn(component, '_internalMethod');
    component.publicMethod();
    expect(spy).toHaveBeenCalled();
});

// Good - testing behavior
test('should update display when data changes', () => {
    component.updateData(newData);
    expect(component.getDisplayValue()).toBe(expectedValue);
});
```

### 2. Flaky Tests
```javascript
// Bad - timing dependent
test('should update after delay', (done) => {
    component.delayedUpdate();
    setTimeout(() => {
        expect(component.value).toBe('updated');
        done();
    }, 100); // Might fail on slow systems
});

// Good - deterministic
test('should update after delay', async () => {
    jest.useFakeTimers();
    component.delayedUpdate();
    jest.advanceTimersByTime(1000);
    expect(component.value).toBe('updated');
});
```

### 3. Over-mocking
```javascript
// Bad - mocking everything
jest.mock('./utils');
jest.mock('./api');
jest.mock('./storage');

// Good - mock only what's necessary
// Test with real implementations when possible
```

## 💡 Best Practices Demonstrated

### 1. **Test Organization**
- Clear test structure with describe/test blocks
- Meaningful test names that describe behavior
- Setup and teardown with beforeEach/afterEach
- Grouping related tests logically

### 2. **Test Quality**
- One assertion per test when possible
- Test both happy path and edge cases
- Use appropriate matchers for clarity
- Avoid testing implementation details

### 3. **Maintainable Tests**
- DRY principle with helper functions
- Page Object Model for E2E tests
- Shared test utilities and fixtures
- Regular test refactoring

### 4. **CI/CD Integration**
- Automated test execution
- Quality gates and thresholds
- Performance regression detection
- Security vulnerability scanning

## 📈 Quality Metrics

### Code Coverage
- **Line Coverage**: 80%+ for production code
- **Branch Coverage**: 75%+ for critical paths
- **Function Coverage**: 90%+ for public APIs
- **Statement Coverage**: 85%+ overall

### Code Quality
- **Cyclomatic Complexity**: < 10 per function
- **Code Duplication**: < 3% overall
- **Technical Debt**: < 30 minutes per 1000 lines
- **Maintainability Index**: > 70

### Performance
- **Test Execution Time**: < 30 seconds for unit tests
- **Build Time**: < 5 minutes for full pipeline
- **Coverage Report**: < 10 seconds generation
- **E2E Tests**: < 10 minutes for critical paths

These examples provide a comprehensive foundation for implementing professional testing and quality assurance practices in JavaScript projects!

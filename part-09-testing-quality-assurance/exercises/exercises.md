# Part 9: Testing & Quality Assurance - Exercises

Master testing strategies and quality assurance practices through hands-on exercises! These exercises cover unit testing, integration testing, E2E testing, TDD, and professional quality assurance workflows.

## 🎯 How to Use These Exercises

1. **Start with unit testing fundamentals** - Build a solid foundation
2. **Practice TDD methodology** - Write tests before implementation
3. **Focus on real-world scenarios** - Test actual application features
4. **Implement quality gates** - Establish professional standards
5. **Compare with solutions** (in `solutions/` folder)

---

## 📚 Basic Level (Must Complete All)

### Exercise 1: Unit Testing Fundamentals
Create comprehensive unit tests for a utility library:

```javascript
// TODO: Write unit tests for these utility functions:

// src/utils/stringUtils.js
export function capitalize(str) {
    // TODO: Implement function that capitalizes first letter
}

export function slugify(str) {
    // TODO: Implement function that converts string to URL-friendly slug
    // Example: "Hello World!" -> "hello-world"
}

export function truncate(str, maxLength, suffix = '...') {
    // TODO: Implement function that truncates string to maxLength
}

export function wordCount(str) {
    // TODO: Implement function that counts words in string
}

export function isPalindrome(str) {
    // TODO: Implement function that checks if string is palindrome
}

// TODO: Write comprehensive tests covering:
// 1. Happy path scenarios
// 2. Edge cases (empty strings, null, undefined)
// 3. Special characters and unicode
// 4. Performance with large strings
// 5. Error conditions

// Test structure should include:
describe('String Utilities', () => {
    describe('capitalize', () => {
        test('capitalizes first letter of lowercase string', () => {
            // TODO: Implement test
        });
        
        test('handles empty string', () => {
            // TODO: Implement test
        });
        
        test('handles null and undefined', () => {
            // TODO: Implement test
        });
        
        // TODO: Add more test cases
    });
    
    // TODO: Add tests for other functions
});
```

### Exercise 2: Async Testing Mastery
Test asynchronous operations and API interactions:

```javascript
// TODO: Create and test an async data service

// src/services/dataService.js
export class DataService {
    constructor(apiUrl = 'https://api.example.com') {
        this.apiUrl = apiUrl;
        this.cache = new Map();
    }
    
    async fetchData(endpoint) {
        // TODO: Implement with caching, error handling, and retries
    }
    
    async postData(endpoint, data) {
        // TODO: Implement POST request with validation
    }
    
    async batchFetch(endpoints) {
        // TODO: Implement parallel fetching with Promise.all
    }
    
    clearCache() {
        // TODO: Implement cache clearing
    }
}

// TODO: Write tests for:
// 1. Successful API calls
// 2. Error handling (network errors, 404, 500)
// 3. Caching behavior
// 4. Retry logic
// 5. Parallel requests
// 6. Request timeouts

// Test examples:
describe('DataService', () => {
    let dataService;
    
    beforeEach(() => {
        // TODO: Setup mocks and service instance
    });
    
    test('fetches data successfully', async () => {
        // TODO: Mock successful API response
        // TODO: Test that data is returned correctly
    });
    
    test('handles network errors', async () => {
        // TODO: Mock network error
        // TODO: Test error handling
    });
    
    test('caches responses', async () => {
        // TODO: Test caching behavior
    });
    
    // TODO: Add more async tests
});
```

### Exercise 3: TDD Implementation
Use Test-Driven Development to build a shopping cart:

```javascript
// TODO: Use TDD to implement a shopping cart
// Follow the Red-Green-Refactor cycle

// Step 1: Write failing tests (RED)
describe('ShoppingCart', () => {
    test('starts with empty cart', () => {
        // TODO: Write test for empty cart initialization
        // This should fail initially
    });
    
    test('adds items to cart', () => {
        // TODO: Write test for adding items
        // This should fail initially
    });
    
    test('calculates total correctly', () => {
        // TODO: Write test for total calculation
        // This should fail initially
    });
    
    test('removes items from cart', () => {
        // TODO: Write test for removing items
        // This should fail initially
    });
    
    test('updates item quantities', () => {
        // TODO: Write test for quantity updates
        // This should fail initially
    });
    
    test('applies discounts', () => {
        // TODO: Write test for discount application
        // This should fail initially
    });
});

// Step 2: Implement minimal code to pass tests (GREEN)
// src/components/ShoppingCart.js
export class ShoppingCart {
    // TODO: Implement minimal functionality to pass tests
    // Start with the simplest implementation
}

// Step 3: Refactor and improve (REFACTOR)
// TODO: After tests pass, refactor for better design
// TODO: Add more tests for edge cases
// TODO: Improve implementation while keeping tests green
```

### Exercise 4: Integration Testing
Test component interactions and data flow:

```javascript
// TODO: Create integration tests for a user registration system

// Components to test together:
// - UserForm (validation and UI)
// - UserService (API calls)
// - EmailService (notifications)
// - DatabaseService (persistence)

describe('User Registration Integration', () => {
    let userForm;
    let userService;
    let emailService;
    let databaseService;
    
    beforeEach(() => {
        // TODO: Setup test environment with real or mock services
    });
    
    test('successful user registration flow', async () => {
        // TODO: Test complete registration process:
        // 1. User fills form
        // 2. Form validates data
        // 3. Service creates user
        // 4. Database stores user
        // 5. Email notification sent
        // 6. Success message displayed
    });
    
    test('handles validation errors', async () => {
        // TODO: Test validation error handling:
        // 1. Invalid email format
        // 2. Weak password
        // 3. Missing required fields
        // 4. Duplicate email
    });
    
    test('handles API failures', async () => {
        // TODO: Test API failure scenarios:
        // 1. Network timeout
        // 2. Server error (500)
        // 3. Service unavailable (503)
        // 4. Rate limiting (429)
    });
    
    test('handles database errors', async () => {
        // TODO: Test database error scenarios:
        // 1. Connection failure
        // 2. Constraint violations
        // 3. Transaction rollback
    });
});
```

### Exercise 5: E2E Testing Setup
Create end-to-end tests for a web application:

```javascript
// TODO: Set up Cypress E2E tests for a todo application

// cypress/e2e/todo-app.cy.js
describe('Todo Application E2E', () => {
    beforeEach(() => {
        // TODO: Setup test data and visit application
        cy.visit('/');
    });
    
    it('should add new todos', () => {
        // TODO: Test adding new todos:
        // 1. Type in todo input
        // 2. Press enter or click add
        // 3. Verify todo appears in list
        // 4. Verify input is cleared
    });
    
    it('should mark todos as complete', () => {
        // TODO: Test completing todos:
        // 1. Add a todo
        // 2. Click checkbox to complete
        // 3. Verify visual state change
        // 4. Verify completed count updates
    });
    
    it('should edit existing todos', () => {
        // TODO: Test editing todos:
        // 1. Add a todo
        // 2. Double-click to edit
        // 3. Change text
        // 4. Press enter to save
        // 5. Verify changes persist
    });
    
    it('should delete todos', () => {
        // TODO: Test deleting todos:
        // 1. Add a todo
        // 2. Click delete button
        // 3. Verify todo is removed
        // 4. Verify count updates
    });
    
    it('should filter todos', () => {
        // TODO: Test filtering functionality:
        // 1. Add multiple todos (some completed)
        // 2. Click "Active" filter
        // 3. Verify only active todos shown
        // 4. Click "Completed" filter
        // 5. Verify only completed todos shown
    });
    
    it('should persist todos across page reloads', () => {
        // TODO: Test persistence:
        // 1. Add todos
        // 2. Reload page
        // 3. Verify todos still exist
    });
});

// TODO: Add custom Cypress commands
// cypress/support/commands.js
Cypress.Commands.add('addTodo', (text) => {
    // TODO: Implement reusable command for adding todos
});

Cypress.Commands.add('completeTodo', (index) => {
    // TODO: Implement reusable command for completing todos
});
```

---

## 🚀 Intermediate Level

### Exercise 6: Advanced Mocking Strategies
Master complex mocking scenarios:

```javascript
// TODO: Implement advanced mocking for a payment processing system

// src/services/paymentProcessor.js
export class PaymentProcessor {
    constructor(paymentGateway, logger, emailService) {
        this.paymentGateway = paymentGateway;
        this.logger = logger;
        this.emailService = emailService;
    }
    
    async processPayment(paymentData) {
        // TODO: Implement payment processing with:
        // 1. Validation
        // 2. Gateway communication
        // 3. Logging
        // 4. Email notifications
        // 5. Error handling
    }
    
    async refundPayment(transactionId, amount) {
        // TODO: Implement refund processing
    }
}

// TODO: Write tests with advanced mocking:
describe('PaymentProcessor Advanced Mocking', () => {
    let paymentProcessor;
    let mockGateway;
    let mockLogger;
    let mockEmailService;
    
    beforeEach(() => {
        // TODO: Create sophisticated mocks with:
        // 1. Method spies
        // 2. Return value mocking
        // 3. Implementation mocking
        // 4. Partial mocking
        // 5. Mock timers
    });
    
    test('processes payment with gateway retry logic', async () => {
        // TODO: Mock gateway to fail first, succeed second
        // TODO: Verify retry behavior
        // TODO: Verify logging calls
    });
    
    test('handles gateway timeout with fallback', async () => {
        // TODO: Mock gateway timeout
        // TODO: Test fallback mechanism
        // TODO: Verify error notifications
    });
    
    test('processes batch payments with concurrency control', async () => {
        // TODO: Mock multiple payment scenarios
        // TODO: Test parallel processing limits
        // TODO: Verify all payments processed
    });
});
```

### Exercise 7: Performance Testing
Implement performance testing and monitoring:

```javascript
// TODO: Create performance tests for critical functions

// src/utils/performanceUtils.js
export function measurePerformance(fn, iterations = 1000) {
    // TODO: Implement performance measurement utility
}

export function memoryUsage() {
    // TODO: Implement memory usage tracking
}

export class PerformanceBenchmark {
    // TODO: Implement benchmarking class
}

// TODO: Write performance tests:
describe('Performance Tests', () => {
    test('array sorting performance', () => {
        // TODO: Test sorting performance with different array sizes
        // TODO: Set performance thresholds
        // TODO: Fail if performance degrades
    });
    
    test('memory usage stays within bounds', () => {
        // TODO: Test memory usage for large operations
        // TODO: Detect memory leaks
        // TODO: Set memory limits
    });
    
    test('API response time benchmarks', async () => {
        // TODO: Test API response times
        // TODO: Set response time thresholds
        // TODO: Test under different loads
    });
});
```

### Exercise 8: Quality Gates Implementation
Set up comprehensive quality gates:

```javascript
// TODO: Configure quality gates and automation

// jest.config.js
module.exports = {
    // TODO: Configure Jest with:
    // 1. Coverage thresholds
    // 2. Test timeout limits
    // 3. Setup and teardown files
    // 4. Custom matchers
    
    coverageThreshold: {
        global: {
            // TODO: Set appropriate thresholds
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};

// .eslintrc.js
module.exports = {
    // TODO: Configure ESLint with:
    // 1. Strict rules for production code
    // 2. Relaxed rules for test files
    // 3. Custom rules for project standards
    // 4. Performance and security rules
};

// TODO: Create quality check script
// scripts/quality-check.js
const { execSync } = require('child_process');

function runQualityChecks() {
    // TODO: Implement quality check pipeline:
    // 1. Linting
    // 2. Type checking
    // 3. Unit tests with coverage
    // 4. Integration tests
    // 5. Security scanning
    // 6. Performance benchmarks
}

// TODO: Create pre-commit hooks
// .husky/pre-commit
#!/bin/sh
# TODO: Run quality checks before commit
```

### Exercise 9: CI/CD Testing Pipeline
Create automated testing pipeline:

```yaml
# TODO: Create GitHub Actions workflow
# .github/workflows/test.yml
name: Test Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    # TODO: Configure complete testing pipeline:
    # 1. Checkout code
    # 2. Setup Node.js
    # 3. Install dependencies
    # 4. Run linting
    # 5. Run unit tests
    # 6. Run integration tests
    # 7. Run E2E tests
    # 8. Generate coverage report
    # 9. Upload coverage to Codecov
    # 10. Run security scan
    # 11. Run performance tests
    # 12. Deploy to staging (if tests pass)
```

### Exercise 10: Test Data Management
Implement comprehensive test data strategies:

```javascript
// TODO: Create test data management system

// src/test-utils/testDataFactory.js
export class TestDataFactory {
    // TODO: Implement factory for generating test data:
    // 1. User data with realistic values
    // 2. Product data with variations
    // 3. Order data with relationships
    // 4. Randomized but deterministic data
    
    static createUser(overrides = {}) {
        // TODO: Generate realistic user data
    }
    
    static createProduct(overrides = {}) {
        // TODO: Generate product data
    }
    
    static createOrder(user, products, overrides = {}) {
        // TODO: Generate order with relationships
    }
}

// src/test-utils/testDatabase.js
export class TestDatabase {
    // TODO: Implement test database utilities:
    // 1. Setup and teardown
    // 2. Data seeding
    // 3. Transaction rollback
    // 4. Isolation between tests
    
    async setup() {
        // TODO: Initialize test database
    }
    
    async teardown() {
        // TODO: Clean up test database
    }
    
    async seed(data) {
        // TODO: Seed test data
    }
}
```

---

## 🔥 Advanced Level

### Exercise 11: Custom Testing Framework
Build a mini testing framework:

```javascript
// TODO: Create a custom testing framework

// src/testing-framework/TestRunner.js
export class TestRunner {
    constructor() {
        // TODO: Initialize test runner with:
        // 1. Test suite management
        // 2. Assertion library
        // 3. Mocking capabilities
        // 4. Reporting system
    }
    
    describe(name, fn) {
        // TODO: Implement test suite grouping
    }
    
    test(name, fn) {
        // TODO: Implement individual test execution
    }
    
    beforeEach(fn) {
        // TODO: Implement setup hooks
    }
    
    afterEach(fn) {
        // TODO: Implement teardown hooks
    }
    
    expect(actual) {
        // TODO: Implement assertion methods
        return {
            toBe: (expected) => { /* TODO */ },
            toEqual: (expected) => { /* TODO */ },
            toThrow: (error) => { /* TODO */ }
        };
    }
    
    mock(module) {
        // TODO: Implement module mocking
    }
    
    async run() {
        // TODO: Execute all tests and generate report
    }
}
```

### Exercise 12: Visual Regression Testing
Implement visual testing for UI components:

```javascript
// TODO: Set up visual regression testing

// src/visual-testing/visualTester.js
export class VisualTester {
    // TODO: Implement visual testing utilities:
    // 1. Screenshot capture
    // 2. Image comparison
    // 3. Difference highlighting
    // 4. Baseline management
    
    async captureScreenshot(selector, options = {}) {
        // TODO: Capture component screenshot
    }
    
    async compareWithBaseline(screenshot, baselinePath) {
        // TODO: Compare with baseline image
    }
    
    async updateBaseline(screenshot, baselinePath) {
        // TODO: Update baseline image
    }
}

// TODO: Write visual tests:
describe('Visual Regression Tests', () => {
    test('button component renders correctly', async () => {
        // TODO: Render button component
        // TODO: Capture screenshot
        // TODO: Compare with baseline
    });
    
    test('form layout is consistent', async () => {
        // TODO: Test form layout across different screen sizes
    });
});
```

### Exercise 13: Mutation Testing
Implement mutation testing for test quality:

```javascript
// TODO: Set up mutation testing to test your tests

// Configure mutation testing tool (e.g., Stryker)
// stryker.conf.js
module.exports = {
    // TODO: Configure mutation testing:
    // 1. Mutant generation
    // 2. Test execution
    // 3. Mutation score calculation
    // 4. Reporting
};

// TODO: Analyze mutation testing results:
// 1. Identify weak tests
// 2. Improve test coverage
// 3. Add missing test cases
// 4. Achieve high mutation score
```

---

## 🎨 Creative Challenges

### Challenge 1: AI-Powered Test Generation
Create an AI system that generates tests automatically:
- Analyze code structure and generate test cases
- Identify edge cases and boundary conditions
- Generate realistic test data
- Suggest missing test scenarios

### Challenge 2: Distributed Testing System
Build a distributed testing framework:
- Parallel test execution across multiple machines
- Load balancing and resource management
- Real-time test result aggregation
- Fault tolerance and recovery

### Challenge 3: Testing Analytics Dashboard
Create a comprehensive testing analytics system:
- Test execution metrics and trends
- Code coverage visualization
- Performance regression tracking
- Quality metrics dashboard

---

## 🧪 Testing Your Solutions

For each exercise, verify:

1. **Test Coverage** - Achieve minimum 80% coverage
2. **Test Quality** - Tests should be reliable and maintainable
3. **Performance** - Tests should run efficiently
4. **Documentation** - Clear test descriptions and setup
5. **CI/CD Integration** - Tests should run in automated pipelines

## 💡 Hints

- Start with simple unit tests and gradually increase complexity
- Focus on testing behavior, not implementation details
- Use descriptive test names that explain the expected behavior
- Keep tests independent and isolated
- Mock external dependencies appropriately
- Regularly refactor tests to maintain quality

## 🎯 Success Criteria

You've mastered testing and quality assurance when you can:
- ✅ Write comprehensive unit, integration, and E2E tests
- ✅ Apply TDD methodology effectively
- ✅ Implement advanced mocking and stubbing strategies
- ✅ Set up automated quality gates and CI/CD pipelines
- ✅ Create maintainable and reliable test suites
- ✅ Lead testing initiatives and mentor team members

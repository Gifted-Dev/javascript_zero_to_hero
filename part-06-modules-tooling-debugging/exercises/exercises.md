# Part 6: Modules, Tooling & Debugging - Exercises

Master modern JavaScript development workflow through hands-on practice! These exercises cover ES6 modules, build tools, debugging techniques, testing strategies, and professional development practices.

## 🎯 How to Use These Exercises

1. **Set up a proper development environment** - Use Node.js 16+ and modern tools
2. **Practice with real projects** - Apply concepts to actual applications
3. **Use version control** - Practice Git workflows and collaboration
4. **Focus on automation** - Implement CI/CD and quality checks
5. **Compare with solutions** (in `solutions/` folder)

---

## 📚 Basic Level (Must Complete All)

### Exercise 1: ES6 Module Conversion
Convert a legacy script-based application to use ES6 modules:

```javascript
// Given: Legacy code with global variables
// script1.js
var userUtils = {
    validateEmail: function(email) {
        return /\S+@\S+\.\S+/.test(email);
    },
    formatName: function(firstName, lastName) {
        return firstName + ' ' + lastName;
    }
};

var API_URL = 'https://api.example.com';

// script2.js
function createUser(userData) {
    if (!userUtils.validateEmail(userData.email)) {
        throw new Error('Invalid email');
    }
    
    return fetch(API_URL + '/users', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}

// TODO: Convert to ES6 modules with proper imports/exports
// Create separate files: userUtils.js, config.js, userService.js
// Use named exports, default exports, and proper module structure
```

### Exercise 2: Basic Webpack Setup
Create a Webpack configuration from scratch:

```javascript
// TODO: Create webpack.config.js with:
// 1. Entry point: src/index.js
// 2. Output: dist/bundle.js
// 3. HTML plugin to generate index.html
// 4. CSS loader for styling
// 5. Babel loader for ES6+ transpilation
// 6. Development server configuration

// package.json scripts to add:
// - "dev": start development server
// - "build": create production build
// - "clean": remove dist folder

// Test with a simple app that imports CSS and uses ES6 features
```

### Exercise 3: ESLint Configuration
Set up comprehensive code quality tools:

```javascript
// TODO: Create .eslintrc.js with:
// 1. Extends: eslint:recommended
// 2. Environment: browser, es2021, node
// 3. Parser options: ecmaVersion 2021, sourceType module
// 4. Custom rules for:
//    - No console.log in production
//    - Prefer const over let
//    - No unused variables
//    - Consistent indentation

// TODO: Add Prettier configuration
// TODO: Set up pre-commit hooks with Husky
// TODO: Configure lint-staged for staged files only
```

### Exercise 4: Basic Testing Setup
Implement unit testing with Jest:

```javascript
// TODO: Set up Jest configuration
// TODO: Write tests for these functions:

function calculateTax(price, taxRate) {
    if (price < 0 || taxRate < 0) {
        throw new Error('Price and tax rate must be positive');
    }
    return price * (1 + taxRate);
}

function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

async function fetchUserData(userId) {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
        throw new Error('User not found');
    }
    return response.json();
}

// Test cases to cover:
// - Happy path scenarios
// - Error conditions
// - Edge cases
// - Async operations
// - Mocking external dependencies
```

### Exercise 5: Development Environment
Create a complete development environment:

```javascript
// TODO: Set up development server with:
// 1. Express server with middleware
// 2. Proxy for API calls
// 3. Hot module replacement
// 4. Environment variable management
// 5. CORS configuration for development

// TODO: Create different configurations for:
// - Development (with debugging, hot reload)
// - Production (optimized, minified)
// - Testing (with coverage, mocking)

// Environment files to create:
// - .env.development
// - .env.production
// - .env.test
```

---

## 🚀 Intermediate Level

### Exercise 6: Advanced Webpack Configuration
Build a sophisticated Webpack setup:

```javascript
// TODO: Create webpack configuration with:
// 1. Multiple entry points
// 2. Code splitting and lazy loading
// 3. Asset optimization (images, fonts)
// 4. CSS extraction and minification
// 5. Bundle analysis and performance budgets
// 6. Source maps for debugging
// 7. Tree shaking for dead code elimination

// TODO: Implement:
// - Development and production modes
// - Dynamic imports for route-based code splitting
// - Vendor chunk separation
// - Asset caching strategies
// - Bundle size monitoring
```

### Exercise 7: Testing Strategy Implementation
Create comprehensive testing suite:

```javascript
// TODO: Set up testing for a shopping cart application:

class ShoppingCart {
    constructor() {
        this.items = [];
        this.discounts = [];
    }
    
    addItem(product, quantity = 1) {
        // TODO: Implement
    }
    
    removeItem(productId) {
        // TODO: Implement
    }
    
    updateQuantity(productId, quantity) {
        // TODO: Implement
    }
    
    applyDiscount(discountCode) {
        // TODO: Implement
    }
    
    calculateTotal() {
        // TODO: Implement
    }
    
    checkout() {
        // TODO: Implement async checkout process
    }
}

// TODO: Write tests for:
// 1. Unit tests for each method
// 2. Integration tests for complete workflows
// 3. Mock external services (payment, inventory)
// 4. Test error scenarios and edge cases
// 5. Performance tests for large carts
// 6. Set up test coverage reporting
```

### Exercise 8: Debugging Tools Setup
Implement advanced debugging capabilities:

```javascript
// TODO: Create debugging utilities:

class DebugLogger {
    constructor(namespace) {
        this.namespace = namespace;
        this.enabled = process.env.NODE_ENV === 'development';
    }
    
    log(message, data) {
        // TODO: Implement with namespace filtering
    }
    
    error(message, error) {
        // TODO: Implement with stack trace
    }
    
    performance(label, fn) {
        // TODO: Implement performance measurement
    }
    
    memory() {
        // TODO: Implement memory usage tracking
    }
}

// TODO: Set up:
// 1. Source maps for production debugging
// 2. Error boundary for React components
// 3. Global error handling
// 4. Performance monitoring
// 5. Remote debugging capabilities
// 6. Browser DevTools integration
```

### Exercise 9: Build Optimization
Optimize build performance and output:

```javascript
// TODO: Implement build optimizations:

// 1. Bundle splitting strategy
const optimization = {
    splitChunks: {
        // TODO: Configure cache groups for:
        // - Vendor libraries
        // - Common utilities
        // - Route-specific code
    }
};

// 2. Asset optimization
// TODO: Configure:
// - Image compression and optimization
// - Font subsetting and optimization
// - CSS purging for unused styles
// - JavaScript minification and obfuscation

// 3. Caching strategy
// TODO: Implement:
// - Long-term caching with content hashes
// - Service worker for offline caching
// - CDN integration for static assets

// 4. Performance monitoring
// TODO: Add:
// - Bundle size tracking
// - Build time optimization
// - Lighthouse CI integration
```

### Exercise 10: CI/CD Pipeline
Create automated deployment pipeline:

```yaml
# TODO: Create GitHub Actions workflow with:
# 1. Multi-stage pipeline (test, build, deploy)
# 2. Matrix testing across Node.js versions
# 3. Automated security scanning
# 4. Performance testing with Lighthouse
# 5. Deployment to staging and production
# 6. Rollback capabilities

# TODO: Implement:
# - Branch protection rules
# - Required status checks
# - Automated dependency updates
# - Security vulnerability scanning
# - Performance regression detection
```

---

## 🔥 Advanced Level

### Exercise 11: Micro-Frontend Architecture
Build a micro-frontend system:

```javascript
// TODO: Create micro-frontend setup with:
// 1. Module Federation (Webpack 5)
// 2. Independent deployments
// 3. Shared dependencies
// 4. Cross-app communication
// 5. Unified routing

// Host application
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            remotes: {
                // TODO: Configure remote applications
            },
            shared: {
                // TODO: Configure shared dependencies
            }
        })
    ]
};

// TODO: Implement:
// - Shell application with routing
// - Multiple micro-frontends
// - Shared state management
// - Error boundaries between apps
// - Performance monitoring across apps
```

### Exercise 12: Advanced Testing Framework
Build comprehensive testing infrastructure:

```javascript
// TODO: Create testing framework with:

class TestRunner {
    constructor() {
        this.suites = [];
        this.reporters = [];
        this.hooks = {
            beforeAll: [],
            afterAll: [],
            beforeEach: [],
            afterEach: []
        };
    }
    
    describe(name, fn) {
        // TODO: Implement test suite grouping
    }
    
    it(name, fn) {
        // TODO: Implement individual test execution
    }
    
    beforeAll(fn) {
        // TODO: Implement setup hooks
    }
    
    expect(actual) {
        // TODO: Implement assertion library
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
        // TODO: Implement test execution engine
    }
}

// TODO: Add features:
// - Parallel test execution
// - Custom matchers
// - Snapshot testing
// - Visual regression testing
// - Performance testing
// - Cross-browser testing
```

### Exercise 13: Performance Monitoring System
Create comprehensive performance monitoring:

```javascript
// TODO: Build performance monitoring system:

class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.observers = [];
        this.thresholds = {
            // TODO: Define performance thresholds
        };
    }
    
    startMonitoring() {
        // TODO: Set up performance observers for:
        // - Core Web Vitals (LCP, FID, CLS)
        // - Custom metrics
        // - Resource timing
        // - Long tasks
        // - Memory usage
    }
    
    trackUserInteraction(action, element) {
        // TODO: Track user interactions
    }
    
    reportMetrics() {
        // TODO: Send metrics to analytics service
    }
    
    detectPerformanceIssues() {
        // TODO: Identify performance problems
    }
    
    generateReport() {
        // TODO: Create performance report
    }
}

// TODO: Implement:
// - Real-time performance monitoring
// - Performance budgets and alerts
// - A/B testing for performance
// - Regression detection
// - Automated optimization suggestions
```

### Exercise 14: Development Tools Suite
Create custom development tools:

```javascript
// TODO: Build development tools suite:

class DevToolsSuite {
    constructor() {
        this.tools = new Map();
        this.panels = [];
    }
    
    addTool(name, tool) {
        // TODO: Register development tool
    }
    
    createInspector() {
        // TODO: Create DOM inspector
    }
    
    createProfiler() {
        // TODO: Create performance profiler
    }
    
    createNetworkMonitor() {
        // TODO: Create network request monitor
    }
    
    createStateInspector() {
        // TODO: Create application state inspector
    }
    
    createConsole() {
        // TODO: Create enhanced console
    }
}

// TODO: Features to implement:
// - Component tree visualization
// - State time-travel debugging
// - Performance flame graphs
// - Network request analysis
// - Bundle analysis visualization
// - Hot reloading with state preservation
```

### Exercise 15: Build System from Scratch
Create a custom build system:

```javascript
// TODO: Build custom bundler with:

class CustomBundler {
    constructor(config) {
        this.config = config;
        this.plugins = [];
        this.loaders = new Map();
    }
    
    addPlugin(plugin) {
        // TODO: Plugin system
    }
    
    addLoader(test, loader) {
        // TODO: File transformation system
    }
    
    resolveModule(path) {
        // TODO: Module resolution
    }
    
    transformCode(code, filename) {
        // TODO: Code transformation
    }
    
    generateBundle() {
        // TODO: Bundle generation
    }
    
    watch() {
        // TODO: File watching and hot reloading
    }
}

// TODO: Implement:
// - Dependency graph analysis
// - Tree shaking
// - Code splitting
// - Asset optimization
// - Source map generation
// - Plugin architecture
// - Hot module replacement
```

---

## 🎨 Creative Challenges

### Challenge 1: Visual Development Environment
Create a visual development environment with:
- Drag-and-drop component builder
- Real-time code generation
- Visual debugging interface
- Performance visualization
- Collaborative editing features

### Challenge 2: AI-Powered Development Assistant
Build an AI assistant that:
- Suggests code improvements
- Detects potential bugs
- Optimizes performance automatically
- Generates tests automatically
- Provides documentation suggestions

### Challenge 3: Cross-Platform Development Toolkit
Create a toolkit for:
- Web, mobile, and desktop development
- Shared codebase with platform-specific optimizations
- Unified build and deployment pipeline
- Cross-platform debugging
- Performance monitoring across platforms

---

## 🧪 Testing Your Solutions

For each exercise, verify:

1. **Functionality** - All features work as expected
2. **Performance** - Builds are fast and optimized
3. **Quality** - Code passes all linting and formatting checks
4. **Testing** - Comprehensive test coverage
5. **Documentation** - Clear setup and usage instructions

## 💡 Hints

- Start with simple configurations and gradually add complexity
- Use existing tools as inspiration but understand the underlying concepts
- Focus on developer experience and productivity
- Consider performance implications of your tooling choices
- Test your tools with real projects to validate effectiveness

## 🎯 Success Criteria

You've mastered modern JavaScript tooling when you can:
- ✅ Set up complete development environments from scratch
- ✅ Configure build tools for optimal performance
- ✅ Implement comprehensive testing strategies
- ✅ Debug complex applications efficiently
- ✅ Create automated CI/CD pipelines
- ✅ Optimize applications for production deployment

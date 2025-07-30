# Part 6 Examples: Modules, Tooling & Debugging

This folder contains practical examples demonstrating modern JavaScript development workflow, tooling, and debugging techniques.

## 📂 Files Overview

- **`module-examples/`** - ES6 modules, CommonJS, and dynamic imports
- **`webpack-project/`** - Complete Webpack configuration and setup
- **`debugging-examples/`** - Advanced debugging techniques and tools
- **`testing-examples/`** - Jest, Cypress, and testing strategies
- **`linting-config/`** - ESLint, Prettier, and code quality setup
- **`ci-cd-examples/`** - GitHub Actions and deployment workflows
- **`performance-monitoring/`** - Performance profiling and optimization
- **`development-server/`** - Modern development server setup

## 🚀 How to Run These Examples

### Prerequisites
```bash
# Install Node.js (version 16 or higher)
node --version
npm --version

# Install global tools (optional)
npm install -g webpack-cli @angular/cli create-react-app
```

### Setup Instructions
```bash
# Clone or download the examples
cd part-06-modules-tooling-debugging/examples

# For each example project:
cd webpack-project
npm install
npm run dev

# Or for production build:
npm run build
```

## 📚 What You'll Learn

### From `module-examples/`:
- ES6 module syntax and patterns
- CommonJS vs ES6 modules
- Dynamic imports and code splitting
- Module resolution strategies
- Circular dependency handling

### From `webpack-project/`:
- Complete Webpack configuration
- Development vs production builds
- Hot module replacement
- Code splitting and optimization
- Asset handling and loaders

### From `debugging-examples/`:
- Browser DevTools mastery
- Source maps configuration
- Error handling and reporting
- Performance profiling
- Remote debugging techniques

### From `testing-examples/`:
- Unit testing with Jest
- Integration testing strategies
- E2E testing with Cypress
- Test coverage and reporting
- Mocking and test utilities

### From `linting-config/`:
- ESLint configuration and rules
- Prettier code formatting
- Pre-commit hooks with Husky
- TypeScript integration
- Custom linting rules

### From `ci-cd-examples/`:
- GitHub Actions workflows
- Automated testing and deployment
- Environment management
- Security scanning
- Performance monitoring in CI

### From `performance-monitoring/`:
- Bundle analysis and optimization
- Runtime performance monitoring
- Memory leak detection
- Lighthouse integration
- Core Web Vitals tracking

### From `development-server/`:
- Express development server
- Proxy configuration
- Hot reloading setup
- Security middleware
- Environment configuration

## 🎯 Key Concepts Demonstrated

### 1. Modern Module System
```javascript
// ES6 modules with tree shaking
import { debounce } from 'lodash-es'; // Tree-shakeable
import { Button } from '@/components'; // Alias imports

// Dynamic imports for code splitting
const LazyComponent = lazy(() => import('./LazyComponent'));

// Conditional loading
if (process.env.NODE_ENV === 'development') {
    import('./dev-tools').then(devTools => devTools.init());
}
```

### 2. Build Optimization
```javascript
// Webpack optimization
module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};
```

### 3. Development Workflow
```javascript
// Package.json scripts
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "test": "jest --coverage",
    "lint": "eslint src/ --fix",
    "format": "prettier --write src/"
  }
}
```

### 4. Quality Assurance
```javascript
// ESLint + Prettier + Husky
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## 🔧 Tools and Technologies

### Build Tools
- **Webpack 5** - Module bundler with advanced features
- **Vite** - Fast build tool for modern web projects
- **Rollup** - Library bundling and tree shaking
- **Parcel** - Zero-configuration build tool

### Development Tools
- **ESLint** - JavaScript linting and code quality
- **Prettier** - Code formatting and style consistency
- **Husky** - Git hooks for automation
- **lint-staged** - Run linters on staged files

### Testing Tools
- **Jest** - JavaScript testing framework
- **Cypress** - End-to-end testing
- **Testing Library** - Simple and complete testing utilities
- **Lighthouse CI** - Performance testing automation

### Debugging Tools
- **Chrome DevTools** - Browser debugging
- **VS Code Debugger** - IDE debugging integration
- **Source Maps** - Original source debugging
- **Error Reporting** - Production error tracking

## 🧪 Hands-On Exercises

### Exercise 1: Module Refactoring
Take a legacy script-based project and refactor it to use ES6 modules:
1. Identify global variables and functions
2. Create appropriate module boundaries
3. Implement proper imports/exports
4. Set up a build process

### Exercise 2: Webpack Configuration
Build a custom Webpack configuration from scratch:
1. Set up entry points and output
2. Configure loaders for different file types
3. Add plugins for optimization
4. Implement development and production modes

### Exercise 3: Testing Strategy
Implement comprehensive testing for a project:
1. Write unit tests for utility functions
2. Add integration tests for components
3. Create E2E tests for user flows
4. Set up coverage reporting

### Exercise 4: CI/CD Pipeline
Create a complete CI/CD pipeline:
1. Set up automated testing
2. Add code quality checks
3. Implement deployment automation
4. Configure environment management

## 🚨 Common Issues and Solutions

### 1. Module Resolution Errors
```javascript
// Problem: Cannot resolve module
// Solution: Check webpack resolve configuration
module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
};
```

### 2. Build Performance Issues
```javascript
// Problem: Slow build times
// Solution: Optimize webpack configuration
module.exports = {
    cache: {
        type: 'filesystem'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};
```

### 3. Debugging Production Issues
```javascript
// Problem: Hard to debug minified code
// Solution: Proper source map configuration
module.exports = {
    devtool: process.env.NODE_ENV === 'production' 
        ? 'source-map' 
        : 'eval-source-map'
};
```

### 4. Test Environment Issues
```javascript
// Problem: Tests failing in CI but passing locally
// Solution: Consistent environment setup
// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
};
```

## 💡 Best Practices Demonstrated

### 1. **Modular Architecture**
- Clear separation of concerns
- Proper dependency management
- Reusable components and utilities

### 2. **Build Optimization**
- Code splitting for better performance
- Tree shaking to eliminate dead code
- Asset optimization and caching

### 3. **Development Experience**
- Hot module replacement for fast development
- Comprehensive error handling and reporting
- Automated code quality checks

### 4. **Testing Strategy**
- Unit tests for individual functions
- Integration tests for component interaction
- E2E tests for complete user flows

### 5. **Deployment Automation**
- Automated testing and quality checks
- Environment-specific configurations
- Rollback strategies and monitoring

## 🎨 Customization Ideas

Try extending these examples with:
- **Micro-frontend architecture** with module federation
- **Monorepo setup** with Lerna or Nx
- **Advanced testing** with visual regression testing
- **Performance budgets** and monitoring
- **Security scanning** and vulnerability management
- **Documentation generation** with JSDoc or Storybook

## 📈 Progressive Enhancement

Start with basic setups and gradually add:
1. **Basic bundling** → Advanced optimization
2. **Simple testing** → Comprehensive test suites
3. **Manual deployment** → Automated CI/CD
4. **Basic debugging** → Advanced profiling
5. **Local development** → Production monitoring

These examples provide a solid foundation for modern JavaScript development workflows. Practice with real projects to master these essential development skills!

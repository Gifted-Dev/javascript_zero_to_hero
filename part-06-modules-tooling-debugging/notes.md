# Part 6: Modules, Tooling & Debugging - Complete Guide
## Master Modern JavaScript Development Workflow

Welcome to the professional JavaScript development part! This section covers everything you need to build, debug, and deploy modern JavaScript applications using industry-standard tools and practices.

## 📚 Table of Contents

1. [ES6 Modules and Module Systems](#es6-modules-and-module-systems)
2. [NPM and Package Management](#npm-and-package-management)
3. [Build Tools and Bundlers](#build-tools-and-bundlers)
4. [Development Environment Setup](#development-environment-setup)
5. [Debugging Strategies and Tools](#debugging-strategies-and-tools)
6. [Code Quality and Linting](#code-quality-and-linting)
7. [Testing and Automation](#testing-and-automation)
8. [Performance Profiling](#performance-profiling)
9. [Deployment and CI/CD](#deployment-and-cicd)
10. [Modern Development Workflow](#modern-development-workflow)

---

## 1. ES6 Modules and Module Systems

### Understanding Module Systems

JavaScript has evolved from a script-based language to a modular one. Understanding different module systems is crucial for modern development.

```javascript
// CommonJS (Node.js)
const fs = require('fs');
const { readFile } = require('fs').promises;

module.exports = {
    readConfig: () => { /* implementation */ }
};

// ES6 Modules (Modern Standard)
import fs from 'fs';
import { readFile } from 'fs/promises';
import * as utils from './utils.js';

export const readConfig = () => { /* implementation */ };
export default class ConfigManager { /* implementation */ }

// AMD (RequireJS - Legacy)
define(['fs', 'path'], function(fs, path) {
    return {
        readConfig: function() { /* implementation */ }
    };
});
```

### ES6 Module Syntax Deep Dive

```javascript
// Named exports
export const PI = 3.14159;
export function calculateArea(radius) {
    return PI * radius * radius;
}

export class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    
    getArea() {
        return calculateArea(this.radius);
    }
}

// Default export
export default class MathUtils {
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
}

// Re-exports
export { default as MathUtils } from './math-utils.js';
export * from './constants.js';
export { PI as MATH_PI } from './constants.js';
```

### Advanced Module Patterns

```javascript
// Dynamic imports
async function loadModule(moduleName) {
    try {
        const module = await import(`./modules/${moduleName}.js`);
        return module.default || module;
    } catch (error) {
        console.error(`Failed to load module: ${moduleName}`, error);
        return null;
    }
}

// Conditional loading
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
    const devTools = await import('./dev-tools.js');
    devTools.enableDebugMode();
}

// Module factory pattern
function createModule(config) {
    const privateVar = config.secret;
    
    return {
        publicMethod() {
            return `Public method with ${privateVar}`;
        },
        
        async loadData() {
            const dataModule = await import('./data-loader.js');
            return dataModule.load(config.dataSource);
        }
    };
}

// Singleton module pattern
let instance = null;

export default class DatabaseConnection {
    constructor() {
        if (instance) {
            return instance;
        }
        
        this.connection = null;
        this.isConnected = false;
        instance = this;
    }
    
    async connect() {
        if (!this.isConnected) {
            // Connection logic
            this.isConnected = true;
        }
        return this.connection;
    }
}
```

### Module Resolution and Bundling

```javascript
// Module resolution strategies
// 1. Relative imports
import utils from './utils.js';           // Same directory
import config from '../config/app.js';   // Parent directory
import helpers from '../../shared/helpers.js'; // Multiple levels up

// 2. Absolute imports (with bundler configuration)
import { Button } from '@/components/Button.js';
import { API_URL } from '@/config/constants.js';

// 3. Node modules
import lodash from 'lodash';
import { debounce } from 'lodash';
import React from 'react';

// 4. Conditional exports (package.json)
{
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "browser": "./dist/browser/index.js"
    },
    "./utils": {
      "import": "./dist/esm/utils.js",
      "require": "./dist/cjs/utils.js"
    }
  }
}
```

---

## 2. NPM and Package Management

### Package.json Deep Dive

```json
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "description": "A comprehensive JavaScript project",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "browser": "dist/index.umd.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "src",
    "README.md"
  ],
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "format": "prettier --write src/**/*.js",
    "type-check": "tsc --noEmit",
    "prepare": "husky install",
    "prepublishOnly": "npm run build && npm test",
    "semantic-release": "semantic-release"
  },
  "dependencies": {
    "lodash": "^4.17.21",
    "axios": "^1.4.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0",
    "babel-loader": "^9.1.0",
    "@babel/core": "^7.22.0",
    "@babel/preset-env": "^7.22.0",
    "eslint": "^8.44.0",
    "prettier": "^2.8.8",
    "jest": "^29.6.0",
    "husky": "^8.0.3",
    "lint-staged": "^13.2.3"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ],
  "keywords": [
    "javascript",
    "frontend",
    "library"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/my-awesome-project.git"
  },
  "bugs": {
    "url": "https://github.com/username/my-awesome-project/issues"
  },
  "homepage": "https://github.com/username/my-awesome-project#readme"
}
```

### NPM Commands and Workflows

```bash
# Package installation
npm install                    # Install all dependencies
npm install lodash            # Install specific package
npm install --save-dev jest   # Install as dev dependency
npm install -g @angular/cli   # Install globally

# Package management
npm update                    # Update all packages
npm update lodash            # Update specific package
npm outdated                 # Check for outdated packages
npm audit                    # Security audit
npm audit fix               # Fix security vulnerabilities

# Package information
npm list                     # List installed packages
npm list --depth=0          # List top-level packages only
npm info lodash             # Get package information
npm search react           # Search for packages

# Publishing
npm login                   # Login to npm registry
npm publish                 # Publish package
npm version patch          # Bump version (patch)
npm version minor          # Bump version (minor)
npm version major          # Bump version (major)

# Workspaces (monorepo)
npm init -w packages/utils  # Create workspace
npm run test --workspace=utils  # Run script in workspace
npm install lodash -w packages/utils  # Install in workspace
```

### Advanced NPM Configuration

```javascript
// .npmrc configuration
registry=https://registry.npmjs.org/
save-exact=true
engine-strict=true
fund=false
audit-level=moderate

// Custom npm scripts with cross-platform support
{
  "scripts": {
    "clean": "rimraf dist",
    "prebuild": "npm run clean",
    "build": "cross-env NODE_ENV=production webpack",
    "postbuild": "npm run analyze",
    "analyze": "webpack-bundle-analyzer dist/stats.json",
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:server": "nodemon server.js",
    "dev:client": "webpack serve --hot",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "cypress run",
    "release": "standard-version && git push --follow-tags origin main"
  }
}

// Package-lock.json understanding
{
  "name": "my-project",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "my-project",
      "version": "1.0.0",
      "dependencies": {
        "lodash": "^4.17.21"
      }
    },
    "node_modules/lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
    }
  }
}
```

---

## 3. Build Tools and Bundlers

### Webpack Configuration

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    
    entry: {
        main: './src/index.js',
        vendor: ['lodash', 'axios']
    },
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isDevelopment 
            ? '[name].js' 
            : '[name].[contenthash].js',
        chunkFilename: isDevelopment 
            ? '[name].chunk.js' 
            : '[name].[contenthash].chunk.js',
        publicPath: '/',
        clean: true
    },
    
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@utils': path.resolve(__dirname, 'src/utils')
        }
    },
    
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 versions']
                                },
                                useBuiltIns: 'usage',
                                corejs: 3
                            }]
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: isDevelopment 
                                    ? '[name]__[local]--[hash:base64:5]'
                                    : '[hash:base64]'
                            }
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb
                    }
                },
                generator: {
                    filename: 'images/[name].[hash][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]'
                }
            }
        ]
    },
    
    plugins: [
        new CleanWebpackPlugin(),
        
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: !isDevelopment
        }),
        
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000')
        }),
        
        ...(isDevelopment ? [
            new webpack.HotModuleReplacementPlugin()
        ] : [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[name].[contenthash].chunk.css'
            })
        ])
    ],
    
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        runtimeChunk: 'single'
    },
    
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    
    devtool: isDevelopment ? 'eval-source-map' : 'source-map'
};
```

### Alternative Build Tools

```javascript
// Vite configuration (vite.config.js)
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                admin: resolve(__dirname, 'src/admin.html')
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/components')
        }
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    plugins: [
        // Add plugins as needed
    ]
});

// Rollup configuration (rollup.config.js)
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/bundle.cjs.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'dist/bundle.esm.js',
            format: 'esm',
            sourcemap: true
        },
        {
            file: 'dist/bundle.umd.js',
            format: 'umd',
            name: 'MyLibrary',
            sourcemap: true
        }
    ],
    plugins: [
        resolve({
            browser: true,
            preferBuiltins: false
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        production && terser()
    ],
    external: ['lodash', 'axios'] // Don't bundle these
};

// Parcel (zero-config bundler)
// package.json scripts
{
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html --dist-dir dist"
  }
}
```

### Build Optimization Strategies

```javascript
// Code splitting with dynamic imports
async function loadComponent(componentName) {
    const { default: Component } = await import(`./components/${componentName}.js`);
    return Component;
}

// Lazy loading routes
const routes = [
    {
        path: '/home',
        component: () => import('./pages/Home.js')
    },
    {
        path: '/about',
        component: () => import('./pages/About.js')
    }
];

// Tree shaking optimization
// Import only what you need
import { debounce } from 'lodash'; // Good
import _ from 'lodash'; // Bad - imports entire library

// Bundle analysis
// webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

// Add to webpack config
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: [
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'bundle-report.html'
    })
]

// Performance budgets
module.exports = {
    performance: {
        maxAssetSize: 250000,
        maxEntrypointSize: 250000,
        hints: 'warning'
    }
};
```

---

## 4. Development Environment Setup

### Modern Development Environment

```javascript
// .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

// .gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
*.tgz
*.tar.gz

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Coverage reports
coverage/
.nyc_output/

# Cache
.cache/
.parcel-cache/
```

### Environment Configuration

```javascript
// Environment variables management
// .env.example
NODE_ENV=development
API_URL=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/myapp
JWT_SECRET=your-secret-key
DEBUG=app:*

// config/environment.js
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV || 'development'}`)
});

const config = {
    development: {
        apiUrl: process.env.API_URL || 'http://localhost:3000',
        database: {
            url: process.env.DATABASE_URL,
            ssl: false
        },
        debug: true,
        logLevel: 'debug'
    },

    production: {
        apiUrl: process.env.API_URL,
        database: {
            url: process.env.DATABASE_URL,
            ssl: true
        },
        debug: false,
        logLevel: 'error'
    },

    test: {
        apiUrl: 'http://localhost:3001',
        database: {
            url: process.env.TEST_DATABASE_URL
        },
        debug: false,
        logLevel: 'silent'
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];

// Cross-platform scripts
// package.json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node server.js",
    "dev": "cross-env NODE_ENV=development nodemon server.js",
    "test": "cross-env NODE_ENV=test jest",
    "build:dev": "cross-env NODE_ENV=development webpack",
    "build:prod": "cross-env NODE_ENV=production webpack"
  }
}
```

### Development Server Configuration

```javascript
// Express development server with hot reloading
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const app = express();
const compiler = webpack(config);

if (process.env.NODE_ENV === 'development') {
    // Hot reloading middleware
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: 'minimal'
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));

    // API proxy for development
    const { createProxyMiddleware } = require('http-proxy-middleware');

    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err);
            res.status(500).send('Proxy error');
        }
    }));
}

// Static file serving
app.use(express.static('public'));

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

## 5. Debugging Strategies and Tools

### Browser DevTools Mastery

```javascript
// Console debugging techniques
console.log('Basic logging');
console.info('Information message');
console.warn('Warning message');
console.error('Error message');

// Advanced console methods
console.table([
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
]);

console.group('User Details');
console.log('Name: John');
console.log('Age: 30');
console.groupEnd();

console.time('Performance Test');
// Some code to measure
console.timeEnd('Performance Test');

console.count('Function calls');
console.countReset('Function calls');

// Conditional logging
console.assert(user.age >= 18, 'User must be 18 or older');

// Stack trace
console.trace('Execution path');

// Custom console styling
console.log('%c Custom styled message', 'color: blue; font-size: 16px; font-weight: bold;');

// Performance monitoring
console.profile('MyFunction');
myFunction();
console.profileEnd('MyFunction');
```

### Advanced Debugging Techniques

```javascript
// Debugger statements
function complexFunction(data) {
    debugger; // Execution will pause here when DevTools is open

    const processed = data.map(item => {
        if (item.value > 100) {
            debugger; // Conditional breakpoint alternative
        }
        return processItem(item);
    });

    return processed;
}

// Error handling and debugging
class DebugError extends Error {
    constructor(message, context = {}) {
        super(message);
        this.name = 'DebugError';
        this.context = context;
        this.timestamp = new Date().toISOString();

        // Capture stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DebugError);
        }
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            context: this.context,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

// Usage
try {
    riskyOperation();
} catch (error) {
    throw new DebugError('Operation failed', {
        originalError: error.message,
        userId: currentUser.id,
        operation: 'riskyOperation'
    });
}

// Debug utility functions
const debug = {
    log: (message, data) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DEBUG] ${message}`, data);
        }
    },

    trace: (label) => {
        if (process.env.NODE_ENV === 'development') {
            console.trace(label);
        }
    },

    performance: (fn, label) => {
        return function(...args) {
            const start = performance.now();
            const result = fn.apply(this, args);
            const end = performance.now();

            debug.log(`${label} took ${end - start} milliseconds`);
            return result;
        };
    },

    memory: () => {
        if (performance.memory) {
            const memory = performance.memory;
            debug.log('Memory usage', {
                used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`,
                total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`,
                limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`
            });
        }
    }
};
```

### Source Maps and Debugging

```javascript
// webpack.config.js - Source map configuration
module.exports = {
    devtool: process.env.NODE_ENV === 'development'
        ? 'eval-source-map'     // Fast rebuild, original source
        : 'source-map',         // Slower build, best quality

    // Alternative options:
    // 'cheap-module-source-map' - Faster, less detailed
    // 'inline-source-map' - Embedded in bundle
    // 'hidden-source-map' - No reference in bundle
    // 'nosources-source-map' - No source content
};

// Error reporting with source maps
window.addEventListener('error', (event) => {
    const errorInfo = {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    };

    // Send to error reporting service
    reportError(errorInfo);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);

    const errorInfo = {
        type: 'unhandledrejection',
        reason: event.reason,
        promise: event.promise,
        timestamp: new Date().toISOString()
    };

    reportError(errorInfo);
});
```

### Remote Debugging

```javascript
// Remote debugging setup for mobile devices
// Chrome DevTools Protocol
const CDP = require('chrome-remote-interface');

async function debugRemote() {
    let client;

    try {
        client = await CDP();
        const { Runtime, Debugger } = client;

        await Runtime.enable();
        await Debugger.enable();

        // Set breakpoint
        await Debugger.setBreakpointByUrl({
            lineNumber: 10,
            url: 'http://localhost:3000/app.js'
        });

        // Evaluate expression
        const result = await Runtime.evaluate({
            expression: 'window.myVariable'
        });

        console.log('Remote evaluation result:', result);

    } catch (error) {
        console.error('Remote debugging error:', error);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

// Weinre (Web Inspector Remote) for legacy debugging
// Install: npm install -g weinre
// Run: weinre --boundHost 0.0.0.0 --httpPort 8080
// Add to HTML: <script src="http://your-ip:8080/target/target-script-min.js#anonymous"></script>
```

---

## 6. Code Quality and Linting

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
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/recommended',
        'prettier' // Must be last to override other configs
    ],

    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },

    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'jsx-a11y',
        'import',
        'security'
    ],

    rules: {
        // Error prevention
        'no-console': 'warn',
        'no-debugger': 'error',
        'no-unused-vars': 'error',
        'no-undef': 'error',

        // Best practices
        'prefer-const': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-template': 'error',
        'prefer-arrow-callback': 'error',

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

        // React specific
        'react/prop-types': 'error',
        'react/no-unused-prop-types': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // Accessibility
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/anchor-has-content': 'error',
        'jsx-a11y/aria-role': 'error',

        // Security
        'security/detect-object-injection': 'warn',
        'security/detect-non-literal-regexp': 'warn'
    },

    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            webpack: {
                config: 'webpack.config.js'
            }
        }
    },

    overrides: [
        {
            files: ['**/*.test.js', '**/*.spec.js'],
            env: {
                jest: true
            },
            rules: {
                'no-console': 'off'
            }
        }
    ]
};
```

### Prettier Configuration

```javascript
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
    endOfLine: 'lf',

    // Override for specific file types
    overrides: [
        {
            files: '*.json',
            options: {
                printWidth: 200
            }
        },
        {
            files: '*.md',
            options: {
                proseWrap: 'always'
            }
        }
    ]
};

// .prettierignore
dist/
build/
node_modules/
coverage/
*.min.js
*.bundle.js
```

### Husky and Lint-Staged

```javascript
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },

  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{css,scss,less}": [
      "stylelint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{json,md}": [
      "prettier --write",
      "git add"
    ]
  }
}

// commitlint.config.js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',     // New feature
                'fix',      // Bug fix
                'docs',     // Documentation
                'style',    // Formatting
                'refactor', // Code refactoring
                'test',     // Adding tests
                'chore'     // Maintenance
            ]
        ],
        'subject-max-length': [2, 'always', 72],
        'subject-case': [2, 'always', 'lower-case']
    }
};
```

### TypeScript Integration

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "checkJs": false,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@components/*": ["components/*"],
      "@utils/*": ["utils/*"]
    }
  },
  "include": [
    "src/**/*",
    "types/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}

// Type definitions
// types/global.d.ts
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: any;
        gtag?: (...args: any[]) => void;
    }

    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            API_URL: string;
            DATABASE_URL: string;
        }
    }
}

export {};
```

---

## 7. Testing and Automation

### Jest Testing Framework

```javascript
// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/index.js',
        '!src/serviceWorker.js'
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
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
    ],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
        'node_modules/(?!(module-to-transform)/)'
    ]
};

// Example test file
// src/utils/math.test.js
import { add, multiply, divide } from './math';

describe('Math utilities', () => {
    describe('add function', () => {
        test('should add two positive numbers', () => {
            expect(add(2, 3)).toBe(5);
        });

        test('should handle negative numbers', () => {
            expect(add(-2, 3)).toBe(1);
            expect(add(-2, -3)).toBe(-5);
        });

        test('should handle zero', () => {
            expect(add(0, 5)).toBe(5);
            expect(add(5, 0)).toBe(5);
        });
    });

    describe('divide function', () => {
        test('should divide numbers correctly', () => {
            expect(divide(10, 2)).toBe(5);
        });

        test('should throw error when dividing by zero', () => {
            expect(() => divide(10, 0)).toThrow('Division by zero');
        });
    });
});

// Async testing
describe('API functions', () => {
    test('should fetch user data', async () => {
        const userData = await fetchUser(1);

        expect(userData).toHaveProperty('id', 1);
        expect(userData).toHaveProperty('name');
        expect(userData.name).toBeTruthy();
    });

    test('should handle API errors', async () => {
        await expect(fetchUser(-1)).rejects.toThrow('User not found');
    });
});

// Mocking
jest.mock('./api', () => ({
    fetchUser: jest.fn(),
    createUser: jest.fn()
}));

import { fetchUser } from './api';

test('should use mocked API', async () => {
    fetchUser.mockResolvedValue({ id: 1, name: 'John' });

    const user = await fetchUser(1);

    expect(fetchUser).toHaveBeenCalledWith(1);
    expect(user.name).toBe('John');
});
```

### End-to-End Testing

```javascript
// Cypress configuration
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
        responseTimeout: 10000
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack'
        }
    }
});

// Example E2E test
// cypress/e2e/user-flow.cy.js
describe('User Authentication Flow', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should allow user to sign up', () => {
        cy.get('[data-testid="signup-button"]').click();

        cy.get('[data-testid="email-input"]')
            .type('test@example.com');

        cy.get('[data-testid="password-input"]')
            .type('password123');

        cy.get('[data-testid="confirm-password-input"]')
            .type('password123');

        cy.get('[data-testid="submit-button"]').click();

        cy.url().should('include', '/dashboard');
        cy.get('[data-testid="welcome-message"]')
            .should('contain', 'Welcome');
    });

    it('should handle form validation', () => {
        cy.get('[data-testid="signup-button"]').click();
        cy.get('[data-testid="submit-button"]').click();

        cy.get('[data-testid="email-error"]')
            .should('be.visible')
            .and('contain', 'Email is required');
    });
});

// Custom commands
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: { email, password }
    }).then((response) => {
        window.localStorage.setItem('authToken', response.body.token);
    });
});

Cypress.Commands.add('getByTestId', (testId) => {
    return cy.get(`[data-testid="${testId}"]`);
});
```

### Performance Testing

```javascript
// Lighthouse CI configuration
// lighthouserc.js
module.exports = {
    ci: {
        collect: {
            url: ['http://localhost:3000'],
            numberOfRuns: 3
        },
        assert: {
            assertions: {
                'categories:performance': ['error', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 0.9 }],
                'categories:best-practices': ['error', { minScore: 0.9 }],
                'categories:seo': ['error', { minScore: 0.9 }]
            }
        },
        upload: {
            target: 'temporary-public-storage'
        }
    }
};

// Performance monitoring
class PerformanceMonitor {
    static measurePageLoad() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];

            const metrics = {
                dns: navigation.domainLookupEnd - navigation.domainLookupStart,
                tcp: navigation.connectEnd - navigation.connectStart,
                request: navigation.responseStart - navigation.requestStart,
                response: navigation.responseEnd - navigation.responseStart,
                domParsing: navigation.domInteractive - navigation.responseEnd,
                domReady: navigation.domContentLoadedEventEnd - navigation.navigationStart,
                pageLoad: navigation.loadEventEnd - navigation.navigationStart
            };

            console.table(metrics);

            // Send to analytics
            if (window.gtag) {
                window.gtag('event', 'page_load_time', {
                    value: Math.round(metrics.pageLoad)
                });
            }
        });
    }

    static observeResourceTiming() {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.duration > 1000) {
                    console.warn(`Slow resource: ${entry.name} (${entry.duration}ms)`);
                }
            });
        });

        observer.observe({ entryTypes: ['resource'] });
    }
}
```

---

## 8. Performance Profiling

### Browser Performance Tools

```javascript
// Performance API usage
class PerformanceProfiler {
    static startProfile(name) {
        performance.mark(`${name}-start`);
    }

    static endProfile(name) {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);

        const measure = performance.getEntriesByName(name)[0];
        console.log(`${name}: ${measure.duration.toFixed(2)}ms`);

        return measure.duration;
    }

    static profileFunction(fn, name) {
        return function(...args) {
            PerformanceProfiler.startProfile(name);
            const result = fn.apply(this, args);
            PerformanceProfiler.endProfile(name);
            return result;
        };
    }

    static profileAsyncFunction(fn, name) {
        return async function(...args) {
            PerformanceProfiler.startProfile(name);
            try {
                const result = await fn.apply(this, args);
                return result;
            } finally {
                PerformanceProfiler.endProfile(name);
            }
        };
    }

    static getMemoryUsage() {
        if (performance.memory) {
            return {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
            };
        }
        return null;
    }
}

// Bundle analysis
// webpack-bundle-analyzer usage
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
            openAnalyzer: false
        })
    ]
};

// Runtime performance monitoring
class RuntimeMonitor {
    constructor() {
        this.metrics = new Map();
        this.observers = [];
        this.init();
    }

    init() {
        // Long task observer
        if ('PerformanceObserver' in window) {
            const longTaskObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.warn(`Long task detected: ${entry.duration}ms`);
                    this.recordMetric('longTask', entry.duration);
                });
            });

            longTaskObserver.observe({ entryTypes: ['longtask'] });
            this.observers.push(longTaskObserver);
        }

        // Layout shift observer
        if ('PerformanceObserver' in window) {
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;

                list.getEntries().forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });

                if (clsValue > 0) {
                    this.recordMetric('cumulativeLayoutShift', clsValue);
                }
            });

            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(clsObserver);
        }
    }

    recordMetric(name, value) {
        if (!this.metrics.has(name)) {
            this.metrics.set(name, []);
        }

        this.metrics.get(name).push({
            value,
            timestamp: Date.now()
        });
    }

    getMetrics() {
        const result = {};

        this.metrics.forEach((values, name) => {
            result[name] = {
                count: values.length,
                average: values.reduce((sum, item) => sum + item.value, 0) / values.length,
                max: Math.max(...values.map(item => item.value)),
                min: Math.min(...values.map(item => item.value))
            };
        });

        return result;
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.metrics.clear();
    }
}
```

---

## 9. Deployment and CI/CD

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

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
    - uses: actions/checkout@v3

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run linting
      run: npm run lint

    - name: Run type checking
      run: npm run type-check

    - name: Run tests
      run: npm run test:coverage

    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

    - name: Run E2E tests
      run: |
        npm run build
        npm run start:ci &
        npm run test:e2e:ci

  build:
    needs: test
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build application
      run: npm run build
      env:
        NODE_ENV: production
        API_URL: ${{ secrets.API_URL }}

    - name: Run Lighthouse CI
      run: |
        npm install -g @lhci/cli@0.12.x
        lhci autorun
      env:
        LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist/

    - name: Deploy to production
      run: |
        # Deploy to your hosting service
        echo "Deploying to production..."
```

### Modern Development Workflow

```javascript
// Complete development workflow example
// package.json scripts
{
  "scripts": {
    // Development
    "dev": "webpack serve --mode development",
    "dev:https": "webpack serve --mode development --https",
    "dev:analyze": "webpack serve --mode development --env analyze",

    // Building
    "build": "webpack --mode production",
    "build:analyze": "webpack --mode production --env analyze",
    "build:stats": "webpack --mode production --json > stats.json",

    // Testing
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress open",
    "test:e2e:ci": "cypress run",

    // Code quality
    "lint": "eslint src/**/*.{js,jsx,ts,tsx}",
    "lint:fix": "eslint src/**/*.{js,jsx,ts,tsx} --fix",
    "format": "prettier --write src/**/*.{js,jsx,ts,tsx,css,md}",
    "type-check": "tsc --noEmit",

    // Performance
    "lighthouse": "lhci autorun",
    "bundle-analyzer": "webpack-bundle-analyzer dist/stats.json",

    // Maintenance
    "clean": "rimraf dist coverage .cache",
    "deps:check": "npm outdated",
    "deps:update": "npm update",
    "security:audit": "npm audit",
    "security:fix": "npm audit fix",

    // Release
    "version": "standard-version",
    "release": "npm run build && npm run test && npm publish",
    "prepublishOnly": "npm run build && npm run test"
  }
}

// Development server with full features
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const history = require('connect-history-api-fallback');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Security middleware
app.use(helmet());

// Compression
app.use(compression());

// Development middleware
if (process.env.NODE_ENV === 'development') {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: 'minimal'
    }));

    app.use(webpackHotMiddleware(compiler));
}

// SPA history fallback
app.use(history({
    disableDotRule: true,
    verbose: true
}));

// Static files
app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Local: http://localhost:${PORT}`);

    if (process.env.NODE_ENV === 'development') {
        console.log('🔥 Hot reloading enabled');
    }
});
```

This comprehensive guide covers all the essential tools and practices for modern JavaScript development. Master these concepts to build professional, maintainable, and scalable applications!
```
```

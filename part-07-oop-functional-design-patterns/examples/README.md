# Part 7 Examples: OOP, Functional JS & Design Patterns

This folder contains practical examples demonstrating Object-Oriented Programming, Functional Programming, and Design Patterns in JavaScript.

## 📂 Files Overview

- **`oop-examples.js`** - Object-Oriented Programming concepts and patterns
- **`functional-examples.js`** - Functional Programming paradigms and techniques
- **`creational-patterns.js`** - Singleton, Factory, Builder, and Prototype patterns
- **`structural-patterns.js`** - Adapter, Decorator, Facade, and Composite patterns
- **`behavioral-patterns.js`** - Observer, Strategy, Command, and State patterns
- **`functional-patterns.js`** - Monads, Functors, and functional composition
- **`modern-patterns.js`** - Modern JavaScript patterns and best practices
- **`real-world-examples.js`** - Complete applications using multiple patterns

## 🚀 How to Run These Examples

### Prerequisites
```bash
# Node.js (version 14 or higher for modern features)
node --version

# Optional: Install additional functional programming libraries
npm install ramda lodash/fp immutable
```

### Running Examples
```bash
# Run individual example files
node oop-examples.js
node functional-examples.js
node creational-patterns.js

# Or run all examples
node real-world-examples.js
```

## 📚 What You'll Learn

### From `oop-examples.js`:
- ES6 Classes and inheritance
- Private fields and methods
- Composition over inheritance
- Prototypal inheritance patterns
- Encapsulation and abstraction
- Polymorphism in JavaScript

### From `functional-examples.js`:
- Pure functions and immutability
- Higher-order functions
- Function composition and currying
- Monads and functional error handling
- Functional data transformations
- Lazy evaluation techniques

### From `creational-patterns.js`:
- Singleton pattern for global state
- Factory patterns for object creation
- Builder pattern for complex objects
- Prototype pattern for object cloning
- Abstract factory for families of objects

### From `structural-patterns.js`:
- Adapter pattern for interface compatibility
- Decorator pattern for extending functionality
- Facade pattern for simplified interfaces
- Composite pattern for tree structures
- Proxy pattern for controlled access

### From `behavioral-patterns.js`:
- Observer pattern for event handling
- Strategy pattern for algorithm selection
- Command pattern for action encapsulation
- State pattern for state machines
- Iterator pattern for data traversal

### From `functional-patterns.js`:
- Maybe monad for null handling
- Either monad for error handling
- IO monad for side effects
- Functor and Applicative patterns
- Lens pattern for data access

### From `modern-patterns.js`:
- Module patterns and namespacing
- Revealing module pattern
- Mixin patterns for code reuse
- Dependency injection patterns
- Async patterns and error handling

### From `real-world-examples.js`:
- Complete e-commerce system
- Task management application
- Game engine architecture
- API client with multiple patterns
- State management system

## 🎯 Key Concepts Demonstrated

### 1. Object-Oriented Design
```javascript
// Encapsulation with private fields
class BankAccount {
    #balance = 0;
    
    deposit(amount) {
        this.#balance += amount;
        return this.#balance;
    }
    
    get balance() {
        return this.#balance;
    }
}

// Inheritance and polymorphism
class Animal {
    speak() { console.log('Animal makes a sound'); }
}

class Dog extends Animal {
    speak() { console.log('Dog barks'); }
}
```

### 2. Functional Programming
```javascript
// Pure functions and immutability
const add = (a, b) => a + b;
const multiply = (factor) => (number) => number * factor;

// Function composition
const compose = (...fns) => (value) => 
    fns.reduceRight((acc, fn) => fn(acc), value);

const addThenMultiply = compose(multiply(2), add(1));
```

### 3. Design Patterns
```javascript
// Observer pattern
class EventEmitter {
    constructor() { this.events = {}; }
    
    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
}

// Strategy pattern
class PaymentProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    process(amount) {
        return this.strategy.pay(amount);
    }
}
```

### 4. Functional Error Handling
```javascript
// Maybe monad for null safety
class Maybe {
    constructor(value) { this.value = value; }
    
    static of(value) { return new Maybe(value); }
    
    map(fn) {
        return this.value == null 
            ? Maybe.of(null) 
            : Maybe.of(fn(this.value));
    }
    
    getOrElse(defaultValue) {
        return this.value == null ? defaultValue : this.value;
    }
}
```

## 🔧 Pattern Categories

### Creational Patterns
- **When to use**: Object creation and initialization
- **Benefits**: Flexible object creation, reduced coupling
- **Examples**: Factory for different user types, Builder for complex configurations

### Structural Patterns
- **When to use**: Object composition and relationships
- **Benefits**: Code reuse, interface adaptation
- **Examples**: Adapter for third-party APIs, Decorator for feature enhancement

### Behavioral Patterns
- **When to use**: Object interaction and responsibilities
- **Benefits**: Loose coupling, flexible communication
- **Examples**: Observer for event systems, Strategy for algorithm selection

### Functional Patterns
- **When to use**: Data transformation and error handling
- **Benefits**: Predictable code, easier testing
- **Examples**: Monads for safe operations, Composition for data pipelines

## 🧪 Hands-On Exercises

### Exercise 1: Design Pattern Selection
Given these scenarios, choose the appropriate pattern:
1. Creating different types of database connections
2. Adding logging to existing functions
3. Handling user authentication across components
4. Managing application state changes
5. Processing payments with different methods

### Exercise 2: Refactoring to Patterns
Take this procedural code and refactor using patterns:
```javascript
// Procedural code
function processOrder(order) {
    // Validation logic
    // Payment processing
    // Inventory update
    // Email notification
    // Logging
}
```

### Exercise 3: Functional Transformation
Convert this imperative code to functional style:
```javascript
// Imperative
function processUsers(users) {
    const result = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].age >= 18) {
            result.push({
                ...users[i],
                status: 'adult'
            });
        }
    }
    return result;
}
```

### Exercise 4: Pattern Combination
Build a system that combines multiple patterns:
- Factory for creating different UI components
- Observer for component communication
- Strategy for different rendering engines
- Decorator for adding features to components

## 🚨 Common Pitfalls and Solutions

### 1. Overusing Patterns
```javascript
// Problem: Pattern for the sake of pattern
class SimpleCalculator {
    constructor(strategy) {
        this.strategy = strategy;
    }
}

// Solution: Use patterns when they solve real problems
const add = (a, b) => a + b; // Simple function is better
```

### 2. Incorrect Pattern Application
```javascript
// Problem: Using Singleton for everything
class DatabaseSingleton {
    static instance;
    static getInstance() { /* ... */ }
}

// Solution: Use dependency injection
class UserService {
    constructor(database) {
        this.database = database;
    }
}
```

### 3. Mixing Paradigms Incorrectly
```javascript
// Problem: Mutating state in functional code
const processData = (data) => {
    data.processed = true; // Mutation!
    return data;
};

// Solution: Return new objects
const processData = (data) => ({
    ...data,
    processed: true
});
```

## 💡 Best Practices Demonstrated

### 1. **Choose the Right Paradigm**
- Use OOP for modeling real-world entities
- Use FP for data transformations
- Combine both when appropriate

### 2. **Pattern Selection Guidelines**
- Identify the problem first
- Choose the simplest solution
- Consider future maintainability

### 3. **Code Organization**
- Group related functionality
- Minimize dependencies
- Use clear naming conventions

### 4. **Testing Strategies**
- Pure functions are easier to test
- Mock dependencies in OOP
- Test pattern implementations thoroughly

## 🎨 Advanced Concepts

### Functional Reactive Programming
```javascript
// Stream processing with observables
const userClicks$ = fromEvent(button, 'click');
const throttledClicks$ = userClicks$.pipe(
    throttleTime(1000),
    map(event => ({ x: event.clientX, y: event.clientY }))
);
```

### Algebraic Data Types
```javascript
// Sum types with pattern matching
const Result = {
    Ok: (value) => ({ type: 'Ok', value }),
    Error: (error) => ({ type: 'Error', error })
};

const match = (result, patterns) => 
    patterns[result.type](result);
```

### Category Theory Concepts
```javascript
// Functor laws and composition
const Identity = (value) => ({
    map: (fn) => Identity(fn(value)),
    value
});

// Monad laws
const flatMap = (monad, fn) => fn(monad.value);
```

These examples provide a comprehensive foundation for understanding and applying programming paradigms and design patterns in JavaScript. Practice with real projects to master these concepts!

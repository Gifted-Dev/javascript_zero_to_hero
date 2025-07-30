# Part 7: OOP, Functional JS & Design Patterns - Exercises

Master programming paradigms and design patterns through hands-on practice! These exercises cover Object-Oriented Programming, Functional Programming, and essential design patterns that every JavaScript developer should know.

## 🎯 How to Use These Exercises

1. **Understand the problem** before jumping to solutions
2. **Choose the right paradigm** - OOP vs Functional vs Mixed approach
3. **Apply appropriate patterns** - Don't force patterns where they don't fit
4. **Focus on maintainability** - Write code that others can understand
5. **Compare with solutions** (in `solutions/` folder)

---

## 📚 Basic Level (Must Complete All)

### Exercise 1: Class Design and Inheritance
Design a vehicle hierarchy using modern JavaScript classes:

```javascript
// TODO: Create a base Vehicle class with:
// - Properties: make, model, year, isRunning
// - Methods: start(), stop(), getInfo()
// - Private field for mileage with getter/setter

class Vehicle {
    // TODO: Implement base vehicle class
}

// TODO: Create Car class that extends Vehicle with:
// - Additional property: doors
// - Override start() method with specific behavior
// - Add honk() method

class Car extends Vehicle {
    // TODO: Implement car-specific functionality
}

// TODO: Create Motorcycle class that extends Vehicle with:
// - Additional property: hasWindshield
// - Override start() method
// - Add wheelie() method

class Motorcycle extends Vehicle {
    // TODO: Implement motorcycle-specific functionality
}

// TODO: Test your implementation:
// const car = new Car('Toyota', 'Camry', 2022, 4);
// const bike = new Motorcycle('Harley', 'Davidson', 2021, false);
```

### Exercise 2: Functional Programming Basics
Convert imperative code to functional style:

```javascript
// Given imperative code:
function processStudents(students) {
    const result = [];
    for (let i = 0; i < students.length; i++) {
        if (students[i].grade >= 70) {
            const student = {
                name: students[i].name,
                grade: students[i].grade,
                status: 'passed',
                letterGrade: getLetterGrade(students[i].grade)
            };
            result.push(student);
        }
    }
    return result.sort((a, b) => b.grade - a.grade);
}

function getLetterGrade(grade) {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    return 'F';
}

// TODO: Convert to functional style using:
// - map, filter, reduce
// - Pure functions
// - Immutable data transformations
// - Function composition

const processStudentsFunctional = (students) => {
    // TODO: Implement functional version
};

// Test data:
const students = [
    { name: 'Alice', grade: 85 },
    { name: 'Bob', grade: 65 },
    { name: 'Charlie', grade: 92 },
    { name: 'Diana', grade: 78 }
];
```

### Exercise 3: Singleton Pattern
Implement a configuration manager using the Singleton pattern:

```javascript
// TODO: Create a ConfigManager singleton that:
// 1. Ensures only one instance exists
// 2. Manages application configuration
// 3. Provides methods: set(key, value), get(key), getAll(), reset()
// 4. Supports nested configuration objects
// 5. Validates configuration values

class ConfigManager {
    // TODO: Implement singleton pattern
    // TODO: Add configuration management methods
}

// TODO: Test your implementation:
// const config1 = ConfigManager.getInstance();
// const config2 = ConfigManager.getInstance();
// console.log(config1 === config2); // Should be true

// config1.set('api.url', 'https://api.example.com');
// config1.set('api.timeout', 5000);
// console.log(config2.get('api.url')); // Should work from any instance
```

### Exercise 4: Factory Pattern
Create a factory for different types of database connections:

```javascript
// TODO: Create database connection classes:
// - MySQLConnection
// - PostgreSQLConnection  
// - MongoDBConnection
// Each should have: connect(), disconnect(), query() methods

// TODO: Create DatabaseFactory that:
// 1. Creates appropriate connection based on type
// 2. Validates connection parameters
// 3. Handles unsupported database types
// 4. Optionally caches connections

class DatabaseFactory {
    static createConnection(type, config) {
        // TODO: Implement factory logic
    }
}

// TODO: Test your factory:
// const mysql = DatabaseFactory.createConnection('mysql', {
//     host: 'localhost',
//     user: 'root',
//     password: 'password'
// });
```

### Exercise 5: Observer Pattern
Implement an event system using the Observer pattern:

```javascript
// TODO: Create EventEmitter class that supports:
// 1. on(event, listener) - add event listener
// 2. off(event, listener) - remove event listener
// 3. emit(event, data) - trigger event
// 4. once(event, listener) - listen once only
// 5. Error handling for listeners

class EventEmitter {
    // TODO: Implement observer pattern
}

// TODO: Create a practical example:
// - UserManager that emits user events
// - EmailService that listens for user events
// - LoggingService that logs all events
// - NotificationService that sends notifications

class UserManager extends EventEmitter {
    // TODO: Implement user management with events
}

class EmailService {
    // TODO: Implement email service that reacts to events
}

// TODO: Test the system:
// const userManager = new UserManager();
// const emailService = new EmailService();
// userManager.on('user-registered', (user) => emailService.sendWelcomeEmail(user));
```

---

## 🚀 Intermediate Level

### Exercise 6: Higher-Order Functions and Currying
Implement advanced functional programming concepts:

```javascript
// TODO: Implement these higher-order functions:

// 1. curry - converts function to curried version
const curry = (fn) => {
    // TODO: Implement currying
};

// 2. compose - right-to-left function composition
const compose = (...fns) => {
    // TODO: Implement composition
};

// 3. pipe - left-to-right function composition
const pipe = (...fns) => {
    // TODO: Implement pipe
};

// 4. memoize - caches function results
const memoize = (fn) => {
    // TODO: Implement memoization
};

// 5. debounce - delays function execution
const debounce = (fn, delay) => {
    // TODO: Implement debouncing
};

// 6. throttle - limits function execution rate
const throttle = (fn, limit) => {
    // TODO: Implement throttling
};

// TODO: Test your implementations:
// const add = (a, b, c) => a + b + c;
// const curriedAdd = curry(add);
// console.log(curriedAdd(1)(2)(3)); // 6

// const addOne = x => x + 1;
// const double = x => x * 2;
// const addOneThenDouble = compose(double, addOne);
// console.log(addOneThenDouble(3)); // 8
```

### Exercise 7: Builder Pattern
Create a complex object builder for SQL queries:

```javascript
// TODO: Implement QueryBuilder that supports:
// 1. SELECT with columns
// 2. FROM with table name
// 3. WHERE with conditions
// 4. JOIN operations
// 5. ORDER BY and GROUP BY
// 6. LIMIT and OFFSET
// 7. Method chaining

class QueryBuilder {
    constructor() {
        // TODO: Initialize query parts
    }
    
    select(columns) {
        // TODO: Implement SELECT
        return this; // Enable chaining
    }
    
    from(table) {
        // TODO: Implement FROM
        return this;
    }
    
    where(condition) {
        // TODO: Implement WHERE
        return this;
    }
    
    join(table, condition) {
        // TODO: Implement JOIN
        return this;
    }
    
    orderBy(column, direction = 'ASC') {
        // TODO: Implement ORDER BY
        return this;
    }
    
    limit(count) {
        // TODO: Implement LIMIT
        return this;
    }
    
    build() {
        // TODO: Generate final SQL string
    }
}

// TODO: Test your builder:
// const query = new QueryBuilder()
//     .select(['name', 'email'])
//     .from('users')
//     .where('age > 18')
//     .orderBy('name')
//     .limit(10)
//     .build();
// console.log(query); // Should output valid SQL
```

### Exercise 8: Strategy Pattern
Implement a sorting system with multiple algorithms:

```javascript
// TODO: Create sorting strategy interface and implementations:
// 1. BubbleSort
// 2. QuickSort
// 3. MergeSort
// 4. InsertionSort

class SortStrategy {
    sort(data) {
        throw new Error('sort method must be implemented');
    }
}

class BubbleSort extends SortStrategy {
    // TODO: Implement bubble sort
}

class QuickSort extends SortStrategy {
    // TODO: Implement quick sort
}

class MergeSort extends SortStrategy {
    // TODO: Implement merge sort
}

// TODO: Create SortContext that:
// 1. Uses different strategies
// 2. Can switch strategies at runtime
// 3. Measures performance of each algorithm
// 4. Recommends best strategy based on data size

class SortContext {
    constructor(strategy) {
        // TODO: Implement context
    }
    
    setStrategy(strategy) {
        // TODO: Allow strategy switching
    }
    
    sort(data) {
        // TODO: Execute sorting with current strategy
    }
    
    benchmark(data, strategies) {
        // TODO: Test all strategies and return performance metrics
    }
}

// TODO: Test with different data sizes and types
```

### Exercise 9: Decorator Pattern
Create a flexible logging and caching system:

```javascript
// TODO: Implement function decorators for:
// 1. Logging (input/output)
// 2. Performance timing
// 3. Caching/memoization
// 4. Error handling
// 5. Retry logic
// 6. Rate limiting

// Base decorator
const withLogging = (fn) => {
    // TODO: Add logging to function
};

const withTiming = (fn) => {
    // TODO: Add performance timing
};

const withCaching = (fn) => {
    // TODO: Add caching functionality
};

const withRetry = (maxRetries = 3) => (fn) => {
    // TODO: Add retry logic
};

const withRateLimit = (maxCalls, timeWindow) => (fn) => {
    // TODO: Add rate limiting
};

// TODO: Create a decorator composer
const decorateFunction = (fn, ...decorators) => {
    // TODO: Apply multiple decorators to a function
};

// TODO: Test your decorators:
// const expensiveFunction = (n) => {
//     // Simulate expensive operation
//     return n * n;
// };

// const decoratedFunction = decorateFunction(
//     expensiveFunction,
//     withLogging,
//     withTiming,
//     withCaching,
//     withRetry(3)
// );
```

### Exercise 10: Command Pattern
Build an undo/redo system for a text editor:

```javascript
// TODO: Implement command pattern for text editor:
// 1. Commands: Insert, Delete, Replace
// 2. Undo/Redo functionality
// 3. Macro commands (multiple commands as one)
// 4. Command history with limits

class Command {
    execute() {
        throw new Error('execute method must be implemented');
    }
    
    undo() {
        throw new Error('undo method must be implemented');
    }
}

class TextEditor {
    constructor() {
        this.content = '';
    }
    
    // TODO: Implement basic text operations
}

class InsertCommand extends Command {
    // TODO: Implement text insertion
}

class DeleteCommand extends Command {
    // TODO: Implement text deletion
}

class ReplaceCommand extends Command {
    // TODO: Implement text replacement
}

class MacroCommand extends Command {
    // TODO: Implement composite command
}

class CommandManager {
    // TODO: Implement undo/redo functionality
}

// TODO: Test the system:
// const editor = new TextEditor();
// const manager = new CommandManager();
// 
// manager.execute(new InsertCommand(editor, 'Hello'));
// manager.execute(new InsertCommand(editor, ' World'));
// manager.undo(); // Should remove ' World'
// manager.redo(); // Should add ' World' back
```

---

## 🔥 Advanced Level

### Exercise 11: Monad Implementation
Create a comprehensive monad library:

```javascript
// TODO: Implement Maybe monad for null safety
class Maybe {
    constructor(value) {
        this.value = value;
    }
    
    static of(value) {
        // TODO: Create Maybe instance
    }
    
    static nothing() {
        // TODO: Create empty Maybe
    }
    
    map(fn) {
        // TODO: Apply function if value exists
    }
    
    flatMap(fn) {
        // TODO: Flatten nested Maybes
    }
    
    filter(predicate) {
        // TODO: Filter based on predicate
    }
    
    getOrElse(defaultValue) {
        // TODO: Get value or default
    }
}

// TODO: Implement Either monad for error handling
class Either {
    // TODO: Implement Left/Right pattern
}

// TODO: Implement IO monad for side effects
class IO {
    // TODO: Implement IO operations
}

// TODO: Create practical examples using monads:
// - Safe property access
// - Error handling in async operations
// - Composable validations
```

### Exercise 12: Functional Reactive Programming
Build a reactive system for handling events:

```javascript
// TODO: Implement Observable pattern for reactive programming
class Observable {
    constructor(subscribe) {
        this.subscribe = subscribe;
    }
    
    static of(value) {
        // TODO: Create observable from value
    }
    
    static fromEvent(element, eventType) {
        // TODO: Create observable from DOM events
    }
    
    map(fn) {
        // TODO: Transform values
    }
    
    filter(predicate) {
        // TODO: Filter values
    }
    
    debounce(delay) {
        // TODO: Debounce emissions
    }
    
    throttle(delay) {
        // TODO: Throttle emissions
    }
    
    merge(other) {
        // TODO: Merge with another observable
    }
    
    combineLatest(other) {
        // TODO: Combine latest values
    }
}

// TODO: Create practical examples:
// - Search with debouncing
// - Form validation
// - Real-time data updates
// - Animation sequences
```

### Exercise 13: Micro-Architecture Pattern
Design a plugin-based architecture:

```javascript
// TODO: Create a plugin system that supports:
// 1. Plugin registration and discovery
// 2. Dependency injection
// 3. Event-driven communication
// 4. Hot-swapping of plugins
// 5. Plugin lifecycle management

class PluginManager {
    // TODO: Implement plugin management
}

class Plugin {
    // TODO: Define plugin interface
}

// TODO: Create example plugins:
// - Authentication plugin
// - Logging plugin
// - Caching plugin
// - Analytics plugin

// TODO: Demonstrate plugin composition and communication
```

### Exercise 14: State Machine Pattern
Implement a finite state machine:

```javascript
// TODO: Create a state machine for:
// 1. User authentication flow
// 2. Order processing workflow
// 3. Game character states
// 4. UI component states

class StateMachine {
    constructor(initialState, states, transitions) {
        // TODO: Initialize state machine
    }
    
    transition(event, data) {
        // TODO: Handle state transitions
    }
    
    getCurrentState() {
        // TODO: Get current state
    }
    
    canTransition(event) {
        // TODO: Check if transition is valid
    }
    
    onStateChange(callback) {
        // TODO: Register state change listeners
    }
}

// TODO: Create practical state machines:
// - Traffic light system
// - Vending machine
// - Game character AI
// - Form wizard
```

### Exercise 15: Advanced Composition Patterns
Create a system that combines multiple design patterns:

```javascript
// TODO: Build a complete application that uses:
// 1. Factory for creating different user types
// 2. Observer for event handling
// 3. Strategy for different business rules
// 4. Decorator for adding features
// 5. Command for user actions
// 6. State for application state management

// Example: E-commerce system with:
// - Different user types (Customer, Admin, Vendor)
// - Event-driven architecture
// - Multiple payment strategies
// - Feature toggles via decorators
// - Undo/redo for admin actions
// - Order state management

class ECommerceSystem {
    // TODO: Implement comprehensive system
}

// TODO: Demonstrate how patterns work together
// TODO: Show benefits of pattern composition
// TODO: Handle complex business scenarios
```

---

## 🎨 Creative Challenges

### Challenge 1: Design Pattern Detector
Create a tool that analyzes JavaScript code and identifies design patterns:
- Parse AST to detect pattern structures
- Suggest pattern improvements
- Generate pattern documentation

### Challenge 2: Functional Programming Compiler
Build a mini-compiler that:
- Converts imperative code to functional style
- Optimizes function compositions
- Generates immutable data structures

### Challenge 3: Pattern-Based Code Generator
Create a system that:
- Generates boilerplate code for patterns
- Creates pattern combinations
- Provides interactive pattern selection

---

## 🧪 Testing Your Solutions

For each exercise, verify:

1. **Correctness** - Patterns are implemented correctly
2. **Flexibility** - Code can handle different scenarios
3. **Maintainability** - Code is easy to understand and modify
4. **Performance** - Patterns don't introduce unnecessary overhead
5. **Testability** - Code can be easily unit tested

## 💡 Hints

- Start with simple implementations and add complexity gradually
- Focus on the problem the pattern solves, not just the implementation
- Consider when NOT to use a pattern - simplicity is often better
- Practice combining patterns in realistic scenarios
- Write tests to verify pattern behavior

## 🎯 Success Criteria

You've mastered programming paradigms and patterns when you can:
- ✅ Choose the right paradigm for different problems
- ✅ Implement design patterns correctly and appropriately
- ✅ Combine multiple patterns effectively
- ✅ Recognize when patterns are overkill
- ✅ Write maintainable and testable code
- ✅ Explain the trade-offs of different approaches

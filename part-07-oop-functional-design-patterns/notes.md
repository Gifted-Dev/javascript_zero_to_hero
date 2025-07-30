# Part 7: OOP, Functional JS & Design Patterns - Complete Guide
## Master Programming Paradigms and Design Patterns in JavaScript

Welcome to the advanced programming concepts part! This section covers Object-Oriented Programming, Functional Programming, and essential design patterns that will make you a more effective JavaScript developer.

## 📚 Table of Contents

1. [Object-Oriented Programming in JavaScript](#object-oriented-programming-in-javascript)
2. [Functional Programming Paradigms](#functional-programming-paradigms)
3. [Creational Design Patterns](#creational-design-patterns)
4. [Structural Design Patterns](#structural-design-patterns)
5. [Behavioral Design Patterns](#behavioral-design-patterns)
6. [Functional Programming Patterns](#functional-programming-patterns)
7. [Modern JavaScript Patterns](#modern-javascript-patterns)
8. [Architecture Patterns](#architecture-patterns)
9. [Performance Patterns](#performance-patterns)
10. [Real-World Applications](#real-world-applications)

---

## 1. Object-Oriented Programming in JavaScript

### Classes and Inheritance

```javascript
// Modern ES6 Class Syntax
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this._energy = 100; // Private-like property
    }
    
    // Public method
    speak() {
        console.log(`${this.name} makes a sound`);
        this._consumeEnergy(5);
    }
    
    // Protected-like method
    _consumeEnergy(amount) {
        this._energy = Math.max(0, this._energy - amount);
    }
    
    // Getter
    get energy() {
        return this._energy;
    }
    
    // Setter
    set energy(value) {
        if (value >= 0 && value <= 100) {
            this._energy = value;
        }
    }
    
    // Static method
    static getSpeciesInfo(species) {
        const info = {
            'dog': 'Loyal companion',
            'cat': 'Independent hunter',
            'bird': 'Flying creature'
        };
        return info[species] || 'Unknown species';
    }
}

// Inheritance
class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'dog');
        this.breed = breed;
        this.tricks = [];
    }
    
    // Override parent method
    speak() {
        console.log(`${this.name} barks: Woof!`);
        this._consumeEnergy(3); // Dogs are efficient barkers
    }
    
    // New method specific to Dog
    learnTrick(trick) {
        this.tricks.push(trick);
        console.log(`${this.name} learned ${trick}!`);
    }
    
    performTrick(trick) {
        if (this.tricks.includes(trick)) {
            console.log(`${this.name} performs ${trick}!`);
            this._consumeEnergy(10);
        } else {
            console.log(`${this.name} doesn't know ${trick}`);
        }
    }
}

// Usage
const buddy = new Dog('Buddy', 'Golden Retriever');
buddy.speak(); // "Buddy barks: Woof!"
buddy.learnTrick('sit');
buddy.performTrick('sit');
console.log(buddy.energy); // 82 (100 - 3 - 10 - 5)
```

### Private Fields and Methods (ES2022)

```javascript
class BankAccount {
    // Private fields
    #balance = 0;
    #accountNumber;
    #transactions = [];
    
    constructor(accountNumber, initialBalance = 0) {
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
        this.#addTransaction('Initial deposit', initialBalance);
    }
    
    // Private method
    #addTransaction(type, amount) {
        this.#transactions.push({
            type,
            amount,
            timestamp: new Date(),
            balance: this.#balance
        });
    }
    
    // Public methods
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        
        this.#balance += amount;
        this.#addTransaction('Deposit', amount);
        return this.#balance;
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        
        this.#balance -= amount;
        this.#addTransaction('Withdrawal', -amount);
        return this.#balance;
    }
    
    // Getter for balance (read-only access)
    get balance() {
        return this.#balance;
    }
    
    // Method to get transaction history
    getTransactionHistory() {
        // Return a copy to prevent external modification
        return [...this.#transactions];
    }
    
    // Static method for account validation
    static isValidAccountNumber(accountNumber) {
        return /^\d{10}$/.test(accountNumber);
    }
}

// Usage
const account = new BankAccount('1234567890', 1000);
account.deposit(500);
account.withdraw(200);
console.log(account.balance); // 1300
// console.log(account.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class
```

### Composition over Inheritance

```javascript
// Composition pattern - more flexible than inheritance
class Flyable {
    fly() {
        console.log('Flying through the air');
    }
    
    land() {
        console.log('Landing safely');
    }
}

class Swimmable {
    swim() {
        console.log('Swimming in water');
    }
    
    dive() {
        console.log('Diving underwater');
    }
}

class Walkable {
    walk() {
        console.log('Walking on ground');
    }
    
    run() {
        console.log('Running fast');
    }
}

// Mixin function to combine behaviors
function mixin(target, ...sources) {
    sources.forEach(source => {
        Object.getOwnPropertyNames(source.prototype).forEach(name => {
            if (name !== 'constructor') {
                target.prototype[name] = source.prototype[name];
            }
        });
    });
}

// Create animals with specific abilities
class Duck {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} quacks`);
    }
}

class Fish {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} blows bubbles`);
    }
}

class Bird {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} chirps`);
    }
}

// Apply mixins
mixin(Duck, Flyable, Swimmable, Walkable);
mixin(Fish, Swimmable);
mixin(Bird, Flyable, Walkable);

// Usage
const donald = new Duck('Donald');
donald.speak(); // "Donald quacks"
donald.fly();   // "Flying through the air"
donald.swim();  // "Swimming in water"
donald.walk();  // "Walking on ground"

const nemo = new Fish('Nemo');
nemo.speak(); // "Nemo blows bubbles"
nemo.swim();  // "Swimming in water"
// nemo.fly(); // TypeError: nemo.fly is not a function
```

### Prototypal Inheritance (Traditional)

```javascript
// Constructor function pattern
function Vehicle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
}

// Methods on prototype
Vehicle.prototype.start = function() {
    if (!this.isRunning) {
        this.isRunning = true;
        console.log(`${this.make} ${this.model} started`);
    }
};

Vehicle.prototype.stop = function() {
    if (this.isRunning) {
        this.isRunning = false;
        console.log(`${this.make} ${this.model} stopped`);
    }
};

Vehicle.prototype.getInfo = function() {
    return `${this.year} ${this.make} ${this.model}`;
};

// Inheritance with constructor functions
function Car(make, model, year, doors) {
    Vehicle.call(this, make, model, year); // Call parent constructor
    this.doors = doors;
    this.type = 'car';
}

// Set up prototype chain
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// Add car-specific methods
Car.prototype.honk = function() {
    console.log(`${this.make} ${this.model} honks: Beep beep!`);
};

Car.prototype.getInfo = function() {
    return `${Vehicle.prototype.getInfo.call(this)} (${this.doors} doors)`;
};

// Usage
const myCar = new Car('Toyota', 'Camry', 2022, 4);
myCar.start(); // "Toyota Camry started"
myCar.honk();  // "Toyota Camry honks: Beep beep!"
console.log(myCar.getInfo()); // "2022 Toyota Camry (4 doors)"
```

---

## 2. Functional Programming Paradigms

### Pure Functions and Immutability

```javascript
// Pure functions - same input always produces same output, no side effects
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const square = x => x * x;

// Impure function (has side effects)
let counter = 0;
const impureIncrement = () => ++counter; // Modifies external state

// Pure version
const pureIncrement = (count) => count + 1;

// Working with immutable data
const originalArray = [1, 2, 3, 4, 5];

// Instead of mutating, create new arrays
const doubled = originalArray.map(x => x * 2);
const filtered = originalArray.filter(x => x > 2);
const reduced = originalArray.reduce((sum, x) => sum + x, 0);

console.log(originalArray); // [1, 2, 3, 4, 5] - unchanged
console.log(doubled);       // [2, 4, 6, 8, 10]
console.log(filtered);      // [3, 4, 5]
console.log(reduced);       // 15

// Immutable object updates
const originalUser = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        country: 'USA'
    }
};

// Using spread operator for shallow copy
const updatedUser = {
    ...originalUser,
    age: 31
};

// Deep update using spread
const userWithNewCity = {
    ...originalUser,
    address: {
        ...originalUser.address,
        city: 'Los Angeles'
    }
};

// Using Immutable.js for complex immutable operations
// const { Map, List } = require('immutable');
// const immutableUser = Map(originalUser);
// const updatedImmutableUser = immutableUser.set('age', 31);
```

### Higher-Order Functions

```javascript
// Functions that take other functions as arguments or return functions

// Function that returns a function
const createMultiplier = (factor) => {
    return (number) => number * factor;
};

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Function that takes a function as argument
const applyOperation = (numbers, operation) => {
    return numbers.map(operation);
};

const numbers = [1, 2, 3, 4, 5];
const squared = applyOperation(numbers, x => x * x);
const cubed = applyOperation(numbers, x => x * x * x);

console.log(squared); // [1, 4, 9, 16, 25]
console.log(cubed);   // [1, 8, 27, 64, 125]

// Practical higher-order functions
const createValidator = (validationFn, errorMessage) => {
    return (value) => {
        if (validationFn(value)) {
            return { isValid: true, value };
        } else {
            return { isValid: false, error: errorMessage };
        }
    };
};

const isEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isNotEmpty = (value) => value && value.trim().length > 0;
const isMinLength = (min) => (value) => value && value.length >= min;

const validateEmail = createValidator(isEmail, 'Invalid email format');
const validateRequired = createValidator(isNotEmpty, 'Field is required');
const validatePassword = createValidator(isMinLength(8), 'Password must be at least 8 characters');

console.log(validateEmail('test@example.com')); // { isValid: true, value: 'test@example.com' }
console.log(validateEmail('invalid-email'));    // { isValid: false, error: 'Invalid email format' }
```

### Function Composition and Currying

```javascript
// Function composition - combining simple functions to build complex ones
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

// Simple functions
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

// Composed functions
const addOneThenDouble = compose(double, addOne);
const doubleAddOneSquare = pipe(double, addOne, square);

console.log(addOneThenDouble(3)); // 8 (3 + 1 = 4, 4 * 2 = 8)
console.log(doubleAddOneSquare(3)); // 49 (3 * 2 = 6, 6 + 1 = 7, 7 * 7 = 49)

// Currying - transforming a function with multiple arguments into a sequence of functions
const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
};

// Regular function
const add3Numbers = (a, b, c) => a + b + c;

// Curried version
const curriedAdd = curry(add3Numbers);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// Practical currying example
const createApiCall = curry((method, url, data) => {
    return fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
});

const get = createApiCall('GET');
const post = createApiCall('POST');
const put = createApiCall('PUT');

// Partially applied functions
const getUsers = get('/api/users');
const createUser = post('/api/users');
const updateUser = put('/api/users');

// Usage
// getUsers().then(response => response.json());
// createUser({ name: 'John', email: 'john@example.com' });
```

### Monads and Functional Error Handling

```javascript
// Maybe Monad - handles null/undefined values gracefully
class Maybe {
    constructor(value) {
        this.value = value;
    }
    
    static of(value) {
        return new Maybe(value);
    }
    
    static nothing() {
        return new Maybe(null);
    }
    
    isNothing() {
        return this.value === null || this.value === undefined;
    }
    
    map(fn) {
        return this.isNothing() ? Maybe.nothing() : Maybe.of(fn(this.value));
    }
    
    flatMap(fn) {
        return this.isNothing() ? Maybe.nothing() : fn(this.value);
    }
    
    filter(predicate) {
        return this.isNothing() || !predicate(this.value) ? Maybe.nothing() : this;
    }
    
    getOrElse(defaultValue) {
        return this.isNothing() ? defaultValue : this.value;
    }
}

// Usage
const user = {
    name: 'John',
    address: {
        street: '123 Main St',
        city: 'New York'
    }
};

const getNestedProperty = (obj, path) => {
    return path.split('.').reduce((current, key) => {
        return current ? current[key] : null;
    }, obj);
};

const getUserCity = (user) => {
    return Maybe.of(user)
        .map(u => u.address)
        .map(addr => addr.city)
        .getOrElse('Unknown City');
};

console.log(getUserCity(user)); // "New York"
console.log(getUserCity({}));   // "Unknown City"

// Either Monad - handles success/failure scenarios
class Either {
    constructor(value, isRight = true) {
        this.value = value;
        this.isRight = isRight;
    }
    
    static right(value) {
        return new Either(value, true);
    }
    
    static left(value) {
        return new Either(value, false);
    }
    
    map(fn) {
        return this.isRight ? Either.right(fn(this.value)) : this;
    }
    
    flatMap(fn) {
        return this.isRight ? fn(this.value) : this;
    }
    
    mapLeft(fn) {
        return this.isRight ? this : Either.left(fn(this.value));
    }
    
    fold(leftFn, rightFn) {
        return this.isRight ? rightFn(this.value) : leftFn(this.value);
    }
}

// Usage with validation
const validateAge = (age) => {
    if (typeof age !== 'number') {
        return Either.left('Age must be a number');
    }
    if (age < 0) {
        return Either.left('Age cannot be negative');
    }
    if (age > 150) {
        return Either.left('Age seems unrealistic');
    }
    return Either.right(age);
};

const processAge = (age) => {
    return validateAge(age)
        .map(validAge => `Age is ${validAge}`)
        .fold(
            error => `Error: ${error}`,
            success => success
        );
};

console.log(processAge(25));    // "Age is 25"
console.log(processAge(-5));    // "Error: Age cannot be negative"
console.log(processAge('abc')); // "Error: Age must be a number"
```

---

## 3. Creational Design Patterns

### Singleton Pattern

```javascript
// Singleton - ensures only one instance of a class exists
class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }

        this.connection = null;
        this.isConnected = false;
        DatabaseConnection.instance = this;
    }

    connect() {
        if (!this.isConnected) {
            this.connection = 'Database connection established';
            this.isConnected = true;
            console.log('Connected to database');
        }
        return this.connection;
    }

    disconnect() {
        if (this.isConnected) {
            this.connection = null;
            this.isConnected = false;
            console.log('Disconnected from database');
        }
    }

    query(sql) {
        if (!this.isConnected) {
            throw new Error('Not connected to database');
        }
        return `Executing query: ${sql}`;
    }
}

// Module-based Singleton (more common in JavaScript)
const ConfigManager = (() => {
    let instance;
    let config = {};

    function createInstance() {
        return {
            set(key, value) {
                config[key] = value;
            },

            get(key) {
                return config[key];
            },

            getAll() {
                return { ...config };
            },

            reset() {
                config = {};
            }
        };
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// Usage
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1 === db2); // true - same instance

const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();
console.log(config1 === config2); // true - same instance
```

### Factory Pattern

```javascript
// Factory Pattern - creates objects without specifying exact classes
class Car {
    constructor(make, model, type) {
        this.make = make;
        this.model = model;
        this.type = type;
    }

    start() {
        console.log(`${this.make} ${this.model} started`);
    }
}

class Motorcycle {
    constructor(make, model, type) {
        this.make = make;
        this.model = model;
        this.type = type;
    }

    start() {
        console.log(`${this.make} ${this.model} motorcycle started`);
    }
}

class Truck {
    constructor(make, model, type) {
        this.make = make;
        this.model = model;
        this.type = type;
        this.capacity = '10 tons';
    }

    start() {
        console.log(`${this.make} ${this.model} truck started`);
    }
}

// Factory
class VehicleFactory {
    static createVehicle(type, make, model) {
        switch (type.toLowerCase()) {
            case 'car':
                return new Car(make, model, type);
            case 'motorcycle':
                return new Motorcycle(make, model, type);
            case 'truck':
                return new Truck(make, model, type);
            default:
                throw new Error(`Vehicle type ${type} is not supported`);
        }
    }
}

// Abstract Factory Pattern
class UIComponentFactory {
    createButton() {
        throw new Error('createButton method must be implemented');
    }

    createInput() {
        throw new Error('createInput method must be implemented');
    }
}

class WebUIFactory extends UIComponentFactory {
    createButton() {
        return {
            type: 'web-button',
            render() {
                return '<button>Web Button</button>';
            }
        };
    }

    createInput() {
        return {
            type: 'web-input',
            render() {
                return '<input type="text" />';
            }
        };
    }
}

class MobileUIFactory extends UIComponentFactory {
    createButton() {
        return {
            type: 'mobile-button',
            render() {
                return 'Native Mobile Button';
            }
        };
    }

    createInput() {
        return {
            type: 'mobile-input',
            render() {
                return 'Native Mobile Input';
            }
        };
    }
}

// Usage
const car = VehicleFactory.createVehicle('car', 'Toyota', 'Camry');
const motorcycle = VehicleFactory.createVehicle('motorcycle', 'Harley', 'Davidson');

car.start(); // "Toyota Camry started"
motorcycle.start(); // "Harley Davidson motorcycle started"

const webFactory = new WebUIFactory();
const mobileFactory = new MobileUIFactory();

const webButton = webFactory.createButton();
const mobileButton = mobileFactory.createButton();

console.log(webButton.render()); // "<button>Web Button</button>"
console.log(mobileButton.render()); // "Native Mobile Button"
```

### Builder Pattern

```javascript
// Builder Pattern - constructs complex objects step by step
class Computer {
    constructor() {
        this.cpu = '';
        this.ram = '';
        this.storage = '';
        this.gpu = '';
        this.motherboard = '';
        this.powerSupply = '';
    }

    getSpecs() {
        return {
            cpu: this.cpu,
            ram: this.ram,
            storage: this.storage,
            gpu: this.gpu,
            motherboard: this.motherboard,
            powerSupply: this.powerSupply
        };
    }
}

class ComputerBuilder {
    constructor() {
        this.computer = new Computer();
    }

    setCPU(cpu) {
        this.computer.cpu = cpu;
        return this; // Return this for method chaining
    }

    setRAM(ram) {
        this.computer.ram = ram;
        return this;
    }

    setStorage(storage) {
        this.computer.storage = storage;
        return this;
    }

    setGPU(gpu) {
        this.computer.gpu = gpu;
        return this;
    }

    setMotherboard(motherboard) {
        this.computer.motherboard = motherboard;
        return this;
    }

    setPowerSupply(powerSupply) {
        this.computer.powerSupply = powerSupply;
        return this;
    }

    build() {
        return this.computer;
    }
}

// Director class for common configurations
class ComputerDirector {
    static buildGamingPC(builder) {
        return builder
            .setCPU('Intel i9-12900K')
            .setRAM('32GB DDR4')
            .setStorage('1TB NVMe SSD')
            .setGPU('NVIDIA RTX 4080')
            .setMotherboard('ASUS ROG Strix Z690')
            .setPowerSupply('850W 80+ Gold')
            .build();
    }

    static buildOfficePC(builder) {
        return builder
            .setCPU('Intel i5-12400')
            .setRAM('16GB DDR4')
            .setStorage('512GB SSD')
            .setGPU('Integrated Graphics')
            .setMotherboard('MSI B660M')
            .setPowerSupply('500W 80+ Bronze')
            .build();
    }
}

// Usage
const customPC = new ComputerBuilder()
    .setCPU('AMD Ryzen 9 5900X')
    .setRAM('64GB DDR4')
    .setStorage('2TB NVMe SSD')
    .setGPU('NVIDIA RTX 4090')
    .build();

const gamingPC = ComputerDirector.buildGamingPC(new ComputerBuilder());
const officePC = ComputerDirector.buildOfficePC(new ComputerBuilder());

console.log(customPC.getSpecs());
console.log(gamingPC.getSpecs());
```

### Prototype Pattern

```javascript
// Prototype Pattern - creates objects by cloning existing instances
class Shape {
    constructor() {
        this.type = '';
        this.color = '';
        this.x = 0;
        this.y = 0;
    }

    clone() {
        // Deep clone implementation
        const cloned = Object.create(Object.getPrototypeOf(this));
        Object.keys(this).forEach(key => {
            if (typeof this[key] === 'object' && this[key] !== null) {
                cloned[key] = JSON.parse(JSON.stringify(this[key]));
            } else {
                cloned[key] = this[key];
            }
        });
        return cloned;
    }

    draw() {
        console.log(`Drawing ${this.color} ${this.type} at (${this.x}, ${this.y})`);
    }
}

class Circle extends Shape {
    constructor() {
        super();
        this.type = 'Circle';
        this.radius = 0;
    }

    clone() {
        const cloned = super.clone();
        cloned.radius = this.radius;
        return cloned;
    }
}

class Rectangle extends Shape {
    constructor() {
        super();
        this.type = 'Rectangle';
        this.width = 0;
        this.height = 0;
    }

    clone() {
        const cloned = super.clone();
        cloned.width = this.width;
        cloned.height = this.height;
        return cloned;
    }
}

// Prototype registry
class ShapeRegistry {
    constructor() {
        this.shapes = new Map();
    }

    registerShape(name, shape) {
        this.shapes.set(name, shape);
    }

    createShape(name) {
        const prototype = this.shapes.get(name);
        return prototype ? prototype.clone() : null;
    }
}

// Usage
const registry = new ShapeRegistry();

// Create prototypes
const redCircle = new Circle();
redCircle.color = 'red';
redCircle.radius = 10;

const blueRectangle = new Rectangle();
blueRectangle.color = 'blue';
blueRectangle.width = 20;
blueRectangle.height = 15;

// Register prototypes
registry.registerShape('redCircle', redCircle);
registry.registerShape('blueRectangle', blueRectangle);

// Clone objects
const circle1 = registry.createShape('redCircle');
circle1.x = 100;
circle1.y = 100;

const circle2 = registry.createShape('redCircle');
circle2.x = 200;
circle2.y = 200;

circle1.draw(); // "Drawing red Circle at (100, 100)"
circle2.draw(); // "Drawing red Circle at (200, 200)"
```

---

## 4. Structural Design Patterns

### Adapter Pattern

```javascript
// Adapter Pattern - allows incompatible interfaces to work together
// Legacy payment system
class OldPaymentSystem {
    makePayment(amount) {
        console.log(`Processing payment of $${amount} through old system`);
        return {
            success: true,
            transactionId: Math.random().toString(36).substr(2, 9),
            timestamp: new Date()
        };
    }
}

// New payment interface
class NewPaymentInterface {
    processPayment(paymentData) {
        throw new Error('processPayment method must be implemented');
    }
}

// Adapter to make old system work with new interface
class PaymentAdapter extends NewPaymentInterface {
    constructor(oldPaymentSystem) {
        super();
        this.oldSystem = oldPaymentSystem;
    }

    processPayment(paymentData) {
        // Adapt the interface
        const { amount, currency = 'USD' } = paymentData;
        const result = this.oldSystem.makePayment(amount);

        // Transform the response to match new interface
        return {
            status: result.success ? 'completed' : 'failed',
            transactionReference: result.transactionId,
            processedAt: result.timestamp,
            amount: amount,
            currency: currency
        };
    }
}

// Third-party API adapter
class ThirdPartyAPIAdapter {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    // Standardize different API responses
    async getUser(userId) {
        try {
            const response = await this.apiClient.fetchUserData(userId);

            // Normalize different API response formats
            return {
                id: response.user_id || response.id,
                name: response.full_name || response.name || `${response.first_name} ${response.last_name}`,
                email: response.email_address || response.email,
                avatar: response.profile_picture || response.avatar_url || response.image
            };
        } catch (error) {
            throw new Error(`Failed to fetch user: ${error.message}`);
        }
    }
}

// Usage
const oldPayment = new OldPaymentSystem();
const paymentAdapter = new PaymentAdapter(oldPayment);

const result = paymentAdapter.processPayment({
    amount: 100,
    currency: 'USD'
});

console.log(result);
// {
//   status: 'completed',
//   transactionReference: 'abc123def',
//   processedAt: 2023-01-01T12:00:00.000Z,
//   amount: 100,
//   currency: 'USD'
// }
```

### Decorator Pattern

```javascript
// Decorator Pattern - adds new functionality to objects dynamically
// Base coffee class
class Coffee {
    constructor() {
        this.description = 'Simple coffee';
        this.cost = 2.00;
    }

    getDescription() {
        return this.description;
    }

    getCost() {
        return this.cost;
    }
}

// Base decorator
class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    getDescription() {
        return this.coffee.getDescription();
    }

    getCost() {
        return this.coffee.getCost();
    }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }

    getDescription() {
        return this.coffee.getDescription() + ', milk';
    }

    getCost() {
        return this.coffee.getCost() + 0.50;
    }
}

class SugarDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }

    getDescription() {
        return this.coffee.getDescription() + ', sugar';
    }

    getCost() {
        return this.coffee.getCost() + 0.25;
    }
}

class WhipDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }

    getDescription() {
        return this.coffee.getDescription() + ', whipped cream';
    }

    getCost() {
        return this.coffee.getCost() + 0.75;
    }
}

// Function-based decorator pattern
function withLogging(fn) {
    return function(...args) {
        console.log(`Calling ${fn.name} with arguments:`, args);
        const result = fn.apply(this, args);
        console.log(`${fn.name} returned:`, result);
        return result;
    };
}

function withTiming(fn) {
    return function(...args) {
        const start = performance.now();
        const result = fn.apply(this, args);
        const end = performance.now();
        console.log(`${fn.name} took ${end - start} milliseconds`);
        return result;
    };
}

function withRetry(maxRetries = 3) {
    return function(fn) {
        return async function(...args) {
            let lastError;

            for (let i = 0; i < maxRetries; i++) {
                try {
                    return await fn.apply(this, args);
                } catch (error) {
                    lastError = error;
                    console.log(`Attempt ${i + 1} failed:`, error.message);
                }
            }

            throw lastError;
        };
    };
}

// Usage
let coffee = new Coffee();
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

coffee = new MilkDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);

coffee = new SugarDecorator(coffee);
coffee = new WhipDecorator(coffee);
console.log(`${coffee.getDescription()} - $${coffee.getCost()}`);
// "Simple coffee, milk, sugar, whipped cream - $3.5"

// Function decorators
const add = (a, b) => a + b;
const decoratedAdd = withTiming(withLogging(add));
decoratedAdd(5, 3);
```

### Facade Pattern

```javascript
// Facade Pattern - provides a simplified interface to a complex subsystem
// Complex subsystem classes
class CPU {
    freeze() { console.log('CPU: Freezing processor'); }
    jump(position) { console.log(`CPU: Jumping to position ${position}`); }
    execute() { console.log('CPU: Executing instructions'); }
}

class Memory {
    load(position, data) {
        console.log(`Memory: Loading data "${data}" at position ${position}`);
    }
}

class HardDrive {
    read(lba, size) {
        console.log(`HardDrive: Reading ${size} bytes from LBA ${lba}`);
        return 'boot data';
    }
}

// Facade
class ComputerFacade {
    constructor() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    start() {
        console.log('Computer: Starting up...');
        this.cpu.freeze();
        const bootData = this.hardDrive.read(0, 1024);
        this.memory.load(0, bootData);
        this.cpu.jump(0);
        this.cpu.execute();
        console.log('Computer: System ready!');
    }
}

// API Facade example
class APIFacade {
    constructor() {
        this.userService = new UserService();
        this.authService = new AuthService();
        this.notificationService = new NotificationService();
    }

    async registerUser(userData) {
        try {
            // Complex workflow simplified
            const validatedData = await this.userService.validateUserData(userData);
            const user = await this.userService.createUser(validatedData);
            const token = await this.authService.generateToken(user.id);
            await this.notificationService.sendWelcomeEmail(user.email);

            return {
                user,
                token,
                message: 'User registered successfully'
            };
        } catch (error) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    async loginUser(email, password) {
        try {
            const user = await this.authService.authenticate(email, password);
            const token = await this.authService.generateToken(user.id);
            await this.userService.updateLastLogin(user.id);

            return { user, token };
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }
}

// Usage
const computer = new ComputerFacade();
computer.start(); // Simple interface for complex startup process
```

---

## 5. Behavioral Design Patterns

### Observer Pattern

```javascript
// Observer Pattern - defines a one-to-many dependency between objects
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listenerToRemove) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(
            listener => listener !== listenerToRemove
        );
    }

    emit(event, data) {
        if (!this.events[event]) return;

        this.events[event].forEach(listener => {
            try {
                listener(data);
            } catch (error) {
                console.error(`Error in event listener for ${event}:`, error);
            }
        });
    }

    once(event, listener) {
        const onceWrapper = (data) => {
            listener(data);
            this.off(event, onceWrapper);
        };
        this.on(event, onceWrapper);
    }
}

// Subject (Observable)
class NewsAgency extends EventEmitter {
    constructor() {
        super();
        this.news = '';
    }

    setNews(news) {
        this.news = news;
        this.emit('news-update', news);
    }

    getNews() {
        return this.news;
    }
}

// Observers
class NewsChannel {
    constructor(name) {
        this.name = name;
    }

    update(news) {
        console.log(`${this.name} broadcasting: ${news}`);
    }
}

class NewsPaper {
    constructor(name) {
        this.name = name;
    }

    update(news) {
        console.log(`${this.name} printing: ${news}`);
    }
}

// Usage
const agency = new NewsAgency();
const cnn = new NewsChannel('CNN');
const bbc = new NewsChannel('BBC');
const times = new NewsPaper('The Times');

// Subscribe observers
agency.on('news-update', (news) => cnn.update(news));
agency.on('news-update', (news) => bbc.update(news));
agency.on('news-update', (news) => times.update(news));

// Trigger updates
agency.setNews('Breaking: New JavaScript framework released!');
// CNN broadcasting: Breaking: New JavaScript framework released!
// BBC broadcasting: Breaking: New JavaScript framework released!
// The Times printing: Breaking: New JavaScript framework released!
```

### Strategy Pattern

```javascript
// Strategy Pattern - defines a family of algorithms and makes them interchangeable
// Payment strategies
class PaymentStrategy {
    pay(amount) {
        throw new Error('pay method must be implemented');
    }
}

class CreditCardPayment extends PaymentStrategy {
    constructor(cardNumber, cvv) {
        super();
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }

    pay(amount) {
        console.log(`Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`);
        return {
            method: 'credit_card',
            amount,
            transactionId: Math.random().toString(36).substr(2, 9)
        };
    }
}

class PayPalPayment extends PaymentStrategy {
    constructor(email) {
        super();
        this.email = email;
    }

    pay(amount) {
        console.log(`Paid $${amount} using PayPal account ${this.email}`);
        return {
            method: 'paypal',
            amount,
            transactionId: Math.random().toString(36).substr(2, 9)
        };
    }
}

class CryptoPayment extends PaymentStrategy {
    constructor(walletAddress, currency) {
        super();
        this.walletAddress = walletAddress;
        this.currency = currency;
    }

    pay(amount) {
        console.log(`Paid $${amount} using ${this.currency} from wallet ${this.walletAddress.slice(0, 8)}...`);
        return {
            method: 'cryptocurrency',
            amount,
            currency: this.currency,
            transactionId: Math.random().toString(36).substr(2, 9)
        };
    }
}

// Context
class ShoppingCart {
    constructor() {
        this.items = [];
        this.paymentStrategy = null;
    }

    addItem(item) {
        this.items.push(item);
    }

    setPaymentStrategy(strategy) {
        this.paymentStrategy = strategy;
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    checkout() {
        if (!this.paymentStrategy) {
            throw new Error('Payment strategy not set');
        }

        const total = this.calculateTotal();
        return this.paymentStrategy.pay(total);
    }
}

// Sorting strategies
class SortStrategy {
    sort(data) {
        throw new Error('sort method must be implemented');
    }
}

class BubbleSort extends SortStrategy {
    sort(data) {
        const arr = [...data];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }

        return arr;
    }
}

class QuickSort extends SortStrategy {
    sort(data) {
        if (data.length <= 1) return data;

        const pivot = data[Math.floor(data.length / 2)];
        const left = data.filter(x => x < pivot);
        const middle = data.filter(x => x === pivot);
        const right = data.filter(x => x > pivot);

        return [...this.sort(left), ...middle, ...this.sort(right)];
    }
}

class SortContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    sort(data) {
        return this.strategy.sort(data);
    }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ name: 'Laptop', price: 999 });
cart.addItem({ name: 'Mouse', price: 25 });

// Use different payment strategies
cart.setPaymentStrategy(new CreditCardPayment('1234567890123456', '123'));
cart.checkout();

cart.setPaymentStrategy(new PayPalPayment('user@example.com'));
cart.checkout();

// Sorting example
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sorter = new SortContext(new BubbleSort());
console.log('Bubble sort:', sorter.sort(numbers));

sorter.setStrategy(new QuickSort());
console.log('Quick sort:', sorter.sort(numbers));
```

### Command Pattern

```javascript
// Command Pattern - encapsulates a request as an object
// Receiver
class TextEditor {
    constructor() {
        this.content = '';
        this.history = [];
    }

    write(text) {
        this.content += text;
    }

    delete(length) {
        this.content = this.content.slice(0, -length);
    }

    getContent() {
        return this.content;
    }

    saveState() {
        this.history.push(this.content);
    }

    restoreState() {
        if (this.history.length > 0) {
            this.content = this.history.pop();
        }
    }
}

// Command interface
class Command {
    execute() {
        throw new Error('execute method must be implemented');
    }

    undo() {
        throw new Error('undo method must be implemented');
    }
}

// Concrete commands
class WriteCommand extends Command {
    constructor(editor, text) {
        super();
        this.editor = editor;
        this.text = text;
    }

    execute() {
        this.editor.saveState();
        this.editor.write(this.text);
    }

    undo() {
        this.editor.restoreState();
    }
}

class DeleteCommand extends Command {
    constructor(editor, length) {
        super();
        this.editor = editor;
        this.length = length;
        this.deletedText = '';
    }

    execute() {
        this.editor.saveState();
        const content = this.editor.getContent();
        this.deletedText = content.slice(-this.length);
        this.editor.delete(this.length);
    }

    undo() {
        this.editor.restoreState();
    }
}

// Invoker
class EditorInvoker {
    constructor() {
        this.history = [];
        this.currentPosition = -1;
    }

    execute(command) {
        // Remove any commands after current position (for redo functionality)
        this.history = this.history.slice(0, this.currentPosition + 1);

        command.execute();
        this.history.push(command);
        this.currentPosition++;
    }

    undo() {
        if (this.currentPosition >= 0) {
            const command = this.history[this.currentPosition];
            command.undo();
            this.currentPosition--;
        }
    }

    redo() {
        if (this.currentPosition < this.history.length - 1) {
            this.currentPosition++;
            const command = this.history[this.currentPosition];
            command.execute();
        }
    }
}

// Macro command (composite)
class MacroCommand extends Command {
    constructor(commands) {
        super();
        this.commands = commands;
    }

    execute() {
        this.commands.forEach(command => command.execute());
    }

    undo() {
        // Undo in reverse order
        for (let i = this.commands.length - 1; i >= 0; i--) {
            this.commands[i].undo();
        }
    }
}

// Usage
const editor = new TextEditor();
const invoker = new EditorInvoker();

// Execute commands
invoker.execute(new WriteCommand(editor, 'Hello '));
invoker.execute(new WriteCommand(editor, 'World!'));
console.log(editor.getContent()); // "Hello World!"

invoker.execute(new DeleteCommand(editor, 6));
console.log(editor.getContent()); // "Hello "

// Undo operations
invoker.undo();
console.log(editor.getContent()); // "Hello World!"

invoker.undo();
console.log(editor.getContent()); // "Hello "

// Redo operations
invoker.redo();
console.log(editor.getContent()); // "Hello World!"

// Macro command
const macro = new MacroCommand([
    new WriteCommand(editor, '\nThis is '),
    new WriteCommand(editor, 'a macro '),
    new WriteCommand(editor, 'command!')
]);

invoker.execute(macro);
console.log(editor.getContent()); // "Hello World!\nThis is a macro command!"
```

This comprehensive guide covers the essential programming paradigms and design patterns in JavaScript. These patterns will help you write more maintainable, scalable, and robust code. Practice implementing these patterns in real projects to master their usage!
```
```

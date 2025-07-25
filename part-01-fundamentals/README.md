# Part 1: JavaScript Fundamentals
## From Zero to JavaScript Hero - The Foundation

Welcome to your JavaScript journey! This part covers everything you need to build a solid foundation.

## 📋 Table of Contents
1. [Introduction to JavaScript](#introduction)
2. [Variables and Constants](#variables)
3. [Data Types](#data-types)
4. [Operators](#operators)
5. [Control Structures](#control-structures)
6. [Functions](#functions)
7. [Arrays](#arrays)
8. [Objects](#objects)
9. [Scope and Hoisting](#scope-hoisting)
10. [Best Practices](#best-practices)

---

## 1. Introduction to JavaScript {#introduction}

### What is JavaScript?
JavaScript is a **high-level**, **interpreted**, **dynamically-typed** programming language that runs in browsers and servers (Node.js).

### Why Learn JavaScript?
- 🌐 **Everywhere**: Frontend, Backend, Mobile, Desktop
- 💼 **High Demand**: Most popular programming language
- 🚀 **Easy to Start**: Beginner-friendly
- 🔧 **Powerful**: Can build anything from websites to games

### Setting Up
1. Open your browser's Developer Tools (F12)
2. Navigate to the Console tab
3. Start typing JavaScript!

```javascript
// Your first JavaScript code!
console.log("Hello, JavaScript World!");
```

---

## 2. Variables and Constants {#variables}

Variables are containers that store data values.

### Variable Declaration

#### `var` (Old way - avoid in modern JS)
```javascript
var name = "John";
var age = 25;
```

#### `let` (Modern way - for changing values)
```javascript
let score = 100;
score = 150; // Can be reassigned
let message; // Can declare without initial value
```

#### `const` (Modern way - for constant values)
```javascript
const PI = 3.14159;
const userName = "Alice";
// PI = 3.14; // ❌ Error! Cannot reassign const
```

### Variable Naming Rules
```javascript
// ✅ Valid names
let firstName = "John";
let age2 = 25;
let $price = 99.99;
let _isActive = true;

// ❌ Invalid names
// let 2age = 25;        // Can't start with number
// let first-name = "John"; // Can't use hyphens
// let class = "A";      // Can't use reserved words
```

### Best Practices
- Use `const` by default
- Use `let` when you need to reassign
- Avoid `var` in modern JavaScript
- Use descriptive names: `userAge` not `a`

---

## 3. Data Types {#data-types}

JavaScript has 8 data types: 7 primitive + 1 non-primitive.

### Primitive Types

#### 1. Number
```javascript
let age = 25;           // Integer
let price = 99.99;      // Decimal
let negative = -10;     // Negative
let infinity = Infinity; // Special number
let notANumber = NaN;   // Not a Number

// Number methods
console.log(typeof age);        // "number"
console.log(Number.isInteger(age)); // true
console.log(price.toFixed(2));  // "99.99"
```

#### 2. String
```javascript
let singleQuotes = 'Hello';
let doubleQuotes = "World";
let templateLiterals = `Hello ${singleQuotes}!`; // Template literals

// String methods
let text = "JavaScript";
console.log(text.length);        // 10
console.log(text.toLowerCase()); // "javascript"
console.log(text.toUpperCase()); // "JAVASCRIPT"
console.log(text.slice(0, 4));   // "Java"
```

#### 3. Boolean
```javascript
let isActive = true;
let isCompleted = false;

// Boolean conversion
console.log(Boolean(1));        // true
console.log(Boolean(0));        // false
console.log(Boolean("hello"));  // true
console.log(Boolean(""));       // false
```

#### 4. Undefined
```javascript
let x;
console.log(x);        // undefined
console.log(typeof x); // "undefined"
```

#### 5. Null
```javascript
let data = null;       // Intentionally empty
console.log(data);     // null
console.log(typeof data); // "object" (this is a known bug in JS)
```

#### 6. Symbol (ES6+)
```javascript
let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log(sym1 === sym2); // false (always unique)
```

#### 7. BigInt (ES2020)
```javascript
let bigNumber = 123456789012345678901234567890n;
let anotherWay = BigInt("123456789012345678901234567890");
```

### Non-Primitive Type

#### 8. Object
```javascript
let person = {
    name: "John",
    age: 30,
    isStudent: false
};

let numbers = [1, 2, 3, 4, 5]; // Array is also an object
let date = new Date();         // Date is also an object
```

### Type Checking
```javascript
console.log(typeof "hello");    // "string"
console.log(typeof 42);         // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" (known quirk)
console.log(typeof {});         // "object"
console.log(typeof []);         // "object"

// Better way to check arrays
console.log(Array.isArray([])); // true
```

---

## 4. Operators {#operators}

### Arithmetic Operators
```javascript
let a = 10, b = 3;

console.log(a + b);  // 13 (Addition)
console.log(a - b);  // 7  (Subtraction)
console.log(a * b);  // 30 (Multiplication)
console.log(a / b);  // 3.33... (Division)
console.log(a % b);  // 1  (Remainder/Modulo)
console.log(a ** b); // 1000 (Exponentiation)

// Increment/Decrement
let count = 5;
console.log(++count); // 6 (Pre-increment)
console.log(count++); // 6 (Post-increment, now count is 7)
console.log(--count); // 6 (Pre-decrement)
console.log(count--); // 6 (Post-decrement, now count is 5)
```

### Assignment Operators
```javascript
let x = 10;
x += 5;  // x = x + 5  -> 15
x -= 3;  // x = x - 3  -> 12
x *= 2;  // x = x * 2  -> 24
x /= 4;  // x = x / 4  -> 6
x %= 4;  // x = x % 4  -> 2
```

### Comparison Operators
```javascript
let a = 5, b = "5";

console.log(a == b);   // true  (Loose equality - type coercion)
console.log(a === b);  // false (Strict equality - no type coercion)
console.log(a != b);   // false (Loose inequality)
console.log(a !== b);  // true  (Strict inequality)

console.log(a > 3);    // true
console.log(a < 10);   // true
console.log(a >= 5);   // true
console.log(a <= 5);   // true
```

### Logical Operators
```javascript
let age = 25;
let hasLicense = true;

// AND (&&) - Both conditions must be true
console.log(age >= 18 && hasLicense); // true

// OR (||) - At least one condition must be true
console.log(age < 18 || hasLicense);  // true

// NOT (!) - Reverses the boolean value
console.log(!hasLicense);             // false

// Short-circuit evaluation
let name = null;
let displayName = name || "Guest";    // "Guest" (fallback)
console.log(displayName);
```

### String Operators
```javascript
let firstName = "John";
let lastName = "Doe";

// Concatenation
let fullName = firstName + " " + lastName; // "John Doe"

// Template literals (ES6+)
let greeting = `Hello, ${fullName}!`;      // "Hello, John Doe!"
let multiLine = `
    This is a
    multi-line
    string
`;
```

---

## 5. Control Structures {#control-structures}

### Conditional Statements

#### if...else
```javascript
let age = 18;

if (age >= 18) {
    console.log("You are an adult");
} else if (age >= 13) {
    console.log("You are a teenager");
} else {
    console.log("You are a child");
}

// Ternary operator (shorthand)
let status = age >= 18 ? "adult" : "minor";
console.log(status);
```

#### switch
```javascript
let day = "monday";

switch (day.toLowerCase()) {
    case "monday":
        console.log("Start of work week");
        break;
    case "tuesday":
    case "wednesday":
    case "thursday":
        console.log("Midweek");
        break;
    case "friday":
        console.log("TGIF!");
        break;
    case "saturday":
    case "sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Invalid day");
}
```

### Loops

#### for loop
```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
    console.log(`Count: ${i}`);
}

// for...in (for object properties)
let person = { name: "John", age: 30, city: "NYC" };
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// for...of (for iterable values)
let fruits = ["apple", "banana", "orange"];
for (let fruit of fruits) {
    console.log(fruit);
}
```

#### while loop
```javascript
let count = 0;
while (count < 3) {
    console.log(`Count is: ${count}`);
    count++;
}

// do...while (executes at least once)
let userInput;
do {
    userInput = prompt("Enter 'quit' to exit:");
} while (userInput !== "quit");
```

#### Loop Control
```javascript
for (let i = 0; i < 10; i++) {
    if (i === 3) continue; // Skip iteration
    if (i === 7) break;    // Exit loop
    console.log(i);
}
// Output: 0, 1, 2, 4, 5, 6
```

---

## 6. Functions {#functions}

Functions are reusable blocks of code.

### Function Declaration
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"
```

### Function Expression
```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};
```

### Arrow Functions (ES6+)
```javascript
// Basic arrow function
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Shortened arrow function
const greet = name => `Hello, ${name}!`;

// Multiple parameters
const add = (a, b) => a + b;

// No parameters
const getTimestamp = () => new Date().getTime();
```

### Parameters and Arguments
```javascript
// Default parameters
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}

console.log(greet());        // "Hello, Guest!"
console.log(greet("John"));  // "Hello, John!"

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

### Function Scope
```javascript
let globalVar = "I'm global";

function outer() {
    let outerVar = "I'm in outer";
    
    function inner() {
        let innerVar = "I'm in inner";
        console.log(globalVar); // Accessible
        console.log(outerVar);  // Accessible
        console.log(innerVar);  // Accessible
    }
    
    inner();
    // console.log(innerVar); // ❌ Error! Not accessible
}

outer();
```

---

## 7. Arrays {#arrays}

Arrays store multiple values in a single variable.

### Creating Arrays
```javascript
// Array literal (preferred)
let fruits = ["apple", "banana", "orange"];

// Array constructor
let numbers = new Array(1, 2, 3, 4, 5);

// Mixed data types
let mixed = ["John", 25, true, null];
```

### Array Properties and Methods
```javascript
let fruits = ["apple", "banana", "orange"];

// Properties
console.log(fruits.length); // 3

// Adding elements
fruits.push("grape");        // Add to end
fruits.unshift("mango");     // Add to beginning
console.log(fruits); // ["mango", "apple", "banana", "orange", "grape"]

// Removing elements
let lastFruit = fruits.pop();      // Remove from end
let firstFruit = fruits.shift();   // Remove from beginning
console.log(lastFruit);  // "grape"
console.log(firstFruit); // "mango"

// Finding elements
console.log(fruits.indexOf("banana"));     // 1
console.log(fruits.includes("apple"));     // true

// Slicing and splicing
let citrus = fruits.slice(1, 3);           // ["banana", "orange"]
fruits.splice(1, 1, "kiwi", "pear");      // Remove 1 element at index 1, add "kiwi", "pear"
```

### Array Iteration
```javascript
let numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// map (creates new array)
let doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter (creates new array with filtered elements)
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// reduce (reduces array to single value)
let sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15
```

---

## 8. Objects {#objects}

Objects store collections of key-value pairs.

### Creating Objects
```javascript
// Object literal (preferred)
let person = {
    name: "John",
    age: 30,
    city: "New York",
    isStudent: false
};

// Object constructor
let car = new Object();
car.brand = "Toyota";
car.model = "Camry";
car.year = 2022;
```

### Accessing Object Properties
```javascript
let person = {
    name: "John",
    age: 30,
    "favorite color": "blue" // Property with space
};

// Dot notation
console.log(person.name); // "John"

// Bracket notation
console.log(person["age"]); // 30
console.log(person["favorite color"]); // "blue"

// Dynamic property access
let property = "name";
console.log(person[property]); // "John"
```

### Object Methods
```javascript
let person = {
    name: "John",
    age: 30,
    
    // Method
    greet: function() {
        return `Hello, I'm ${this.name}`;
    },
    
    // ES6 method shorthand
    introduce() {
        return `I'm ${this.name} and I'm ${this.age} years old`;
    },
    
    // Arrow function (be careful with 'this')
    getName: () => {
        // 'this' doesn't refer to the object in arrow functions
        return this.name; // undefined in strict mode
    }
};

console.log(person.greet());     // "Hello, I'm John"
console.log(person.introduce()); // "I'm John and I'm 30 years old"
```

### Object Manipulation
```javascript
let person = { name: "John", age: 30 };

// Adding properties
person.city = "New York";
person["country"] = "USA";

// Modifying properties
person.age = 31;

// Deleting properties
delete person.city;

// Check if property exists
console.log("name" in person);           // true
console.log(person.hasOwnProperty("age")); // true

// Get all keys, values, or entries
console.log(Object.keys(person));    // ["name", "age", "country"]
console.log(Object.values(person));  // ["John", 31, "USA"]
console.log(Object.entries(person)); // [["name", "John"], ["age", 31], ["country", "USA"]]
```

### Nested Objects
```javascript
let student = {
    name: "Alice",
    address: {
        street: "123 Main St",
        city: "Boston",
        zipCode: "02101"
    },
    grades: [85, 92, 78, 96],
    getFullAddress() {
        return `${this.address.street}, ${this.address.city} ${this.address.zipCode}`;
    }
};

console.log(student.address.city);     // "Boston"
console.log(student.getFullAddress()); // "123 Main St, Boston 02101"
```

---

## 9. Scope and Hoisting {#scope-hoisting}

Understanding how JavaScript handles variable and function declarations.

### Scope Types

#### Global Scope
```javascript
var globalVar = "I'm global";
let globalLet = "I'm also global";
const globalConst = "Me too!";

function showGlobals() {
    console.log(globalVar);   // Accessible
    console.log(globalLet);   // Accessible
    console.log(globalConst); // Accessible
}
```

#### Function Scope
```javascript
function functionScope() {
    var functionVar = "I'm function scoped";
    let functionLet = "Me too";
    const functionConst = "And me";
    
    if (true) {
        console.log(functionVar);   // Accessible
        console.log(functionLet);   // Accessible
        console.log(functionConst); // Accessible
    }
}

// console.log(functionVar); // ❌ Error! Not accessible outside function
```

#### Block Scope (ES6+)
```javascript
if (true) {
    var blockVar = "I'm var in block";
    let blockLet = "I'm let in block";
    const blockConst = "I'm const in block";
}

console.log(blockVar);   // "I'm var in block" (var ignores block scope)
// console.log(blockLet);   // ❌ Error! Block scoped
// console.log(blockConst); // ❌ Error! Block scoped
```

### Hoisting

#### Variable Hoisting
```javascript
// This code:
console.log(hoistedVar); // undefined (not error!)
var hoistedVar = "I'm hoisted";

// Is interpreted as:
var hoistedVar; // Declaration is hoisted
console.log(hoistedVar); // undefined
hoistedVar = "I'm hoisted"; // Assignment stays in place

// let and const hoisting (Temporal Dead Zone)
// console.log(letVar); // ❌ ReferenceError!
let letVar = "I'm let";

// console.log(constVar); // ❌ ReferenceError!
const constVar = "I'm const";
```

#### Function Hoisting
```javascript
// Function declarations are fully hoisted
console.log(sayHello()); // "Hello!" (works!)

function sayHello() {
    return "Hello!";
}

// Function expressions are not hoisted
// console.log(sayGoodbye()); // ❌ TypeError!
var sayGoodbye = function() {
    return "Goodbye!";
};
```

---

## 10. Best Practices {#best-practices}

### Code Style
```javascript
// ✅ Good naming
const userAge = 25;
const isLoggedIn = true;
const getUserData = () => { /* ... */ };

// ❌ Poor naming
const a = 25;
const flag = true;
const func = () => { /* ... */ };

// ✅ Use const by default
const API_URL = "https://api.example.com";
const config = { timeout: 5000 };

// ✅ Use let when reassignment is needed
let currentUser = null;
let counter = 0;

// ❌ Avoid var
// var oldWay = "don't use this";
```

### Error Prevention
```javascript
// ✅ Use strict equality
const isEqual = (a, b) => a === b;

// ✅ Check for undefined/null
const safeDivide = (a, b) => {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
};

// ✅ Use optional chaining (ES2020)
const userName = user?.profile?.name || "Guest";

// ✅ Use nullish coalescing (ES2020)
const theme = userPreference ?? "light";
```

### Performance Tips
```javascript
// ✅ Cache array length in loops
const items = [1, 2, 3, 4, 5];
for (let i = 0, len = items.length; i < len; i++) {
    console.log(items[i]);
}

// ✅ Use appropriate loop for the task
items.forEach(item => console.log(item)); // For iteration
const doubled = items.map(item => item * 2); // For transformation
const evens = items.filter(item => item % 2 === 0); // For filtering
```

---

## 🎯 Key Takeaways

1. **Variables**: Use `const` by default, `let` when reassigning, avoid `var`
2. **Data Types**: 7 primitive + 1 object type
3. **Functions**: Prefer arrow functions for callbacks, regular functions for methods
4. **Arrays**: Use modern methods like `map`, `filter`, `reduce`
5. **Objects**: Use dot notation when possible, bracket notation for dynamic access
6. **Scope**: Understand global, function, and block scope
7. **Best Practices**: Write readable, maintainable code

---

## 🚀 What's Next?

You've mastered JavaScript fundamentals! Next up:
- **Part 2**: DOM Manipulation & Web APIs
- Practice with the exercises in the `exercises/` folder
- Build the mini-project in the `projects/` folder

Remember: **Practice makes perfect!** 💪

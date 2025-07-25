# Part 3: ES6+ & Advanced JavaScript Concepts
## Writing Modern, Professional JavaScript

Welcome to Part 3! This is arguably the most important module for transitioning from a hobbyist to a professional JavaScript developer. ECMAScript 2015 (ES6) was a revolutionary update that fundamentally changed how we write JavaScript. Mastering these features is essential for working with modern codebases and frameworks like React, Vue, and Angular.

## 📋 Table of Contents
1. [Recap: `let`, `const`, and Block Scope](#block-scope)
2. Arrow Functions
3. Template Literals
4. Default, Rest, and Spread
5. Destructuring Assignment
6. Enhanced Object Literals
7. ES6 Modules: `import` & `export`
8. JavaScript Classes
9. Promises: An Introduction
10. Other Key ES6+ Features

---

## 1. Recap: `let`, `const`, and Block Scope {#block-scope}

As covered in Part 1, ES6 introduced `let` and `const`, which provide **block scope**. This is a major improvement over the function-scoped `var`.

- **Block Scope**: A variable declared with `let` or `const` is only accessible within the block (`{...}`) it was defined in (e.g., inside an `if` statement or a `for` loop).
- **`const`**: Creates a read-only reference to a value. The reference cannot be reassigned.
- **`let`**: Creates a mutable variable that can be reassigned.

```javascript
function checkScope() {
    if (true) {
        let blockScopedVar = "I'm inside the block";
        const blockScopedConst = "Me too!";
        var functionScopedVar = "I'm available outside the block";
    }
    // console.log(blockScopedVar); // ❌ ReferenceError
    // console.log(blockScopedConst); // ❌ ReferenceError
    console.log(functionScopedVar); // ✅ "I'm available outside the block"
}

// Rule of thumb: Use `const` by default, and `let` only when you know you need to reassign the variable. Avoid `var`.
```

---

## 2. Arrow Functions {#arrow-functions}

Arrow functions provide a more concise syntax for writing functions and, more importantly, they handle the `this` keyword differently.

### Concise Syntax

```javascript
// Traditional Function Expression
const add = function(a, b) {
    return a + b;
};

// Arrow Function
const addArrow = (a, b) => {
    return a + b;
};

// Implicit Return (for single-expression functions)
const subtract = (a, b) => a - b;

// Single Parameter (parentheses are optional)
const square = x => x * x;

// No Parameters
const getRandom = () => Math.random();

// Returning an Object (wrap in parentheses)
const createUser = (name, age) => ({ name: name, age: age });
```

### Lexical `this` Binding (The Killer Feature)

In traditional functions, the value of `this` is determined by *how the function is called*. In arrow functions, `this` is determined by *where the function is defined* (it inherits `this` from the parent scope). This solves many common `this`-related bugs.

```javascript
function Timer() {
    this.seconds = 0;

    // Using a traditional function, `this` inside setInterval refers to the window object (or is undefined in strict mode)
    // A common workaround was `const self = this;` or `.bind(this)`
    setInterval(function() {
        // console.log(this.seconds++); // ❌ Fails, `this` is not the Timer instance
    }, 1000);

    // Using an arrow function, `this` is lexically bound to the Timer instance
    setInterval(() => {
        console.log(this.seconds++); // ✅ Works perfectly!
    }, 1000);
}

// const myTimer = new Timer();
```

**When to use Arrow Functions:** They are perfect for callbacks, array methods (`.map`, `.filter`), and any situation where you want to preserve the `this` context from the surrounding code.

**When NOT to use Arrow Functions:**
- Object methods (if you need `this` to refer to the object itself).
- Event handlers (if you need `this` to refer to the element that received the event).
- Constructor functions.

---

## 3. Template Literals {#template-literals}

Template literals provide an easier way to create strings, especially those containing variables or multiple lines. They use backticks (`` ` ``) instead of single or double quotes.

```javascript
const name = "Alice";
const age = 30;

// Old way
const greetingOld = "Hello, my name is " + name + " and I am " + age + " years old.";

// New way with template literals
const greetingNew = `Hello, my name is ${name} and I am ${age} years old.`;

console.log(greetingNew); // "Hello, my name is Alice and I am 30 years old."

// Multi-line strings
const multiLine = `
This is a string
that spans across
multiple lines.
`;
```

---

## 4. Default, Rest, and Spread {#default-rest-spread}

### Default Parameters
You can now provide default values for function parameters directly in the function signature.

```javascript
function greet(name = "Guest", greeting = "Hello") {
    console.log(`${greeting}, ${name}!`);
}

greet("Bob", "Hi"); // "Hi, Bob!"
greet("Alice");     // "Hello, Alice!"
greet();            // "Hello, Guest!"
```

### The Rest Parameter (`...`)
The rest parameter syntax allows us to represent an indefinite number of arguments as an array. It must be the last parameter in a function definition.

```javascript
function sum(...numbers) {
    // `numbers` is a real array
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(10, 20, 30, 40)); // 100

function logFamily(father, mother, ...children) {
    console.log(`Father: ${father}`);
    console.log(`Mother: ${mother}`);
    console.log("Children:", children.join(", "));
}

logFamily("John", "Mary", "Tom", "Sue", "Peter");
```

### The Spread Operator (`...`)
The spread operator looks identical to the rest parameter but does the opposite. It "spreads" the elements of an iterable (like an array or string) or the properties of an object.

#### With Arrays
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Copying an array
const arr1Copy = [...arr1]; // [1, 2, 3]

// Merging arrays
const mergedArray = [...arr1, ...arr2, 7, 8]; // [1, 2, 3, 4, 5, 6, 7, 8]

// Passing elements as arguments to a function
const numbers = [10, 5, 25];
console.log(Math.max(...numbers)); // Equivalent to Math.max(10, 5, 25) -> 25
```

#### With Objects (ES2018)
```javascript
const user = { name: "Alice", age: 30 };

// Copying an object
const userCopy = { ...user };

// Merging objects
const userWithRole = { ...user, role: "Admin", age: 31 }; // Properties on the right overwrite those on the left
console.log(userWithRole); // { name: "Alice", age: 31, role: "Admin" }
```

---

## 5. Destructuring Assignment {#destructuring}

Destructuring is a convenient way to extract data from arrays or objects and assign them to distinct variables.

### Object Destructuring
```javascript
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 40,
    address: {
        city: "New York",
        country: "USA"
    }
};

// Basic destructuring
const { firstName, lastName } = person;
console.log(firstName); // "John"

// Renaming variables
const { age: personAge } = person;
console.log(personAge); // 40

// Default values
const { middleName = "N/A" } = person;
console.log(middleName); // "N/A"

// Nested destructuring
const { address: { city } } = person;
console.log(city); // "New York"

// In function parameters (extremely common in React)
function printUser({ firstName, age }) {
    console.log(`User: ${firstName}, Age: ${age}`);
}
printUser(person); // "User: John, Age: 40"
```

### Array Destructuring
```javascript
const colors = ["Red", "Green", "Blue", "Yellow"];

// Basic destructuring
const [firstColor, secondColor] = colors;
console.log(firstColor); // "Red"

// Skipping elements
const [, , thirdColor] = colors;
console.log(thirdColor); // "Blue"

// Using the rest operator
const [primary, ...otherColors] = colors;
console.log(primary);      // "Red"
console.log(otherColors);  // ["Green", "Blue", "Yellow"]

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
```

---

## 6. Enhanced Object Literals {#object-literals}

ES6 introduced several shorthands for defining object literals.

```javascript
const name = "My Awesome App";
const version = "1.0.0";

function start() {
    console.log(`${this.name} v${this.version} is starting...`);
}

// Old way
const appOld = {
    name: name,
    version: version,
    start: function() {
        console.log(`${this.name} v${this.version} is starting...`);
    }
};

// New way with enhanced object literals
const appNew = {
    // Property value shorthand
    name,
    version,
    // Method shorthand
    start() {
        console.log(`${this.name} v${this.version} is starting...`);
    },
    // Dynamic property names
    ['app_' + 'status']: 'running'
};

console.log(appNew.app_status); // "running"
appNew.start(); // "My Awesome App v1.0.0 is starting..."
```

---

## 7. ES6 Modules: `import` & `export` {#modules}

Modules allow you to split your code into separate, reusable files. This is the foundation of modern application architecture.

**Note:** To use ES6 modules in the browser, you must include your script with `type="module"`: `<script type="module" src="app.js"></script>`.

#### `export` (in `utils.js`)

```javascript
// utils.js

// Named export
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

// Default export (only one per file)
export default function multiply(a, b) {
    return a * b;
}
```

#### `import` (in `app.js`)

```javascript
// app.js

// Importing a default export and named exports
import multiply, { PI, add } from './utils.js';

// Importing named exports with an alias
import { add as sum } from './utils.js';

// Importing all named exports into a single object
import * as utils from './utils.js';

console.log(PI); // 3.14159
console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6

console.log(utils.PI); // 3.14159
console.log(utils.add(5, 5)); // 10
```

---

## 8. JavaScript Classes {#classes}

ES6 classes are "syntactic sugar" over JavaScript's existing prototype-based inheritance. They provide a much cleaner and more familiar syntax for creating objects and handling inheritance.

```javascript
class Animal {
    // The constructor is a special method for creating and initializing an object
    constructor(name) {
        this.name = name;
    }

    // Method
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

// Inheritance using `extends`
class Dog extends Animal {
    constructor(name, breed) {
        // `super` calls the parent class's constructor
        super(name);
        this.breed = breed;
    }

    // Overriding the parent method
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const myDog = new Dog("Rex", "German Shepherd");
myDog.speak(); // "Rex barks."
console.log(myDog.name); // "Rex"
```

---

## 9. Promises: An Introduction {#promises}

A `Promise` is an object representing the eventual completion (or failure) of an asynchronous operation. It's a cornerstone of modern async programming, solving the "callback hell" problem. (This will be covered in-depth in Part 4).

A promise can be in one of three states:
- **Pending**: The initial state; not yet fulfilled or rejected.
- **Fulfilled**: The operation completed successfully.
- **Rejected**: The operation failed.

```javascript
const myPromise = new Promise((resolve, reject) => {
    // Simulate an async operation (e.g., fetching data)
    setTimeout(() => {
        const success = true; // Change to false to see the .catch() block run
        if (success) {
            resolve("Data fetched successfully!"); // Fulfills the promise
        } else {
            reject("Error: Failed to fetch data."); // Rejects the promise
        }
    }, 2000);
});

console.log("Waiting for promise...");

myPromise
    .then((successMessage) => {
        // Runs when the promise is resolved
        console.log("Success:", successMessage);
    })
    .catch((errorMessage) => {
        // Runs when the promise is rejected
        console.error("Failure:", errorMessage);
    })
    .finally(() => {
        // Runs regardless of success or failure
        console.log("Promise finished.");
    });
```

---

## 10. Other Key ES6+ Features {#other-features}

- **`for...of` Loop**: A simpler way to iterate over iterables like arrays, strings, Maps, Sets, etc. It gives you the *value* of each item, unlike `for...in` which gives you the *key* or *index*.
  ```javascript
  const fruits = ["apple", "banana", "orange"];
  for (const fruit of fruits) {
      console.log(fruit);
  }
  ```

- **`Map` and `Set`**: New data structures.
  - `Set`: A collection of unique values. `const mySet = new Set([1, 1, 2, 3, 3]); // {1, 2, 3}`
  - `Map`: A collection of key-value pairs where any value (both objects and primitive values) may be used as either a key or a value.

- **Optional Chaining (`?.`)** (ES2020): Safely access nested object properties without having to check for the existence of each level.
  ```javascript
  const user = { profile: { name: "Alice" } };
  const userName = user?.profile?.name; // "Alice"
  const userCity = user?.address?.city; // undefined (instead of throwing an error)
  ```

- **Nullish Coalescing Operator (`??`)** (ES2020): Returns the right-hand side operand when the left-hand side is `null` or `undefined`, and otherwise returns the left-hand side. It's a safer alternative to `||` which triggers on any "falsy" value (like `0`, `''`, `false`).
  ```javascript
  const volume = 0;
  const setting1 = volume || 50; // 50 (because 0 is falsy)
  const setting2 = volume ?? 50; // 0 (because 0 is not null or undefined)
  ```

---

## 🚀 What's Next?

You've now learned the syntax that powers modern JavaScript development. These features make code cleaner, more readable, and less prone to common bugs.

- **Part 4**: Asynchronous JavaScript (Deep Dive)
- Practice these new concepts in the `exercises/` folder.
- Build the mini-project to see how they all fit together.
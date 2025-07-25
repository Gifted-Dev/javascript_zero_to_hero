# Part 3: ES6+ & Advanced Concepts - Exercises

Complete these exercises to master modern JavaScript syntax and features. This is crucial for writing professional code and for learning frameworks like React.

## 🎯 How to Use These Exercises

1.  **Setup**: For exercises involving modules, you will need an `index.html` file with `<script type="module">` and separate `.js` files. For others, you can use your browser's console or a tool like CodePen/JSFiddle.
2.  **Solve**: Read each problem and write the code to solve it using the ES6+ features you've learned.
3.  **Test**: Run your code with different inputs to ensure it works correctly.

---

## 📚 Basic Level (Must Complete All)

### Exercise 1: Arrow Function Conversion
Convert the following traditional functions into arrow functions.

```javascript
// Traditional function 1
function add(a, b) {
  return a + b;
}

// Traditional function 2
const greet = function(name) {
  return "Hello, " + name + "!";
};

// Traditional function 3
document.addEventListener('click', function() {
  console.log('Clicked!');
});

// TODO: Convert the functions above into arrow functions.
```

### Exercise 2: Template Literals Practice
You have a user object. Create a welcome message using template literals.

```javascript
const user = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  plan: "Premium"
};

// TODO: Create a multi-line string using template literals that says:
// "Welcome, Jane Doe!
// Your email is jane.doe@example.com.
// You are subscribed to the Premium plan."
```

### Exercise 3: Destructuring Basics
Extract values from the following object and array using destructuring.

```javascript
const book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  year: 1925
};

const fruits = ["Apple", "Banana", "Cherry"];

// TODO: Use object destructuring to get the title and author of the book.
// TODO: Use array destructuring to get the first and second fruits.
```

### Exercise 4: Spread and Rest Basics
Use the spread and rest operators to perform the following tasks.

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// TODO: Use the spread operator to merge arr1 and arr2 into a new array.

// TODO: Create a function `sumAll` that uses the rest parameter to take any number of arguments and return their sum.
```

---

## 🔥 Intermediate Level

### Exercise 5: Advanced Destructuring
You have a complex user object. Use destructuring to extract specific information.

```javascript
const userProfile = {
  id: 123,
  username: "coder_guy",
  details: {
    name: "John Doe",
    age: 30,
    address: {
      city: "New York",
      country: "USA"
    }
  }
};

// TODO: Use destructuring to achieve the following:
// 1. Get the `username`.
// 2. Get the `name` and rename it to `fullName`.
// 3. Get the `city` from the nested address object.
// 4. Get the `id`, but provide a default value of 0 if it doesn't exist.
```

### Exercise 6: ES6 Classes
Create a `Product` class and a `Book` class that inherits from it.

```javascript
// TODO: Create a `Product` class with a constructor for `name` and `price`.
// It should have a method `display()` that logs "Name: [name], Price: $[price]".

// TODO: Create a `Book` class that extends `Product`.
// It should have an additional property `author`.
// Override the `display()` method to also include the author's name.
```

### Exercise 7: Module Practice
Create two JavaScript files, `math.js` and `app.js`, to practice using ES6 modules.

```javascript
// In math.js:
// TODO: Export a function `add(a, b)` as a named export.
// TODO: Export a function `subtract(a, b)` as a named export.
// TODO: Export a constant `PI` with the value 3.14159 as a named export.
// TODO: Export a function `multiply(a, b)` as the default export.

// In app.js:
// TODO: Import all the functions and the constant from math.js.
// TODO: Use the imported items to perform and log a few calculations.
```

### Exercise 8: Working with `Map` and `Set`
Use `Set` to find unique elements and `Map` to store key-value data.

```javascript
const numbers = [1, 2, 3, 2, 4, 5, 5, 1, 6];

// TODO: Use a `Set` to get an array of unique numbers from the `numbers` array.

const userRoles = new Map();
// TODO: Use the `Map` API to:
// 1. Set the role for user "Alice" to "Admin".
// 2. Set the role for user "Bob" to "Editor".
// 3. Get the role of "Alice" and log it.
// 4. Check if "Charlie" has a role.
```

---

## 🚀 Advanced Level

### Exercise 9: Promise Challenge
Create a function that returns a promise. The promise should simulate an API call.

```javascript
// TODO: Create a function `fetchData(url)` that returns a new Promise.
// The promise should resolve with `{ data: "Sample data from " + url }` after a 2-second delay if the URL contains the word "success".
// Otherwise, it should reject with an error message "Failed to fetch data from " + url after a 2-second delay.

// TODO: Call this function with a "success" URL and chain .then() and .catch() to log the result or error.
// TODO: Call this function with a "failure" URL and do the same.
```

### Exercise 10: Combining ES6 Features
You have an array of user objects. Use a combination of modern features to process this data.

```javascript
const users = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 22 }
];

// TODO: Use `.map()` and object destructuring to create a new array of strings,
// where each string is in the format: "User [Name] is [Age] years old."
// Example output: ["User Alice is 25 years old.", ...]
```

### Exercise 11: Refactoring Challenge
Take the following old-style JavaScript code and refactor it to use modern ES6+ syntax.

```javascript
var oldProfile = {
  name: "Old School Coder",
  platform: "Vintage Computers",
  logProfile: function() {
    var self = this;
    console.log("Profile for " + this.name + " on " + this.platform);
    
    var hobbies = ["punch cards", "dial-up", "floppy disks"];
    hobbies.forEach(function(hobby) {
      // `this` would be incorrect here without `self`
      console.log(self.name + " likes " + hobby);
    });
  }
};

// TODO: Refactor `oldProfile` to use:
// - `const` instead of `var`.
// - Enhanced object literals and method shorthand.
// - Arrow functions to avoid the `self = this` pattern.
// - Template literals for string creation.
```

### Exercise 12: Optional Chaining & Nullish Coalescing
Write a function that safely retrieves nested data and provides default values.

```javascript
const data = {
  user: {
    name: "Jane",
    address: {
      street: "123 Main St"
    }
  },
  config: {
    theme: null,
    notifications: {
      email: true,
      sms: false
    }
  }
};

// TODO: Create a function `getSettings(data)` that returns an object with:
// - The user's city (or "City not set" if not available).
// - The chosen theme (or "light" if the theme is null or undefined).
// - Whether SMS notifications are enabled (should be `false`).
// Use optional chaining (`?.`) and the nullish coalescing operator (`??`).
```
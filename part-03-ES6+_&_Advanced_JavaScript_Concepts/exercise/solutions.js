/*
    Part 3: ES6+ & Advanced Concepts - Exercise Solutions
    
    This file contains the solutions for the exercises in `exercises.md`.
    It's recommended to try solving the exercises on your own first.
*/

console.log("--- Part 3: ES6+ & Advanced Concepts - Exercise Solutions ---");

// --- Basic Level ---

console.group("Exercise 1: Arrow Function Conversion");
const addArrow = (a, b) => a + b;
const greetArrow = name => `Hello, ${name}!`;
const clickListener = () => console.log('Clicked!');
// document.addEventListener('click', clickListener); // Example usage
console.log("addArrow(2, 3):", addArrow(2, 3));
console.log("greetArrow('Alice'):", greetArrow('Alice'));
console.log("Arrow function for event listener created.");
console.groupEnd();


console.group("Exercise 2: Template Literals Practice");
const userEx2 = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  plan: "Premium"
};
const welcomeMessage = `Welcome, ${userEx2.name}!
Your email is ${userEx2.email}.
You are subscribed to the ${userEx2.plan} plan.`;
console.log(welcomeMessage);
console.groupEnd();


console.group("Exercise 3: Destructuring Basics");
const bookEx3 = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  year: 1925
};
const { title, author } = bookEx3;
console.log("Book Title:", title);
console.log("Book Author:", author);

const fruitsEx3 = ["Apple", "Banana", "Cherry"];
const [firstFruit, secondFruit] = fruitsEx3;
console.log("First Fruit:", firstFruit);
console.log("Second Fruit:", secondFruit);
console.groupEnd();


console.group("Exercise 4: Spread and Rest Basics");
const arr1Ex4 = [1, 2, 3];
const arr2Ex4 = [4, 5, 6];
const mergedArray = [...arr1Ex4, ...arr2Ex4];
console.log("Merged Array:", mergedArray);

const sumAll = (...numbers) => {
  return numbers.reduce((sum, current) => sum + current, 0);
};
console.log("sumAll(1, 2, 3, 4, 5):", sumAll(1, 2, 3, 4, 5));
console.groupEnd();


// --- Intermediate Level ---

console.group("Exercise 5: Advanced Destructuring");
const userProfileEx5 = {
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
const {
  username,
  details: { name: fullName, address: { city } },
  id = 0 // Default value example
} = userProfileEx5;
console.log("Username:", username);
console.log("Full Name:", fullName);
console.log("City:", city);
console.log("ID:", id);
console.groupEnd();


console.group("Exercise 6: ES6 Classes");
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  display() {
    console.log(`Name: ${this.name}, Price: $${this.price.toFixed(2)}`);
  }
}

class Book extends Product {
  constructor(name, price, author) {
    super(name, price); // Call the parent constructor
    this.author = author;
  }

  // Override the display method
  display() {
    console.log(`Name: ${this.name}, Author: ${this.author}, Price: $${this.price.toFixed(2)}`);
  }
}

const shampoo = new Product("Shampoo", 9.99);
shampoo.display();
const jsBook = new Book("Eloquent JavaScript", 39.95, "Marijn Haverbeke");
jsBook.display();
console.groupEnd();


console.group("Exercise 7: Module Practice");
console.log("This exercise requires separate files. See comments for the code.");
// File: math.js
/*
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const PI = 3.14159;
export default (a, b) => a * b; // multiply
*/

// File: app.js
/*
import multiply, { add, subtract, PI } from './math.js';
console.log('2 + 3 =', add(2, 3));
console.log('10 - 4 =', subtract(10, 4));
console.log('PI * 2 =', multiply(PI, 2));
*/
console.groupEnd();


console.group("Exercise 8: Working with Map and Set");
const numbersEx8 = [1, 2, 3, 2, 4, 5, 5, 1, 6];
const uniqueNumbers = [...new Set(numbersEx8)];
console.log("Unique Numbers:", uniqueNumbers);

const userRoles = new Map();
userRoles.set("Alice", "Admin");
userRoles.set("Bob", "Editor");
console.log("Role of Alice:", userRoles.get("Alice"));
console.log("Does Charlie have a role?", userRoles.has("Charlie"));
console.groupEnd();


// --- Advanced Level ---

console.group("Exercise 9: Promise Challenge");
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes("success")) {
        resolve({ data: `Sample data from ${url}` });
      } else {
        reject(`Failed to fetch data from ${url}`);
      }
    }, 2000);
  });
};

console.log("Fetching from success URL...");
fetchData("https://api.example.com/success")
  .then(response => console.log("Success Response:", response))
  .catch(error => console.error("Success Error:", error));

console.log("Fetching from failure URL...");
fetchData("https://api.example.com/failure")
  .then(response => console.log("Failure Response:", response))
  .catch(error => console.error("Failure Error:", error));
console.groupEnd();


console.group("Exercise 10: Combining ES6 Features");
const usersEx10 = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 22 }
];
const userDescriptions = usersEx10.map(
  ({ name, age }) => `User ${name} is ${age} years old.`
);
console.log(userDescriptions);
console.groupEnd();


console.group("Exercise 11: Refactoring Challenge");
const newProfile = {
  name: "Old School Coder",
  platform: "Vintage Computers",
  logProfile() {
    console.log(`Profile for ${this.name} on ${this.platform}`);
    
    const hobbies = ["punch cards", "dial-up", "floppy disks"];
    // Arrow function lexically binds `this`, so `this.name` works correctly.
    hobbies.forEach(hobby => {
      console.log(`${this.name} likes ${hobby}`);
    });
  }
};
newProfile.logProfile();
console.groupEnd();


console.group("Exercise 12: Optional Chaining & Nullish Coalescing");
const dataEx12 = {
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

const getSettings = (data) => {
  return {
    city: data.user?.address?.city ?? "City not set",
    theme: data.config?.theme ?? "light",
    smsEnabled: data.config?.notifications?.sms ?? true // default to true if not present
  };
};

const settings = getSettings(dataEx12);
console.log(settings);
// Expected output: { city: "City not set", theme: "light", smsEnabled: false }
console.groupEnd();
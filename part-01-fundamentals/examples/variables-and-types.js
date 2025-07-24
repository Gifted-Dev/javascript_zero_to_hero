// Part 1 Examples: Variables and Data Types
// Run this file in Node.js or copy to browser console

console.log("=== VARIABLES AND DATA TYPES EXAMPLES ===\n");

// 1. VARIABLE DECLARATIONS
console.log("1. Variable Declarations:");
const PI = 3.14159;  // Constant value
let score = 0;       // Can be reassigned
var oldWay = "avoid this"; // Old syntax

console.log(`PI: ${PI}`);
console.log(`Initial score: ${score}`);

score = 100; // Reassigning let variable
console.log(`Updated score: ${score}\n`);

// 2. DATA TYPES EXAMPLES
console.log("2. Data Types:");

// Numbers
const age = 25;
const price = 99.99;
const negative = -10;
const infinity = Infinity;
const notANumber = NaN;

console.log(`Age (integer): ${age}, type: ${typeof age}`);
console.log(`Price (decimal): ${price}, type: ${typeof price}`);
console.log(`Negative: ${negative}`);
console.log(`Infinity: ${infinity}`);
console.log(`NaN: ${notANumber}, isNaN: ${isNaN(notANumber)}\n`);

// Strings
const singleQuotes = 'Hello';
const doubleQuotes = "World";
const templateLiteral = `${singleQuotes}, ${doubleQuotes}!`;

console.log(`Single quotes: ${singleQuotes}`);
console.log(`Double quotes: ${doubleQuotes}`);
console.log(`Template literal: ${templateLiteral}`);
console.log(`String length: ${templateLiteral.length}\n`);

// Booleans
const isActive = true;
const isCompleted = false;

console.log(`Is active: ${isActive}, type: ${typeof isActive}`);
console.log(`Is completed: ${isCompleted}`);

// Boolean conversions
console.log(`Boolean(1): ${Boolean(1)}`);
console.log(`Boolean(0): ${Boolean(0)}`);
console.log(`Boolean("hello"): ${Boolean("hello")}`);
console.log(`Boolean(""): ${Boolean("")}\n`);

// Undefined and Null
let undefinedVar;
let nullVar = null;

console.log(`Undefined variable: ${undefinedVar}, type: ${typeof undefinedVar}`);
console.log(`Null variable: ${nullVar}, type: ${typeof nullVar}`);
console.log(`Note: typeof null returns "object" - this is a known JavaScript quirk!\n`);

// Arrays (objects)
const fruits = ["apple", "banana", "orange"];
const mixedArray = ["John", 25, true, null];

console.log(`Fruits array: ${fruits}`);
console.log(`Array type: ${typeof fruits}`);
console.log(`Is array: ${Array.isArray(fruits)}`);
console.log(`Mixed array: ${mixedArray}\n`);

// Objects
const person = {
    name: "John",
    age: 30,
    isStudent: false,
    hobbies: ["reading", "coding", "gaming"]
};

console.log("Person object:", person);
console.log(`Object type: ${typeof person}`);
console.log(`Person name: ${person.name}`);
console.log(`Person hobbies: ${person.hobbies}\n`);

// 3. TYPE CHECKING EXAMPLES
console.log("3. Type Checking:");
const values = [
    "hello",
    42,
    true,
    undefined,
    null,
    [],
    {},
    function() {}
];

values.forEach((value, index) => {
    console.log(`Value ${index + 1}: ${value}, type: ${typeof value}`);
});

// Better array checking
console.log(`\nArray checking:`);
console.log(`typeof []: ${typeof []}`);
console.log(`Array.isArray([]): ${Array.isArray([])}`);

// 4. VARIABLE NAMING EXAMPLES
console.log("\n4. Variable Naming Examples:");

// Good naming conventions
const userName = "alice123";
const maxRetryAttempts = 3;
const isLoggedIn = true;
const API_BASE_URL = "https://api.example.com";

console.log(`User name: ${userName}`);
console.log(`Max retry attempts: ${maxRetryAttempts}`);
console.log(`Is logged in: ${isLoggedIn}`);
console.log(`API base URL: ${API_BASE_URL}`);

// 5. CONST VS LET DEMONSTRATION
console.log("\n5. Const vs Let:");

// const - cannot reassign
const constantValue = "I cannot change";
console.log(`Constant value: ${constantValue}`);

// let - can reassign
let changeableValue = "I can change";
console.log(`Initial changeable value: ${changeableValue}`);

changeableValue = "I have changed!";
console.log(`Updated changeable value: ${changeableValue}`);

// const with objects - object can be modified, reference cannot
const constObject = { name: "John" };
console.log("Original const object:", constObject);

constObject.name = "Jane"; // This is allowed
constObject.age = 25;      // This is allowed
console.log("Modified const object:", constObject);

// constObject = {}; // This would cause an error!

console.log("\n=== END OF VARIABLES AND TYPES EXAMPLES ===");

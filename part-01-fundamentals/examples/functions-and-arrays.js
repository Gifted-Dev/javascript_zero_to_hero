// Part 1 Examples: Functions and Arrays
// Run this file in Node.js or copy to browser console

console.log("=== FUNCTIONS AND ARRAYS EXAMPLES ===\n");

// 1. FUNCTION EXAMPLES
console.log("1. Function Types and Usage:");

// Function Declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function Expression
const sayGoodbye = function(name) {
    return `Goodbye, ${name}!`;
};

// Arrow Functions
const add = (a, b) => a + b;
const multiply = (a, b) => {
    const result = a * b;
    return result;
};

// Testing functions
console.log(greet("Alice"));           // "Hello, Alice!"
console.log(sayGoodbye("Bob"));        // "Goodbye, Bob!"
console.log(add(5, 3));                // 8
console.log(multiply(4, 7));           // 28

// 2. FUNCTION PARAMETERS AND ARGUMENTS
console.log("\n2. Function Parameters:");

// Default parameters
function introduce(name = "Guest", age = 0) {
    return `Hi, I'm ${name} and I'm ${age} years old.`;
}

console.log(introduce());                    // Default values
console.log(introduce("John"));             // Partial defaults
console.log(introduce("Jane", 25));         // All values provided

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));                  // 6
console.log(sum(1, 2, 3, 4, 5));           // 15
console.log(sum());                         // 0

// Function with object parameter
function createUser({name, email, age = 18}) {
    return {
        id: Math.floor(Math.random() * 1000),
        name,
        email,
        age,
        createdAt: new Date()
    };
}

const newUser = createUser({
    name: "John Doe",
    email: "john@example.com",
    age: 30
});
console.log("New user:", newUser);

// 3. HIGHER-ORDER FUNCTIONS
console.log("\n3. Higher-Order Functions:");

// Function that returns a function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(`Double 5: ${double(5)}`);     // 10
console.log(`Triple 4: ${triple(4)}`);     // 12

// Function that takes a function as parameter
function applyOperation(a, b, operation) {
    return operation(a, b);
}

const addOperation = (x, y) => x + y;
const subtractOperation = (x, y) => x - y;

console.log(applyOperation(10, 5, addOperation));      // 15
console.log(applyOperation(10, 5, subtractOperation)); // 5

// 4. ARRAY CREATION AND BASIC OPERATIONS
console.log("\n4. Array Basics:");

// Different ways to create arrays
const fruits = ["apple", "banana", "orange"];
const numbers = new Array(1, 2, 3, 4, 5);
const mixedArray = ["text", 42, true, null, {name: "object"}];

console.log("Fruits:", fruits);
console.log("Numbers:", numbers);
console.log("Mixed array:", mixedArray);

// Array properties and methods
console.log(`Fruits length: ${fruits.length}`);
console.log(`First fruit: ${fruits[0]}`);
console.log(`Last fruit: ${fruits[fruits.length - 1]}`);

// Adding elements
fruits.push("grape");              // Add to end
fruits.unshift("mango");          // Add to beginning
console.log("After adding:", fruits);

// Removing elements
const lastFruit = fruits.pop();   // Remove from end
const firstFruit = fruits.shift(); // Remove from beginning
console.log("Removed:", firstFruit, "and", lastFruit);
console.log("After removing:", fruits);

// 5. ARRAY METHODS - ITERATION
console.log("\n5. Array Iteration Methods:");

const scores = [85, 92, 78, 96, 88, 79, 91];

// forEach - execute function for each element
console.log("All scores:");
scores.forEach((score, index) => {
    console.log(`  Score ${index + 1}: ${score}`);
});

// map - transform each element
const percentages = scores.map(score => `${score}%`);
console.log("Percentages:", percentages);

const bonusScores = scores.map(score => score + 5);
console.log("Bonus scores:", bonusScores);

// filter - get elements that match condition
const highScores = scores.filter(score => score >= 90);
const passingScores = scores.filter(score => score >= 80);
console.log("High scores (>=90):", highScores);
console.log("Passing scores (>=80):", passingScores);

// find - get first element that matches
const perfectScore = scores.find(score => score === 100);
const firstHighScore = scores.find(score => score >= 90);
console.log("Perfect score:", perfectScore);        // undefined
console.log("First high score:", firstHighScore);   // 92

// 6. ARRAY METHODS - AGGREGATION
console.log("\n6. Array Aggregation:");

// reduce - reduce array to single value
const totalScore = scores.reduce((sum, score) => sum + score, 0);
const averageScore = totalScore / scores.length;
console.log(`Total: ${totalScore}, Average: ${averageScore.toFixed(1)}`);

// Find min and max
const maxScore = scores.reduce((max, score) => score > max ? score : max);
const minScore = scores.reduce((min, score) => score < min ? score : min);
console.log(`Max score: ${maxScore}, Min score: ${minScore}`);

// More complex reduce - count occurrences
const grades = ['A', 'B', 'A', 'C', 'B', 'A', 'B'];
const gradeCount = grades.reduce((count, grade) => {
    count[grade] = (count[grade] || 0) + 1;
    return count;
}, {});
console.log("Grade distribution:", gradeCount);

// 7. ARRAY METHODS - SEARCHING AND TESTING
console.log("\n7. Array Search and Test Methods:");

const products = [
    { name: "Laptop", price: 999, category: "Electronics" },
    { name: "Book", price: 15, category: "Education" },
    { name: "Phone", price: 599, category: "Electronics" },
    { name: "Desk", price: 200, category: "Furniture" }
];

// some - test if at least one element matches
const hasExpensiveItem = products.some(product => product.price > 500);
const hasElectronics = products.some(product => product.category === "Electronics");
console.log("Has expensive item:", hasExpensiveItem);  // true
console.log("Has electronics:", hasElectronics);       // true

// every - test if all elements match
const allExpensive = products.every(product => product.price > 100);
const allAffordable = products.every(product => product.price < 1000);
console.log("All expensive (>$100):", allExpensive);   // false
console.log("All affordable (<$1000):", allAffordable); // true

// includes - check if array contains value
const favoriteColors = ["blue", "green", "red", "purple"];
console.log("Has blue:", favoriteColors.includes("blue"));     // true
console.log("Has yellow:", favoriteColors.includes("yellow")); // false

// indexOf and lastIndexOf
const letters = ["a", "b", "c", "b", "d"];
console.log("First 'b' at index:", letters.indexOf("b"));      // 1
console.log("Last 'b' at index:", letters.lastIndexOf("b"));   // 3
console.log("'z' at index:", letters.indexOf("z"));            // -1

// 8. PRACTICAL EXAMPLES
console.log("\n8. Practical Array Examples:");

// Student grade calculator
function calculateGradeStatistics(students) {
    const grades = students.map(student => student.grade);
    
    return {
        count: grades.length,
        total: grades.reduce((sum, grade) => sum + grade, 0),
        average: grades.reduce((sum, grade) => sum + grade, 0) / grades.length,
        highest: Math.max(...grades),
        lowest: Math.min(...grades),
        passing: grades.filter(grade => grade >= 70).length,
        failing: grades.filter(grade => grade < 70).length
    };
}

const students = [
    { name: "Alice", grade: 85 },
    { name: "Bob", grade: 92 },
    { name: "Charlie", grade: 67 },
    { name: "Diana", grade: 94 },
    { name: "Eve", grade: 78 }
];

const stats = calculateGradeStatistics(students);
console.log("Grade Statistics:", stats);

// Shopping cart example
function calculateCartTotal(cart) {
    return cart
        .filter(item => item.quantity > 0)  // Only items with quantity
        .map(item => ({
            ...item,
            total: item.price * item.quantity
        }))
        .reduce((total, item) => total + item.total, 0);
}

const shoppingCart = [
    { name: "T-shirt", price: 25, quantity: 2 },
    { name: "Jeans", price: 80, quantity: 1 },
    { name: "Shoes", price: 120, quantity: 0 },  // Out of stock
    { name: "Hat", price: 15, quantity: 3 }
];

const cartTotal = calculateCartTotal(shoppingCart);
console.log(`Shopping cart total: $${cartTotal}`);

// Text processing example
function analyzeText(text) {
    const words = text.toLowerCase()
        .replace(/[^\w\s]/g, '')  // Remove punctuation
        .split(/\s+/)             // Split by whitespace
        .filter(word => word.length > 0);  // Remove empty strings
    
    const wordCount = words.reduce((count, word) => {
        count[word] = (count[word] || 0) + 1;
        return count;
    }, {});
    
    const uniqueWords = Object.keys(wordCount);
    const mostCommon = uniqueWords.reduce((most, word) => 
        wordCount[word] > wordCount[most] ? word : most
    );
    
    return {
        totalWords: words.length,
        uniqueWords: uniqueWords.length,
        averageLength: words.reduce((sum, word) => sum + word.length, 0) / words.length,
        mostCommon: mostCommon,
        wordFrequency: wordCount
    };
}

const sampleText = "The quick brown fox jumps over the lazy dog. The dog was very lazy.";
const textAnalysis = analyzeText(sampleText);
console.log("Text Analysis:", textAnalysis);

// 9. ARRAY SORTING
console.log("\n9. Array Sorting:");

// Basic sorting
const randomNumbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", randomNumbers);
console.log("Sorted ascending:", [...randomNumbers].sort((a, b) => a - b));
console.log("Sorted descending:", [...randomNumbers].sort((a, b) => b - a));

// Sorting objects
const people = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 35 },
    { name: "Alice", age: 28 }
];

console.log("Sorted by age:", 
    [...people].sort((a, b) => a.age - b.age)
);

console.log("Sorted by name:", 
    [...people].sort((a, b) => a.name.localeCompare(b.name))
);

console.log("\n=== END OF FUNCTIONS AND ARRAYS EXAMPLES ===");

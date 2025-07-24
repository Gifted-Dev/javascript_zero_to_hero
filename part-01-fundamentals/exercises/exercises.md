# Part 1: JavaScript Fundamentals - Exercises

Complete these exercises to reinforce your understanding of JavaScript fundamentals. Start with Basic level and progress through Advanced.

## 🎯 How to Use These Exercises

1. **Read each problem carefully**
2. **Try to solve it yourself first** - don't peek at solutions!
3. **Test your code** - make sure it works with different inputs
4. **Compare with provided solutions** (in `solutions.js`)
5. **Understand why the solution works**

---

## 📚 Basic Level (Must Complete All)

### Exercise 1: Variable Practice
Create variables using `const`, `let`, and demonstrate you understand the difference:

```javascript
// TODO: Create these variables
// 1. A constant for your birth year
// 2. A variable for your current age (use let)
// 3. A constant for your name
// 4. A variable for your favorite color that you might change later

// TODO: Try to reassign the constant (this should cause an error)
// TODO: Reassign the let variables to show they can change
```

### Exercise 2: Data Type Detective
Write a function that takes any value and returns detailed information about it:

```javascript
function analyzeValue(value) {
    // TODO: Return an object with:
    // - type: the typeof result
    // - value: the actual value
    // - isArray: true if it's an array
    // - isNull: true if it's null
    // - description: a human-readable description
}

// Test cases:
// analyzeValue(42) should return info about a number
// analyzeValue("hello") should return info about a string
// analyzeValue([1,2,3]) should return info about an array
// analyzeValue(null) should return info about null
```

### Exercise 3: Simple Calculator
Create a calculator function that performs basic arithmetic:

```javascript
function calculator(num1, operator, num2) {
    // TODO: Implement calculator that supports +, -, *, /, %
    // Return the result or "Invalid operator" for unsupported operations
    // Handle division by zero case
}

// Test your function:
// calculator(10, '+', 5) should return 15
// calculator(10, '/', 0) should handle division by zero
```

### Exercise 4: Age Classifier
Write a function that classifies people by age:

```javascript
function classifyAge(age) {
    // TODO: Return appropriate category:
    // 0-2: "Baby"
    // 3-12: "Child" 
    // 13-19: "Teenager"
    // 20-64: "Adult"
    // 65+: "Senior"
    // Invalid age (negative or not a number): "Invalid age"
}
```

### Exercise 5: Array Basics
Complete these array manipulation tasks:

```javascript
// TODO: Create an array of your top 5 favorite movies
const movies = [];

// TODO: Add a movie to the end of the array
// TODO: Add a movie to the beginning of the array
// TODO: Remove the last movie
// TODO: Find the index of a specific movie
// TODO: Check if a movie exists in the array
// TODO: Create a new array with only movies that have more than 10 characters in the title
```

---

## 🔥 Intermediate Level

### Exercise 6: Object Manipulation
Create and manipulate a student object:

```javascript
// TODO: Create a student object with properties:
// name, age, grades (array), address (nested object with street, city, state)

// TODO: Write functions to:
// 1. Add a new grade
// 2. Calculate average grade
// 3. Update the address
// 4. Get full address as a string
// 5. Determine if student is passing (average >= 70)
```

### Exercise 7: Loop Mastery
Solve these problems using different types of loops:

```javascript
// TODO: Using a for loop, create a function that:
// 1. Prints numbers 1-10
// 2. Prints only even numbers from 1-20
// 3. Prints numbers 10-1 in reverse

// TODO: Using while loop:
// 4. Find the first number greater than 100 that's divisible by 7

// TODO: Using for...of loop:
// 5. Iterate through an array and print each element with its index

// TODO: Using for...in loop:  
// 6. Print all properties and values of an object
```

### Exercise 8: Function Challenge
Create these utility functions:

```javascript
// TODO: 1. Function that finds the largest number in an array
function findMax(numbers) {
    // Your code here
}

// TODO: 2. Function that counts vowels in a string
function countVowels(str) {
    // Your code here
}

// TODO: 3. Function that reverses a string
function reverseString(str) {
    // Your code here
}

// TODO: 4. Function that checks if a string is a palindrome
function isPalindrome(str) {
    // Your code here
}
```

### Exercise 9: Grade Book System
Build a simple grade management system:

```javascript
// TODO: Create a gradebook object that can:
// 1. Add students
// 2. Add grades for students  
// 3. Calculate student averages
// 4. Find the class average
// 5. List all students with failing grades (< 70)
// 6. Find the top performing student

const gradeBook = {
    students: {},
    
    addStudent: function(name) {
        // Your code here
    },
    
    addGrade: function(name, grade) {
        // Your code here
    },
    
    getAverage: function(name) {
        // Your code here
    },
    
    getClassAverage: function() {
        // Your code here
    },
    
    getFailingStudents: function() {
        // Your code here
    },
    
    getTopStudent: function() {
        // Your code here
    }
};
```

---

## 🚀 Advanced Level

### Exercise 10: Scope and Hoisting Quiz
Predict the output of these code snippets:

```javascript
// Quiz 1: What will this output?
console.log(x);
var x = 5;

// Quiz 2: What will this output?
console.log(y);
let y = 10;

// Quiz 3: What will this output?
function test() {
    console.log(a);
    console.log(b);
    var a = 1;
    let b = 2;
}
test();

// Quiz 4: What will this output?
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}

// Quiz 5: What will this output?
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j), 100);
}
```

### Exercise 11: Advanced Array Methods
Use modern array methods to solve these problems:

```javascript
const employees = [
    { name: "Alice", department: "Engineering", salary: 90000, years: 3 },
    { name: "Bob", department: "Marketing", salary: 65000, years: 1 },
    { name: "Charlie", department: "Engineering", salary: 95000, years: 5 },
    { name: "Diana", department: "HR", salary: 70000, years: 2 },
    { name: "Eve", department: "Marketing", salary: 75000, years: 4 }
];

// TODO: Use array methods to:
// 1. Find all engineers
// 2. Get names of employees earning > $70,000
// 3. Calculate total salary for all employees
// 4. Find the most experienced employee
// 5. Group employees by department
// 6. Calculate average salary by department
// 7. Find employees with 3+ years experience earning < $80,000
```

### Exercise 12: Function Factory
Create a function that returns other functions:

```javascript
// TODO: Create a function called 'createValidator' that returns
// validation functions based on the type specified

function createValidator(type) {
    // Return different validator functions based on type:
    // 'email' - validates email format
    // 'phone' - validates phone number format  
    // 'password' - validates password strength
    // 'number' - validates if input is a number within range
}

// Usage example:
// const emailValidator = createValidator('email');
// emailValidator('test@example.com') // should return true
// emailValidator('invalid-email') // should return false
```

### Exercise 13: Object Deep Clone
Create a function that makes a deep copy of an object:

```javascript
// TODO: Implement a deep clone function that handles:
// - Nested objects
// - Arrays within objects
// - Different data types
// - Circular references (bonus)

function deepClone(obj) {
    // Your implementation here
}

// Test with:
const original = {
    name: "John",
    scores: [85, 90, 78],
    address: {
        street: "123 Main St",
        city: "Boston"
    }
};

const copied = deepClone(original);
// Modifying copied should not affect original
```

### Exercise 14: Mini Text Analyzer
Build a comprehensive text analysis tool:

```javascript
// TODO: Create a text analyzer that provides:
function analyzeText(text) {
    return {
        characterCount: 0,
        wordCount: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        longestWord: "",
        shortestWord: "",
        averageWordLength: 0,
        mostFrequentWord: "",
        readingTime: 0, // in minutes (average 200 words per minute)
        difficulty: "" // "Easy", "Medium", "Hard" based on avg word length
    };
}
```

### Exercise 15: Advanced Calculator
Build a calculator that can handle complex expressions:

```javascript
// TODO: Create a calculator that can:
// 1. Handle parentheses: calculate("(2 + 3) * 4")
// 2. Support multiple operations: calculate("10 + 5 * 2 - 3")
// 3. Handle decimal numbers: calculate("3.14 * 2")
// 4. Provide detailed steps: showSteps("10 + 5 * 2")

function calculate(expression) {
    // Your implementation here
    // Should return the calculated result
}

function showSteps(expression) {
    // Your implementation here  
    // Should return array of steps showing how calculation was performed
}
```

---

## 🎨 Creative Challenges

### Challenge 1: Password Generator
Create a configurable password generator:

```javascript
// TODO: Create a password generator with options:
function generatePassword(options = {}) {
    // Default options:
    // length: 12
    // includeUppercase: true
    // includeLowercase: true  
    // includeNumbers: true
    // includeSymbols: false
    // excludeSimilar: false (excludes 0, O, l, I, etc.)
    
    // Return generated password string
}
```

### Challenge 2: Simple Encryption
Implement a basic Caesar cipher:

```javascript
// TODO: Implement Caesar cipher encryption/decryption
function encrypt(text, shift) {
    // Shift each letter by 'shift' positions in alphabet
}

function decrypt(text, shift) {  
    // Reverse the encryption
}

// Should handle:
// - Both uppercase and lowercase
// - Wrap around alphabet (z + 1 = a)
// - Preserve non-letter characters
```

### Challenge 3: Data Structure Builder
Create a simple data structure:

```javascript
// TODO: Implement a Stack class with these methods:
class Stack {
    constructor() {
        // Initialize stack
    }
    
    push(item) {
        // Add item to top
    }
    
    pop() {
        // Remove and return top item
    }
    
    peek() {
        // Return top item without removing
    }
    
    isEmpty() {
        // Check if stack is empty
    }
    
    size() {
        // Return number of items
    }
}
```

---

## ✅ Self-Assessment Checklist

After completing the exercises, check if you can:

- [ ] Explain the difference between `const`, `let`, and `var`
- [ ] Identify all JavaScript data types
- [ ] Use all operators correctly (arithmetic, comparison, logical)
- [ ] Write conditional statements and loops confidently
- [ ] Create and manipulate functions (regular and arrow functions)
- [ ] Work with arrays using modern methods
- [ ] Create and manipulate objects
- [ ] Understand scope and hoisting concepts
- [ ] Apply best practices in your code
- [ ] Debug common JavaScript errors

## 🎯 Success Criteria

**Beginner Level**: Complete exercises 1-5 with confidence
**Intermediate Level**: Complete exercises 6-9, understanding why solutions work  
**Advanced Level**: Complete exercises 10-15, able to explain complex concepts
**Expert Level**: Complete all challenges, write clean, optimized code

---

## 💡 Tips for Success

1. **Start simple** - Don't jump to advanced exercises too quickly
2. **Test thoroughly** - Try edge cases and different inputs
3. **Read error messages** - They contain valuable debugging information
4. **Use console.log()** - Debug by printing values at different steps
5. **Practice daily** - Consistency is more important than long sessions
6. **Explain your code** - If you can't explain it, you don't fully understand it

Remember: **The goal is understanding, not just getting the right answer!** 🎓

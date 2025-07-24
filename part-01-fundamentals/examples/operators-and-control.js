// Part 1 Examples: Operators and Control Structures
// Run this file in Node.js or copy to browser console

console.log("=== OPERATORS AND CONTROL STRUCTURES EXAMPLES ===\n");

// 1. ARITHMETIC OPERATORS
console.log("1. Arithmetic Operators:");
const a = 10;
const b = 3;

console.log(`a = ${a}, b = ${b}`);
console.log(`a + b = ${a + b}`);  // Addition
console.log(`a - b = ${a - b}`);  // Subtraction
console.log(`a * b = ${a * b}`);  // Multiplication
console.log(`a / b = ${a / b}`);  // Division
console.log(`a % b = ${a % b}`);  // Remainder
console.log(`a ** b = ${a ** b}`); // Exponentiation

// Increment and Decrement
let counter = 5;
console.log(`\nCounter examples:`);
console.log(`Initial counter: ${counter}`);
console.log(`++counter: ${++counter}`); // Pre-increment: 6
console.log(`counter++: ${counter++}`); // Post-increment: 6 (then becomes 7)
console.log(`Current counter: ${counter}`); // 7
console.log(`--counter: ${--counter}`); // Pre-decrement: 6
console.log(`counter--: ${counter--}`); // Post-decrement: 6 (then becomes 5)
console.log(`Final counter: ${counter}\n`); // 5

// 2. ASSIGNMENT OPERATORS
console.log("2. Assignment Operators:");
let x = 10;
console.log(`Initial x: ${x}`);

x += 5;  // x = x + 5
console.log(`x += 5: ${x}`);

x -= 3;  // x = x - 3
console.log(`x -= 3: ${x}`);

x *= 2;  // x = x * 2
console.log(`x *= 2: ${x}`);

x /= 4;  // x = x / 4
console.log(`x /= 4: ${x}`);

x %= 3;  // x = x % 3
console.log(`x %= 3: ${x}\n`);

// 3. COMPARISON OPERATORS
console.log("3. Comparison Operators:");
const num1 = 5;
const num2 = "5";
const num3 = 10;

console.log(`num1 = ${num1} (${typeof num1})`);
console.log(`num2 = ${num2} (${typeof num2})`);
console.log(`num3 = ${num3} (${typeof num3})`);

console.log(`num1 == num2: ${num1 == num2}`);   // Loose equality
console.log(`num1 === num2: ${num1 === num2}`); // Strict equality
console.log(`num1 != num2: ${num1 != num2}`);   // Loose inequality
console.log(`num1 !== num2: ${num1 !== num2}`); // Strict inequality

console.log(`num1 > 3: ${num1 > 3}`);
console.log(`num1 < num3: ${num1 < num3}`);
console.log(`num1 >= 5: ${num1 >= 5}`);
console.log(`num1 <= 5: ${num1 <= 5}\n`);

// 4. LOGICAL OPERATORS
console.log("4. Logical Operators:");
const age = 25;
const hasLicense = true;
const hasInsurance = false;

console.log(`age = ${age}, hasLicense = ${hasLicense}, hasInsurance = ${hasInsurance}`);

// AND operator (&&)
console.log(`age >= 18 && hasLicense: ${age >= 18 && hasLicense}`);
console.log(`hasLicense && hasInsurance: ${hasLicense && hasInsurance}`);

// OR operator (||)
console.log(`age < 18 || hasLicense: ${age < 18 || hasLicense}`);
console.log(`hasLicense || hasInsurance: ${hasLicense || hasInsurance}`);

// NOT operator (!)
console.log(`!hasLicense: ${!hasLicense}`);
console.log(`!hasInsurance: ${!hasInsurance}`);

// Short-circuit evaluation
const userName = null;
const displayName = userName || "Guest";
console.log(`userName || "Guest": ${displayName}\n`);

// 5. CONDITIONAL STATEMENTS
console.log("5. Conditional Statements:");

// if...else if...else
function checkAge(userAge) {
    if (userAge >= 65) {
        return "Senior citizen";
    } else if (userAge >= 18) {
        return "Adult";
    } else if (userAge >= 13) {
        return "Teenager";
    } else {
        return "Child";
    }
}

const testAges = [10, 16, 25, 70];
testAges.forEach(testAge => {
    console.log(`Age ${testAge}: ${checkAge(testAge)}`);
});

// Ternary operator
const score = 85;
const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(`Score ${score} gets grade: ${grade}`);

// switch statement
function getDayType(day) {
    switch (day.toLowerCase()) {
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
            return "Weekday";
        case "saturday":
        case "sunday":
            return "Weekend";
        default:
            return "Invalid day";
    }
}

const days = ["Monday", "Saturday", "Wednesday", "xyz"];
days.forEach(day => {
    console.log(`${day}: ${getDayType(day)}`);
});

console.log();

// 6. LOOPS
console.log("6. Loops:");

// for loop
console.log("For loop (0 to 4):");
for (let i = 0; i < 5; i++) {
    console.log(`  Count: ${i}`);
}

// for...in loop (object properties)
console.log("\nFor...in loop (object properties):");
const student = { name: "Alice", age: 20, grade: "A", city: "Boston" };
for (let key in student) {
    console.log(`  ${key}: ${student[key]}`);
}

// for...of loop (array values)
console.log("\nFor...of loop (array values):");
const colors = ["red", "green", "blue", "yellow"];
for (let color of colors) {
    console.log(`  Color: ${color}`);
}

// while loop
console.log("\nWhile loop:");
let count = 0;
while (count < 3) {
    console.log(`  While count: ${count}`);
    count++;
}

// do...while loop
console.log("\nDo...while loop:");
let doCount = 0;
do {
    console.log(`  Do-while count: ${doCount}`);
    doCount++;
} while (doCount < 3);

// Loop control (break and continue)
console.log("\nLoop control (break and continue):");
for (let i = 0; i < 10; i++) {
    if (i === 3) {
        console.log(`  Skipping ${i}`);
        continue; // Skip this iteration
    }
    if (i === 7) {
        console.log(`  Breaking at ${i}`);
        break; // Exit the loop
    }
    console.log(`  Processing ${i}`);
}

// 7. PRACTICAL EXAMPLES
console.log("\n7. Practical Examples:");

// Grade calculator
function calculateGrade(scores) {
    if (!Array.isArray(scores) || scores.length === 0) {
        return "No scores provided";
    }
    
    const total = scores.reduce((sum, score) => sum + score, 0);
    const average = total / scores.length;
    
    if (average >= 90) return `A (${average.toFixed(1)})`;
    if (average >= 80) return `B (${average.toFixed(1)})`;
    if (average >= 70) return `C (${average.toFixed(1)})`;
    if (average >= 60) return `D (${average.toFixed(1)})`;
    return `F (${average.toFixed(1)})`;
}

const studentScores = [85, 92, 78, 96, 88];
console.log(`Student scores: ${studentScores}`);
console.log(`Final grade: ${calculateGrade(studentScores)}`);

// Simple password validator
function validatePassword(password) {
    const conditions = [];
    
    if (password.length < 8) {
        conditions.push("At least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
        conditions.push("At least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
        conditions.push("At least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
        conditions.push("At least one number");
    }
    
    if (conditions.length === 0) {
        return "Password is valid!";
    } else {
        return `Password needs: ${conditions.join(", ")}`;
    }
}

const testPasswords = ["pass", "Password", "Password1", "MySecurePass123"];
testPasswords.forEach(pwd => {
    console.log(`"${pwd}": ${validatePassword(pwd)}`);
});

// Number guessing game logic
function checkGuess(guess, target, attempts) {
    if (guess === target) {
        return `Congratulations! You guessed it in ${attempts} attempts!`;
    } else if (guess < target) {
        return "Too low! Try a higher number.";
    } else {
        return "Too high! Try a lower number.";
    }
}

console.log("\nNumber guessing game examples:");
const target = 42;
const guesses = [25, 50, 40, 42];
guesses.forEach((guess, index) => {
    console.log(`Guess ${index + 1}: ${guess} - ${checkGuess(guess, target, index + 1)}`);
});

console.log("\n=== END OF OPERATORS AND CONTROL EXAMPLES ===");

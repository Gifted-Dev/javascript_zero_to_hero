// Part 1: JavaScript Fundamentals - Exercise Solutions
// Complete solutions with explanations

console.log("=== PART 1 EXERCISE SOLUTIONS ===\n");

// ========================================
// BASIC LEVEL SOLUTIONS
// ========================================

console.log("🔰 BASIC LEVEL SOLUTIONS\n");

// EXERCISE 1: Variable Practice
console.log("Exercise 1: Variable Practice");

// 1. Create variables
const BIRTH_YEAR = 1990;           // Constant - won't change
let currentAge = 33;               // Variable - can change
const MY_NAME = "John Doe";        // Constant - won't change
let favoriteColor = "blue";        // Variable - might change

console.log(`Birth Year: ${BIRTH_YEAR}`);
console.log(`Current Age: ${currentAge}`);
console.log(`Name: ${MY_NAME}`);
console.log(`Favorite Color: ${favoriteColor}`);

// 2. Try to reassign const (commented out to avoid error)
// BIRTH_YEAR = 1991; // ❌ This would cause: TypeError: Assignment to constant variable

// 3. Reassign let variables
currentAge = 34;
favoriteColor = "green";
console.log(`Updated Age: ${currentAge}`);
console.log(`Updated Favorite Color: ${favoriteColor}\n`);

// EXERCISE 2: Data Type Detective
console.log("Exercise 2: Data Type Detective");

function analyzeValue(value) {
    const analysis = {
        type: typeof value,
        value: value,
        isArray: Array.isArray(value),
        isNull: value === null,
        description: ""
    };
    
    // Generate human-readable description
    if (analysis.isNull) {
        analysis.description = "This is a null value (intentionally empty)";
    } else if (analysis.isArray) {
        analysis.description = `This is an array with ${value.length} elements`;
    } else if (analysis.type === "object") {
        analysis.description = "This is an object with key-value pairs";
    } else if (analysis.type === "string") {
        analysis.description = `This is a string with ${value.length} characters`;
    } else if (analysis.type === "number") {
        if (Number.isInteger(value)) {
            analysis.description = "This is an integer number";
        } else {
            analysis.description = "This is a decimal number";
        }
    } else if (analysis.type === "boolean") {
        analysis.description = `This is a boolean value (${value ? 'true' : 'false'})`;
    } else if (analysis.type === "undefined") {
        analysis.description = "This value is undefined (not assigned)";
    } else {
        analysis.description = `This is a ${analysis.type}`;
    }
    
    return analysis;
}

// Test cases
console.log("analyzeValue(42):", analyzeValue(42));
console.log("analyzeValue('hello'):", analyzeValue("hello"));
console.log("analyzeValue([1,2,3]):", analyzeValue([1,2,3]));
console.log("analyzeValue(null):", analyzeValue(null));
console.log();

// EXERCISE 3: Simple Calculator
console.log("Exercise 3: Simple Calculator");

function calculator(num1, operator, num2) {
    // Input validation
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return "Error: Both operands must be numbers";
    }
    
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return "Error: Cannot divide by zero";
            }
            return num1 / num2;
        case '%':
            if (num2 === 0) {
                return "Error: Cannot divide by zero";
            }
            return num1 % num2;
        default:
            return "Invalid operator";
    }
}

// Test cases
console.log("calculator(10, '+', 5):", calculator(10, '+', 5));    // 15
console.log("calculator(10, '/', 0):", calculator(10, '/', 0));    // Error
console.log("calculator(10, '*', 3):", calculator(10, '*', 3));    // 30
console.log("calculator(10, '^', 2):", calculator(10, '^', 2));    // Invalid operator
console.log();

// EXERCISE 4: Age Classifier
console.log("Exercise 4: Age Classifier");

function classifyAge(age) {
    // Input validation
    if (typeof age !== 'number' || age < 0 || !Number.isInteger(age)) {
        return "Invalid age";
    }
    
    if (age >= 0 && age <= 2) {
        return "Baby";
    } else if (age >= 3 && age <= 12) {
        return "Child";
    } else if (age >= 13 && age <= 19) {
        return "Teenager";
    } else if (age >= 20 && age <= 64) {
        return "Adult";
    } else if (age >= 65) {
        return "Senior";
    }
}

// Test cases
console.log("classifyAge(1):", classifyAge(1));      // Baby
console.log("classifyAge(8):", classifyAge(8));      // Child
console.log("classifyAge(16):", classifyAge(16));    // Teenager
console.log("classifyAge(30):", classifyAge(30));    // Adult
console.log("classifyAge(70):", classifyAge(70));    // Senior
console.log("classifyAge(-5):", classifyAge(-5));    // Invalid age
console.log();

// EXERCISE 5: Array Basics
console.log("Exercise 5: Array Basics");

// Create array of favorite movies
const movies = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Pulp Fiction",
    "Forrest Gump"
];

console.log("Original movies:", movies);

// Add movie to end
movies.push("Inception");
console.log("After push:", movies);

// Add movie to beginning
movies.unshift("The Matrix");
console.log("After unshift:", movies);

// Remove last movie
const removedLast = movies.pop();
console.log("Removed last movie:", removedLast);
console.log("After pop:", movies);

// Find index of specific movie
const darkKnightIndex = movies.indexOf("The Dark Knight");
console.log("Index of 'The Dark Knight':", darkKnightIndex);

// Check if movie exists
const hasGodfather = movies.includes("The Godfather");
console.log("Has 'The Godfather':", hasGodfather);

// Movies with more than 10 characters
const longTitleMovies = movies.filter(movie => movie.length > 10);
console.log("Movies with >10 characters:", longTitleMovies);
console.log();

// ========================================
// INTERMEDIATE LEVEL SOLUTIONS
// ========================================

console.log("🔥 INTERMEDIATE LEVEL SOLUTIONS\n");

// EXERCISE 6: Object Manipulation
console.log("Exercise 6: Object Manipulation");

// Create student object
const student = {
    name: "Alice Johnson",
    age: 20,
    grades: [85, 92, 78, 96, 88],
    address: {
        street: "123 College Ave",
        city: "Boston",
        state: "MA"
    }
};

// Function to add a new grade
function addGrade(student, grade) {
    if (typeof grade === 'number' && grade >= 0 && grade <= 100) {
        student.grades.push(grade);
        return true;
    }
    return false;
}

// Function to calculate average grade
function calculateAverage(student) {
    if (student.grades.length === 0) return 0;
    const sum = student.grades.reduce((total, grade) => total + grade, 0);
    return Math.round((sum / student.grades.length) * 100) / 100; // Round to 2 decimals
}

// Function to update address
function updateAddress(student, newAddress) {
    student.address = { ...student.address, ...newAddress };
}

// Function to get full address
function getFullAddress(student) {
    const addr = student.address;
    return `${addr.street}, ${addr.city}, ${addr.state}`;
}

// Function to check if passing
function isPassing(student) {
    return calculateAverage(student) >= 70;
}

// Test the functions
console.log("Original student:", student);
addGrade(student, 94);
console.log("After adding grade:", student.grades);
console.log("Average grade:", calculateAverage(student));
updateAddress(student, { street: "456 University Blvd" });
console.log("Full address:", getFullAddress(student));
console.log("Is passing:", isPassing(student));
console.log();

// EXERCISE 7: Loop Mastery
console.log("Exercise 7: Loop Mastery");

// 1. Using for loop - print numbers 1-10
console.log("Numbers 1-10:");
for (let i = 1; i <= 10; i++) {
    console.log(`  ${i}`);
}

// 2. Using for loop - even numbers 1-20
console.log("Even numbers 1-20:");
for (let i = 2; i <= 20; i += 2) {
    console.log(`  ${i}`);
}

// 3. Using for loop - numbers 10-1 reverse
console.log("Numbers 10-1 (reverse):");
for (let i = 10; i >= 1; i--) {
    console.log(`  ${i}`);
}

// 4. Using while loop - first number > 100 divisible by 7
console.log("First number > 100 divisible by 7:");
let num = 101;
while (num % 7 !== 0) {
    num++;
}
console.log(`  ${num}`);

// 5. Using for...of loop - array with index
console.log("Array elements with index:");
const colors = ["red", "green", "blue", "yellow"];
for (const [index, color] of colors.entries()) {
    console.log(`  Index ${index}: ${color}`);
}

// 6. Using for...in loop - object properties
console.log("Object properties:");
const person = { name: "John", age: 30, city: "NYC", job: "Developer" };
for (const key in person) {
    console.log(`  ${key}: ${person[key]}`);
}
console.log();

// EXERCISE 8: Function Challenge
console.log("Exercise 8: Function Challenge");

// 1. Find largest number in array
function findMax(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null;
    }
    return Math.max(...numbers);
    // Alternative: return numbers.reduce((max, num) => num > max ? num : max);
}

// 2. Count vowels in string
function countVowels(str) {
    if (typeof str !== 'string') return 0;
    const vowels = 'aeiouAEIOU';
    return str.split('').filter(char => vowels.includes(char)).length;
    // Alternative: return (str.match(/[aeiouAEIOU]/g) || []).length;
}

// 3. Reverse a string
function reverseString(str) {
    if (typeof str !== 'string') return '';
    return str.split('').reverse().join('');
}

// 4. Check if palindrome
function isPalindrome(str) {
    if (typeof str !== 'string') return false;
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// Test utility functions
console.log("findMax([3, 7, 1, 9, 2]):", findMax([3, 7, 1, 9, 2]));
console.log("countVowels('Hello World'):", countVowels('Hello World'));
console.log("reverseString('JavaScript'):", reverseString('JavaScript'));
console.log("isPalindrome('A man a plan a canal Panama'):", isPalindrome('A man a plan a canal Panama'));
console.log("isPalindrome('race a car'):", isPalindrome('race a car'));
console.log();

// EXERCISE 9: Grade Book System
console.log("Exercise 9: Grade Book System");

const gradeBook = {
    students: {},
    
    addStudent: function(name) {
        if (typeof name === 'string' && name.trim()) {
            this.students[name] = [];
            return true;
        }
        return false;
    },
    
    addGrade: function(name, grade) {
        if (name in this.students && typeof grade === 'number' && grade >= 0 && grade <= 100) {
            this.students[name].push(grade);
            return true;
        }
        return false;
    },
    
    getAverage: function(name) {
        if (!(name in this.students) || this.students[name].length === 0) {
            return null;
        }
        const grades = this.students[name];
        const sum = grades.reduce((total, grade) => total + grade, 0);
        return Math.round((sum / grades.length) * 100) / 100;
    },
    
    getClassAverage: function() {
        const allStudents = Object.keys(this.students);
        if (allStudents.length === 0) return null;
        
        const averages = allStudents
            .map(name => this.getAverage(name))
            .filter(avg => avg !== null);
            
        if (averages.length === 0) return null;
        
        const sum = averages.reduce((total, avg) => total + avg, 0);
        return Math.round((sum / averages.length) * 100) / 100;
    },
    
    getFailingStudents: function() {
        return Object.keys(this.students)
            .filter(name => {
                const average = this.getAverage(name);
                return average !== null && average < 70;
            });
    },
    
    getTopStudent: function() {
        const students = Object.keys(this.students);
        if (students.length === 0) return null;
        
        let topStudent = null;
        let topAverage = -1;
        
        for (const name of students) {
            const average = this.getAverage(name);
            if (average !== null && average > topAverage) {
                topAverage = average;
                topStudent = name;
            }
        }
        
        return topStudent ? { name: topStudent, average: topAverage } : null;
    }
};

// Test the grade book
gradeBook.addStudent("Alice");
gradeBook.addStudent("Bob");
gradeBook.addStudent("Charlie");

gradeBook.addGrade("Alice", 85);
gradeBook.addGrade("Alice", 92);
gradeBook.addGrade("Alice", 78);

gradeBook.addGrade("Bob", 95);
gradeBook.addGrade("Bob", 88);
gradeBook.addGrade("Bob", 91);

gradeBook.addGrade("Charlie", 65);
gradeBook.addGrade("Charlie", 70);
gradeBook.addGrade("Charlie", 58);

console.log("Alice's average:", gradeBook.getAverage("Alice"));
console.log("Class average:", gradeBook.getClassAverage());
console.log("Failing students:", gradeBook.getFailingStudents());
console.log("Top student:", gradeBook.getTopStudent());
console.log();

// ========================================
// ADVANCED LEVEL SOLUTIONS
// ========================================

console.log("🚀 ADVANCED LEVEL SOLUTIONS\n");

// EXERCISE 10: Scope and Hoisting Quiz Answers
console.log("Exercise 10: Scope and Hoisting Quiz Answers");

console.log("Quiz 1 - console.log(x); var x = 5;");
console.log("Answer: undefined (variable is hoisted but not initialized)");

console.log("Quiz 2 - console.log(y); let y = 10;");
console.log("Answer: ReferenceError (temporal dead zone)");

console.log("Quiz 3 - function with var and let");
console.log("Answer: undefined for 'a', ReferenceError for 'b'");

console.log("Quiz 4 - var in loop with setTimeout");
console.log("Answer: 3, 3, 3 (var is function-scoped, closure captures final value)");

console.log("Quiz 5 - let in loop with setTimeout");
console.log("Answer: 0, 1, 2 (let is block-scoped, each iteration has own variable)");
console.log();

// EXERCISE 11: Advanced Array Methods
console.log("Exercise 11: Advanced Array Methods");

const employees = [
    { name: "Alice", department: "Engineering", salary: 90000, years: 3 },
    { name: "Bob", department: "Marketing", salary: 65000, years: 1 },
    { name: "Charlie", department: "Engineering", salary: 95000, years: 5 },
    { name: "Diana", department: "HR", salary: 70000, years: 2 },
    { name: "Eve", department: "Marketing", salary: 75000, years: 4 }
];

// 1. Find all engineers
const engineers = employees.filter(emp => emp.department === "Engineering");
console.log("Engineers:", engineers.map(emp => emp.name));

// 2. Get names of employees earning > $70,000
const highEarners = employees
    .filter(emp => emp.salary > 70000)
    .map(emp => emp.name);
console.log("High earners (>$70k):", highEarners);

// 3. Calculate total salary
const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
console.log("Total salary:", totalSalary);

// 4. Find most experienced employee
const mostExperienced = employees.reduce((most, emp) => 
    emp.years > most.years ? emp : most
);
console.log("Most experienced:", mostExperienced.name, `(${mostExperienced.years} years)`);

// 5. Group employees by department
const byDepartment = employees.reduce((groups, emp) => {
    if (!groups[emp.department]) {
        groups[emp.department] = [];
    }
    groups[emp.department].push(emp);
    return groups;
}, {});
console.log("Grouped by department:", byDepartment);

// 6. Calculate average salary by department
const avgSalaryByDept = Object.keys(byDepartment).reduce((averages, dept) => {
    const deptEmployees = byDepartment[dept];
    const avgSalary = deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) / deptEmployees.length;
    averages[dept] = Math.round(avgSalary);
    return averages;
}, {});
console.log("Average salary by department:", avgSalaryByDept);

// 7. Find employees with 3+ years experience earning < $80,000
const experiencedLowPaid = employees.filter(emp => emp.years >= 3 && emp.salary < 80000);
console.log("Experienced but underpaid:", experiencedLowPaid.map(emp => emp.name));
console.log();

// EXERCISE 12: Function Factory
console.log("Exercise 12: Function Factory");

function createValidator(type) {
    switch (type) {
        case 'email':
            return function(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            };
            
        case 'phone':
            return function(phone) {
                const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                return phoneRegex.test(phone);
            };
            
        case 'password':
            return function(password) {
                // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
                return password.length >= 8 &&
                       /[A-Z]/.test(password) &&
                       /[a-z]/.test(password) &&
                       /[0-9]/.test(password);
            };
            
        case 'number':
            return function(value, min = -Infinity, max = Infinity) {
                const num = Number(value);
                return !isNaN(num) && num >= min && num <= max;
            };
            
        default:
            return function() { return false; };
    }
}

// Test validators
const emailValidator = createValidator('email');
const phoneValidator = createValidator('phone');
const passwordValidator = createValidator('password');
const numberValidator = createValidator('number');

console.log("Email tests:");
console.log("  'test@example.com':", emailValidator('test@example.com'));
console.log("  'invalid-email':", emailValidator('invalid-email'));

console.log("Phone tests:");
console.log("  '(555) 123-4567':", phoneValidator('(555) 123-4567'));
console.log("  '555.123.4567':", phoneValidator('555.123.4567'));
console.log("  'invalid':", phoneValidator('invalid'));

console.log("Password tests:");
console.log("  'MySecure123':", passwordValidator('MySecure123'));
console.log("  'weak':", passwordValidator('weak'));

console.log("Number tests:");
console.log("  numberValidator('42', 0, 100):", numberValidator('42', 0, 100));
console.log("  numberValidator('150', 0, 100):", numberValidator('150', 0, 100));
console.log();

console.log("=== END OF SOLUTIONS ===");

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzeValue,
        calculator,
        classifyAge,
        findMax,
        countVowels,
        reverseString,
        isPalindrome,
        gradeBook,
        createValidator
    };
}

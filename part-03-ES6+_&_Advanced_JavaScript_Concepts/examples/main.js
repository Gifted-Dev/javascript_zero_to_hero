/**
 * main.js
 * This is the main entry point for our examples.
 * It imports from other modules and demonstrates all key ES6+ features.
 */

// --- 7. ES6 Modules: `import` & `export` ---
// We are importing from our `utils.js` module.
import multiply, { PI, add as sum } from './utils.js';
import * as utils from './utils.js';

console.log("--- ES6+ & Advanced Concepts Examples ---");

const outputDiv = document.getElementById('output');
const logToPage = (title, content) => {
    const group = document.createElement('div');
    group.className = 'log-group';
    group.innerHTML = `<h3>${title}</h3><pre>${JSON.stringify(content, null, 2)}</pre>`;
    outputDiv.appendChild(group);
};

console.log("Module Imports:", { PI, sum, multiply, utils });
logToPage("Module Imports", { PI, sumResult: sum(10, 5), multiplyResult: multiply(10, 5), utils });


// --- 2. Arrow Functions ---
console.group("2. Arrow Functions");
const square = x => x * x;
const createGreeting = (name) => `Hello, ${name}!`;
console.log("Square of 5:", square(5));
console.log(createGreeting("World"));
console.groupEnd();
logToPage("Arrow Functions", { squareOf5: square(5), greeting: createGreeting("World") });


// --- 3. Template Literals ---
console.group("3. Template Literals");
const user = "Alice";
const items = 3;
const price = 15.50;
const message = `
User: ${user}
Items: ${items}
Total: $${(items * price).toFixed(2)}
`;
console.log(message);
console.groupEnd();
logToPage("Template Literals", message.trim());


// --- 4. Default, Rest, and Spread ---
console.group("4. Default, Rest, and Spread");
// Default
const applyDiscount = (cost, discount = 0.10) => cost * (1 - discount);
console.log("With default discount (100):", applyDiscount(100));
console.log("With specified discount (100, 0.25):", applyDiscount(100, 0.25));

// Rest
function logArgs(first, ...rest) {
    console.log("First argument:", first);
    console.log("Rest of arguments:", rest);
}
logArgs("a", "b", "c", "d");

// Spread (Arrays)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log("Spread arrays:", combined);

// Spread (Objects)
const obj1 = { name: "Laptop", price: 1200 };
const obj2 = { ...obj1, inStock: true, price: 1300 }; // price is overwritten
console.log("Spread objects:", obj2);
console.groupEnd();
logToPage("Default, Rest, Spread", {
    defaultDiscount: applyDiscount(100),
    specifiedDiscount: applyDiscount(100, 0.25),
    restExample: "Check console for logArgs output",
    spreadArrays: combined,
    spreadObjects: obj2
});


// --- 5. Destructuring Assignment ---
console.group("5. Destructuring");
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 40,
    address: { city: "New York" }
};

// Object destructuring with rename and default value
const { firstName: fName, age, country = "USA" } = person;
console.log("Destructured Object:", { fName, age, country });

// Array destructuring with rest
const numbers = [10, 20, 30, 40, 50];
const [first, second, ...others] = numbers;
console.log("Destructured Array:", { first, second, others });
console.groupEnd();
logToPage("Destructuring", {
    object: { fName, age, country },
    array: { first, second, others }
});


// --- 6. Enhanced Object Literals ---
console.group("6. Enhanced Object Literals");
const name = "My App";
const version = "2.0";
const myApp = {
    name, // Shorthand property
    version,
    start() { // Shorthand method
        return `${this.name} v${this.version} is running.`;
    },
    ['app_' + 'id']: 12345 // Computed property name
};
console.log(myApp);
console.log(myApp.start());
console.groupEnd();
logToPage("Enhanced Object Literals", { app: myApp, startMessage: myApp.start() });


// --- 8. JavaScript Classes ---
console.group("8. Classes");
class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
    getInfo() {
        return `${this.make} ${this.model}`;
    }
}
class Car extends Vehicle {
    constructor(make, model, doors) {
        super(make, model); // Call parent constructor
        this.doors = doors;
    }
    getInfo() { // Override parent method
        return `${super.getInfo()} with ${this.doors} doors.`;
    }
}
const myCar = new Car("Honda", "Civic", 4);
console.log(myCar.getInfo());
console.groupEnd();
logToPage("Classes", { carInfo: myCar.getInfo() });


// --- 9. Promises ---
console.group("9. Promises");
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve({ data: "Here is your data!", timestamp: Date.now() });
        } else {
            reject("Failed to fetch data.");
        }
    }, 1500);
});

console.log("Fetching data...");
fetchData
    .then(response => {
        console.log("Promise Resolved:", response);
        logToPage("Promises", { status: "Resolved", response });
    })
    .catch(error => {
        console.error("Promise Rejected:", error);
        logToPage("Promises", { status: "Rejected", error });
    });
console.groupEnd();


// --- 10. Other Key ES6+ Features ---
console.group("10. Other Key Features");
const data = { user: { profile: { name: "Jane" } }, settings: { theme: null } };

// Optional Chaining (?.)
const userName = data.user?.profile?.name; // "Jane"
const userCity = data.user?.address?.city; // undefined (no error)
console.log("Optional Chaining:", { userName, userCity });

// Nullish Coalescing (??)
const theme = data.settings?.theme ?? 'light'; // 'light' (because theme is null)
const volume = 0;
const audioLevel = volume ?? 50; // 0 (because 0 is not null/undefined)
console.log("Nullish Coalescing:", { theme, audioLevel });
console.groupEnd();
logToPage("Other Key Features", {
    optionalChaining: { userName, userCity },
    nullishCoalescing: { theme, audioLevel }
});
# Part 2: DOM Manipulation & Web APIs
## Making Websites Interactive

Welcome to Part 2! Now that you've mastered JavaScript fundamentals, it's time to learn how to make websites interactive by manipulating the DOM (Document Object Model).

## 📋 Table of Contents
1. [Introduction to the DOM](#introduction-dom)
2. [Selecting DOM Elements](#selecting-elements)
3. [Manipulating Elements](#manipulating-elements)
4. [Event Handling](#event-handling)
5. [Creating and Removing Elements](#creating-removing)
6. [Working with Forms](#working-forms)
7. [Browser APIs](#browser-apis)
8. [Best Practices](#best-practices)

---

## 1. Introduction to the DOM {#introduction-dom}

### What is the DOM?
The **Document Object Model (DOM)** is JavaScript's representation of the HTML document. It's a tree-like structure where each HTML element is a "node" that can be accessed and modified.

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1 id="title">Hello World</h1>
    <p class="intro">Welcome to JavaScript!</p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
</body>
</html>
```

**DOM Tree Structure:**
```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1 (id="title")
        ├── p (class="intro")
        └── ul
            ├── li
            └── li
```

### The Document Object
The `document` object is your gateway to the DOM:

```javascript
console.log(document);           // The entire document
console.log(document.title);     // Page title
console.log(document.URL);       // Current URL
console.log(document.domain);    // Domain name

// Document ready state
console.log(document.readyState); // "loading", "interactive", or "complete"
```

---

## 2. Selecting DOM Elements {#selecting-elements}

### Modern Selection Methods (Preferred)

#### querySelector() - First Matching Element
```javascript
// Select by ID
const title = document.querySelector('#title');

// Select by class
const intro = document.querySelector('.intro');

// Select by element type
const firstParagraph = document.querySelector('p');

// Select by attribute
const submitBtn = document.querySelector('[type="submit"]');

// Complex selectors
const firstListItem = document.querySelector('ul li:first-child');
const navLink = document.querySelector('nav a.active');
```

#### querySelectorAll() - All Matching Elements
```javascript
// Select all elements with class 'item'
const allItems = document.querySelectorAll('.item');

// Select all list items
const listItems = document.querySelectorAll('li');

// Select all buttons
const buttons = document.querySelectorAll('button');

// Convert NodeList to Array
const itemsArray = Array.from(allItems);
const itemsSpread = [...listItems];
```

### Legacy Selection Methods

#### By ID
```javascript
const element = document.getElementById('myId');
// Note: No # symbol needed
```

#### By Class Name
```javascript
const elements = document.getElementsByClassName('myClass');
// Returns HTMLCollection (live collection)
```

#### By Tag Name
```javascript
const paragraphs = document.getElementsByTagName('p');
// Returns HTMLCollection
```

### Element Relationships
```javascript
const element = document.querySelector('#myElement');

// Parent relationships
console.log(element.parentNode);        // Direct parent
console.log(element.parentElement);     // Parent element
console.log(element.closest('.container')); // Closest ancestor with class

// Child relationships
console.log(element.children);          // Child elements
console.log(element.childNodes);        // All child nodes (including text)
console.log(element.firstElementChild); // First child element
console.log(element.lastElementChild);  // Last child element

// Sibling relationships
console.log(element.nextElementSibling);     // Next sibling element
console.log(element.previousElementSibling); // Previous sibling element
```

---

## 3. Manipulating Elements {#manipulating-elements}

### Changing Content

#### textContent vs innerHTML
```javascript
const element = document.querySelector('#myElement');

// textContent - plain text only, safe from XSS
element.textContent = 'Hello World';
console.log(element.textContent); // Gets text content

// innerHTML - can include HTML, potential XSS risk
element.innerHTML = '<strong>Bold Text</strong>';
console.log(element.innerHTML); // Gets HTML content

// innerText - visible text only (respects styling)
element.innerText = 'Visible text';
```

#### Practical Examples
```javascript
// Update a counter
const counter = document.querySelector('#counter');
let count = 0;
counter.textContent = `Count: ${++count}`;

// Create a list dynamically
const list = document.querySelector('#dynamic-list');
const items = ['Apple', 'Banana', 'Orange'];
list.innerHTML = items.map(item => `<li>${item}</li>`).join('');

// Safe HTML insertion (avoiding XSS)
function safeHTML(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? String(values[i]).replace(/[<>"'&]/g, 
            char => ({ '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;' })[char]
        ) : '';
        return result + string + value;
    }, '');
}
```

### Working with Attributes

#### Standard Attributes
```javascript
const link = document.querySelector('a');

// Get attribute
console.log(link.href);         // Direct property access
console.log(link.getAttribute('href')); // Method access

// Set attribute
link.href = 'https://example.com';
link.setAttribute('href', 'https://example.com');

// Check if attribute exists
console.log(link.hasAttribute('target')); // true/false

// Remove attribute
link.removeAttribute('target');

// Common attributes
const img = document.querySelector('img');
img.src = 'new-image.jpg';
img.alt = 'Description of image';
img.width = 300;
img.height = 200;
```

#### Data Attributes
```javascript
// HTML: <div data-user-id="123" data-theme="dark">
const element = document.querySelector('div');

// Access data attributes
console.log(element.dataset.userId);  // "123"
console.log(element.dataset.theme);   // "dark"

// Set data attributes
element.dataset.newAttribute = 'value';
element.dataset.userId = '456';

// Remove data attribute
delete element.dataset.theme;
```

### Styling Elements

#### Inline Styles
```javascript
const element = document.querySelector('#myElement');

// Set individual styles
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '16px';
element.style.marginTop = '10px';

// Set multiple styles
Object.assign(element.style, {
    color: 'white',
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '5px'
});

// Get computed styles
const computedStyles = window.getComputedStyle(element);
console.log(computedStyles.color);
console.log(computedStyles.fontSize);
```

#### CSS Classes
```javascript
const element = document.querySelector('#myElement');

// Add class
element.classList.add('active');
element.classList.add('primary', 'large'); // Multiple classes

// Remove class
element.classList.remove('inactive');

// Toggle class
element.classList.toggle('hidden'); // Adds if not present, removes if present

// Check if class exists
if (element.classList.contains('active')) {
    console.log('Element is active');
}

// Replace class
element.classList.replace('old-class', 'new-class');

// Get all classes
console.log(element.className); // String of all classes
console.log([...element.classList]); // Array of classes
```

#### CSS Custom Properties (Variables)
```javascript
// Set CSS custom property
document.documentElement.style.setProperty('--main-color', '#3498db');

// Get CSS custom property
const mainColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--main-color');

// Use in element styling
element.style.setProperty('--local-color', 'red');
```

---

## 4. Event Handling {#event-handling}

### Adding Event Listeners

#### Basic Event Handling
```javascript
const button = document.querySelector('#myButton');

// Method 1: addEventListener (preferred)
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log('Event object:', event);
});

// Method 2: Arrow function
button.addEventListener('click', (event) => {
    console.log('Button clicked with arrow function!');
});

// Method 3: Named function
function handleClick(event) {
    console.log('Button clicked with named function!');
}
button.addEventListener('click', handleClick);

// Method 4: Inline (not recommended)
// button.onclick = function() { console.log('Clicked'); };
```

### Common Events

#### Mouse Events
```javascript
const element = document.querySelector('#interactive');

element.addEventListener('click', (e) => console.log('Clicked'));
element.addEventListener('dblclick', (e) => console.log('Double clicked'));
element.addEventListener('mousedown', (e) => console.log('Mouse down'));
element.addEventListener('mouseup', (e) => console.log('Mouse up'));
element.addEventListener('mouseover', (e) => console.log('Mouse over'));
element.addEventListener('mouseout', (e) => console.log('Mouse out'));
element.addEventListener('mouseenter', (e) => console.log('Mouse enter'));
element.addEventListener('mouseleave', (e) => console.log('Mouse leave'));
element.addEventListener('mousemove', (e) => {
    console.log(`Mouse at: ${e.clientX}, ${e.clientY}`);
});
```

#### Keyboard Events
```javascript
const input = document.querySelector('#textInput');

input.addEventListener('keydown', (e) => {
    console.log(`Key down: ${e.key}`);
    console.log(`Key code: ${e.code}`);
    
    // Check for specific keys
    if (e.key === 'Enter') {
        console.log('Enter key pressed');
    }
    
    // Check for modifier keys
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Prevent browser save
        console.log('Ctrl+S pressed');
    }
});

input.addEventListener('keyup', (e) => console.log(`Key up: ${e.key}`));
input.addEventListener('keypress', (e) => console.log(`Key press: ${e.key}`));
```

#### Form Events
```javascript
const form = document.querySelector('#myForm');
const input = document.querySelector('#myInput');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    console.log('Form submitted');
});

input.addEventListener('focus', (e) => console.log('Input focused'));
input.addEventListener('blur', (e) => console.log('Input lost focus'));
input.addEventListener('change', (e) => console.log('Input changed'));
input.addEventListener('input', (e) => console.log('Input value:', e.target.value));
```

#### Window Events
```javascript
window.addEventListener('load', () => {
    console.log('Page fully loaded');
});

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
});

window.addEventListener('resize', () => {
    console.log(`Window size: ${window.innerWidth}x${window.innerHeight}`);
});

window.addEventListener('scroll', () => {
    console.log(`Scroll position: ${window.scrollY}`);
});
```

### Event Object Properties
```javascript
button.addEventListener('click', (event) => {
    console.log('Event type:', event.type);        // 'click'
    console.log('Target element:', event.target);  // Element that triggered event
    console.log('Current target:', event.currentTarget); // Element with listener
    console.log('Mouse X:', event.clientX);        // X coordinate
    console.log('Mouse Y:', event.clientY);        // Y coordinate
    console.log('Timestamp:', event.timeStamp);    // When event occurred
    
    // Prevent default behavior
    event.preventDefault();
    
    // Stop event propagation
    event.stopPropagation();
});
```

### Event Delegation
```javascript
// Instead of adding listeners to many elements
// Add one listener to parent and use event delegation

const list = document.querySelector('#itemList');

list.addEventListener('click', (event) => {
    // Check if clicked element is a list item
    if (event.target.tagName === 'LI') {
        console.log('List item clicked:', event.target.textContent);
        event.target.classList.toggle('selected');
    }
    
    // Check by class
    if (event.target.classList.contains('delete-btn')) {
        event.target.closest('li').remove();
    }
});

// Benefits:
// 1. Better performance with many elements
// 2. Works with dynamically added elements
// 3. Less memory usage
```

### Removing Event Listeners
```javascript
function handleClick() {
    console.log('Clicked');
}

// Add listener
button.addEventListener('click', handleClick);

// Remove listener (must be same function reference)
button.removeEventListener('click', handleClick);

// Using AbortController for complex cleanup
const controller = new AbortController();

button.addEventListener('click', handleClick, {
    signal: controller.signal
});

// Remove all listeners added with this controller
controller.abort();
```

---

## 5. Creating and Removing Elements {#creating-removing}

### Creating Elements

#### createElement Method
```javascript
// Create new element
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.className = 'my-class';
newDiv.id = 'my-id';

// Create complex element
const card = document.createElement('div');
card.className = 'card';
card.innerHTML = `
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
    <button>Click me</button>
`;

// Create with attributes
const img = document.createElement('img');
img.src = 'image.jpg';
img.alt = 'Description';
img.width = 300;
```

#### Template Literals for Complex HTML
```javascript
function createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
        <img src="${user.avatar}" alt="${user.name}" class="avatar">
        <h3>${user.name}</h3>
        <p>${user.email}</p>
        <button data-user-id="${user.id}" class="contact-btn">Contact</button>
    `;
    return card;
}

const user = { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'avatar.jpg' };
const userCard = createUserCard(user);
```

### Adding Elements to DOM

#### Append Methods
```javascript
const parent = document.querySelector('#container');
const child = document.createElement('p');
child.textContent = 'New paragraph';

// Append to end
parent.appendChild(child);              // Old method
parent.append(child);                   // New method (preferred)
parent.append('Text node', child);      // Can append multiple items

// Prepend to beginning
parent.prepend(child);                  // Add to beginning

// Insert at specific position
parent.insertBefore(child, parent.firstChild); // Old method

// Modern insertion methods
const referenceElement = parent.children[1];
referenceElement.before(child);         // Insert before reference
referenceElement.after(child);          // Insert after reference
```

#### insertAdjacentHTML Method
```javascript
const element = document.querySelector('#target');

// Insert HTML at different positions
element.insertAdjacentHTML('beforebegin', '<p>Before the element</p>');
element.insertAdjacentHTML('afterbegin', '<p>At the start of element</p>');
element.insertAdjacentHTML('beforeend', '<p>At the end of element</p>');
element.insertAdjacentHTML('afterend', '<p>After the element</p>');

// Also available: insertAdjacentElement, insertAdjacentText
```

### Removing Elements

#### Remove Methods
```javascript
const element = document.querySelector('#toRemove');

// Modern way (preferred)
element.remove();

// Old way
element.parentNode.removeChild(element);

// Remove all children
const parent = document.querySelector('#parent');
parent.innerHTML = ''; // Quick but not always ideal

// Better way to remove all children
while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}

// Modern way to remove all children
parent.replaceChildren(); // Removes all child nodes
```

#### Replace Elements
```javascript
const oldElement = document.querySelector('#old');
const newElement = document.createElement('div');
newElement.textContent = 'New content';

// Replace element
oldElement.replaceWith(newElement);

// Old method
oldElement.parentNode.replaceChild(newElement, oldElement);
```

### Cloning Elements
```javascript
const original = document.querySelector('#original');

// Shallow clone (element only)
const shallowClone = original.cloneNode();

// Deep clone (element and all children)
const deepClone = original.cloneNode(true);

// Add clone to DOM
document.body.append(deepClone);
```

---

## 6. Working with Forms {#working-forms}

### Form Element Access
```javascript
const form = document.querySelector('#myForm');

// Access form elements
const nameInput = form.elements.name;        // By name attribute
const emailInput = form.elements['email'];   // By name attribute
const submitBtn = form.elements[0];          // By index

// Alternative access methods
const nameInput2 = form.querySelector('[name="name"]');
const emailInput2 = document.getElementById('email');
```

### Form Data Handling

#### Getting Form Values
```javascript
const form = document.querySelector('#userForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get individual values
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const age = form.elements.age.value;
    
    // Get checkbox/radio values
    const newsletter = form.elements.newsletter.checked;
    const gender = form.elements.gender.value; // for radio buttons
    
    // Get select values
    const country = form.elements.country.value;
    const skills = [...form.elements.skills.selectedOptions]
        .map(option => option.value); // for multi-select
    
    console.log({ name, email, age, newsletter, gender, country, skills });
});
```

#### Using FormData API
```javascript
const form = document.querySelector('#myForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData(form);
    
    // Get all form data
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    
    // Convert to regular object
    const data = Object.fromEntries(formData);
    console.log(data);
    
    // Send to server
    fetch('/submit', {
        method: 'POST',
        body: formData
    });
});
```

### Form Validation

#### HTML5 Validation
```javascript
const input = document.querySelector('#email');

// Check validity
console.log(input.validity.valid);        // Overall validity
console.log(input.validity.valueMissing); // Required field empty
console.log(input.validity.typeMismatch);  // Wrong type (e.g., invalid email)
console.log(input.validity.patternMismatch); // Pattern not matched
console.log(input.validationMessage);     // Browser's validation message

// Custom validation
input.addEventListener('input', () => {
    if (input.value.includes('spam')) {
        input.setCustomValidity('Email cannot contain "spam"');
    } else {
        input.setCustomValidity(''); // Clear custom validation
    }
});
```

#### Custom Validation
```javascript
function validateForm() {
    const form = document.querySelector('#myForm');
    const errors = {};
    
    // Validate name
    const name = form.elements.name.value.trim();
    if (name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    // Validate email
    const email = form.elements.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email';
    }
    
    // Validate age
    const age = parseInt(form.elements.age.value);
    if (isNaN(age) || age < 18 || age > 120) {
        errors.age = 'Age must be between 18 and 120';
    }
    
    // Display errors
    displayErrors(errors);
    
    return Object.keys(errors).length === 0;
}

function displayErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.remove());
    
    // Display new errors
    for (let [field, message] of Object.entries(errors)) {
        const input = document.querySelector(`[name="${field}"]`);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
}
```

---

## 7. Browser APIs {#browser-apis}

### Local Storage
```javascript
// Store data
localStorage.setItem('username', 'john_doe');
localStorage.setItem('preferences', JSON.stringify({
    theme: 'dark',
    language: 'en'
}));

// Retrieve data
const username = localStorage.getItem('username');
const preferences = JSON.parse(localStorage.getItem('preferences') || '{}');

// Remove data
localStorage.removeItem('username');

// Clear all data
localStorage.clear();

// Check if key exists
if (localStorage.getItem('username')) {
    console.log('Username exists');
}

// Storage events (listen for changes in other tabs)
window.addEventListener('storage', (e) => {
    console.log('Storage changed:', e.key, e.newValue);
});
```

### Session Storage
```javascript
// Same API as localStorage, but data expires when tab closes
sessionStorage.setItem('tempData', 'value');
const tempData = sessionStorage.getItem('tempData');
sessionStorage.removeItem('tempData');
sessionStorage.clear();
```

### Geolocation API
```javascript
if (navigator.geolocation) {
    // Get current position
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Location: ${latitude}, ${longitude}`);
        },
        (error) => {
            console.error('Geolocation error:', error.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
    
    // Watch position changes
    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            console.log('Position updated:', position.coords);
        }
    );
    
    // Stop watching
    navigator.geolocation.clearWatch(watchId);
}
```

### Notification API
```javascript
// Request permission
async function requestNotificationPermission() {
    if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    return Notification.permission === 'granted';
}

// Show notification
async function showNotification(title, options = {}) {
    if (await requestNotificationPermission()) {
        const notification = new Notification(title, {
            body: options.body || '',
            icon: options.icon || '/icon.png',
            tag: options.tag || 'default'
        });
        
        notification.onclick = () => {
            console.log('Notification clicked');
            notification.close();
        };
    }
}

// Usage
showNotification('Hello!', {
    body: 'This is a notification',
    icon: '/notification-icon.png'
});
```

### Fetch API (Preview for Part 4)
```javascript
// Basic GET request
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// POST request
fetch('/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
    })
})
.then(response => response.json())
.then(data => console.log('Success:', data));
```

---

## 8. Best Practices {#best-practices}

### Performance Optimization

#### Efficient DOM Queries
```javascript
// ❌ Bad: Repeated queries
function updateItems() {
    document.querySelector('#item1').textContent = 'Updated';
    document.querySelector('#item1').className = 'active';
    document.querySelector('#item1').style.color = 'red';
}

// ✅ Good: Cache DOM references
function updateItems() {
    const item1 = document.querySelector('#item1');
    item1.textContent = 'Updated';
    item1.className = 'active';
    item1.style.color = 'red';
}

// ✅ Better: Batch DOM updates
function updateItems() {
    const item1 = document.querySelector('#item1');
    
    // Batch style changes
    Object.assign(item1.style, {
        color: 'red',
        backgroundColor: 'blue',
        padding: '10px'
    });
    
    // Or use CSS classes
    item1.className = 'active updated';
}
```

#### Minimize Reflows and Repaints
```javascript
// ❌ Bad: Multiple reflows
element.style.width = '100px';
element.style.height = '100px';
element.style.padding = '10px';

// ✅ Good: Single reflow
element.style.cssText = 'width: 100px; height: 100px; padding: 10px;';

// ✅ Better: Use CSS classes
element.className = 'optimized-style';
```

### Security Considerations

#### Prevent XSS Attacks
```javascript
// ❌ Dangerous: Direct HTML insertion
function displayUserContent(userInput) {
    element.innerHTML = userInput; // XSS vulnerability!
}

// ✅ Safe: Use textContent for user data
function displayUserContent(userInput) {
    element.textContent = userInput;
}

// ✅ Safe: Sanitize HTML if needed
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function displayUserContent(userInput) {
    element.innerHTML = sanitizeHTML(userInput);
}
```

### Code Organization

#### Modular Code Structure
```javascript
// DOM utility module
const DOMUtils = {
    select: (selector) => document.querySelector(selector),
    selectAll: (selector) => document.querySelectorAll(selector),
    
    create: (tag, attributes = {}, content = '') => {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        if (content) element.textContent = content;
        return element;
    },
    
    on: (element, event, handler) => {
        element.addEventListener(event, handler);
    },
    
    addClass: (element, className) => {
        element.classList.add(className);
    }
};

// Usage
const button = DOMUtils.create('button', { className: 'btn' }, 'Click me');
DOMUtils.on(button, 'click', () => console.log('Clicked'));
```

#### Event Handler Organization
```javascript
// Organize event handlers
const EventHandlers = {
    handleButtonClick(event) {
        console.log('Button clicked:', event.target);
    },
    
    handleFormSubmit(event) {
        event.preventDefault();
        // Handle form submission
    },
    
    handleInputChange(event) {
        console.log('Input changed:', event.target.value);
    }
};

// Bind events
document.addEventListener('DOMContentLoaded', () => {
    DOMUtils.on(DOMUtils.select('#myButton'), 'click', EventHandlers.handleButtonClick);
    DOMUtils.on(DOMUtils.select('#myForm'), 'submit', EventHandlers.handleFormSubmit);
});
```

---

## 🎯 Key Takeaways

1. **DOM Selection**: Use `querySelector` and `querySelectorAll` for modern, flexible element selection
2. **Event Handling**: Use `addEventListener` with event delegation for efficient event management
3. **Content Manipulation**: Prefer `textContent` for safety, use `innerHTML` only when necessary
4. **Performance**: Cache DOM references, batch updates, minimize reflows
5. **Security**: Always sanitize user input, avoid XSS vulnerabilities
6. **Organization**: Structure code modularly, separate concerns

---

## 🚀 What's Next?

You've learned how to make websites interactive! Next up:
- **Part 3**: ES6+ & Advanced JavaScript Concepts
- Practice with the exercises in the `exercises/` folder
- Build interactive projects in the `projects/` folder

The DOM is your playground now - go build amazing interactive experiences! 🎨

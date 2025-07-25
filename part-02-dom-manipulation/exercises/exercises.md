# Part 2: DOM Manipulation - Exercises

Complete these exercises to master interacting with web pages using JavaScript.

## 🎯 How to Use These Exercises

1.  Create an `index.html` and `exercises.js` file to work in.
2.  For each exercise, write the HTML structure needed and then the JavaScript to solve the problem.
3.  Test your code in the browser's console and by interacting with the page.

---

## 📚 Basic Level (Must Complete All)

### Exercise 1: Element Selection
Create an HTML page with a `<h1>`, a `<p class="intro">`, and a `<ul>` with three `<li>` items.
```javascript
// TODO: In your JS file, select and log the following to the console:
// 1. The h1 element by its ID.
// 2. The p element by its class.
// 3. The first li element using a tag name.
// 4. All li elements using querySelectorAll.
```

### Exercise 2: Content Modification
Using the HTML from Exercise 1:
```javascript
// TODO: Write JavaScript to:
// 1. Change the text of the h1 to "Welcome to DOM Exercises!".
// 2. Change the HTML of the p element to include a <strong> tag around the word "intro".
// 3. Change the text of the second list item to "Updated Item".
```

### Exercise 3: Style and Attribute Changes
Add an `<img>` tag with a `src` attribute and a `<button>` to your HTML.
```javascript
// TODO: Write JavaScript to:
// 1. Change the background color of the body to a light gray (#f0f0f0).
// 2. Add a class 'highlight' to the h1 element, which in your CSS should make the text blue.
// 3. When the button is clicked, change the src of the img to a different image URL.
```

### Exercise 4: Simple Event Handling
Add a button to your HTML with the text "Click Me".
```javascript
// TODO: Write JavaScript to:
// 1. Add a 'click' event listener to the button.
// 2. When the button is clicked, log "Button was clicked!" to the console.
// 3. When the button is clicked, also disable the button so it can't be clicked again.
```

---

## 🔥 Intermediate Level

### Exercise 5: Creating and Appending Elements
Create an empty `<div>` with an id `card-container`.
```javascript
// TODO: Write a function `createCard(title, content)` that:
// 1. Creates a new div with a class 'card'.
// 2. Creates an h3 element with the text from the `title` parameter.
// 3. Creates a p element with the text from the `content` parameter.
// 4. Appends the h3 and p to the 'card' div.
// 5. Appends the new 'card' div to the `card-container`.
// Call this function three times with different titles and content.
```

### Exercise 6: Event Delegation
Create a `<ul>` with several `<li>` items.
```javascript
// TODO: Write JavaScript to:
// 1. Add ONE event listener to the parent <ul>.
// 2. When an <li> inside the ul is clicked, toggle a 'completed' class on that specific <li>.
// 3. The 'completed' class in your CSS should add a line-through text decoration.
// 4. This should work even for new <li> items added to the list later.
```

### Exercise 7: Basic Form Handling
Create a form with two text inputs (for name and email) and a submit button.
```javascript
// TODO: Write JavaScript to:
// 1. Prevent the form's default submission behavior.
// 2. On submission, get the values from the name and email inputs.
// 3. Log an object with the name and email to the console.
// 4. Clear the input fields after submission.
```

### Exercise 8: Working with Local Storage
Create two buttons: "Set Theme" and "Clear Theme".
```javascript
// TODO: Write JavaScript to:
// 1. When "Set Theme" is clicked, prompt the user for a theme ('dark' or 'light').
// 2. Save the user's choice in localStorage under the key 'userTheme'.
// 3. When the page loads, check if 'userTheme' exists in localStorage. If it does, apply a corresponding class to the <body> (e.g., 'dark-theme').
// 4. When "Clear Theme" is clicked, remove 'userTheme' from localStorage and remove the theme class from the body.
```

---

## 🚀 Advanced Level

### Exercise 9: Interactive Form with Validation
Enhance the form from Exercise 7.
```javascript
// TODO: Add real-time validation:
// 1. As the user types in the email field, check if it contains an '@' symbol.
// 2. If it doesn't, display an error message next to the input. Hide the message when it's valid.
// 3. On submission, check if the name is at least 3 characters long. If not, prevent submission and show an error.
// 4. Only log the data if all fields are valid.
```

### Exercise 10: Simple Modal/Popup
Create a button "Show Modal" and a hidden `<div>` that will act as the modal.
```javascript
// TODO: Write JavaScript to:
// 1. When "Show Modal" is clicked, make the modal div visible.
// 2. The modal should have a "Close" button inside it.
// 3. When the "Close" button is clicked, the modal becomes hidden again.
// 4. (Bonus) Make the modal close when the user clicks outside of it.
```

### Exercise 11: Tabbed Interface
Create a set of "tab" buttons and corresponding "content" divs.
```html
<!-- <button class="tab" data-tab="tab1">Tab 1</button> -->
<!-- <div class="content" id="tab1">Content 1</div> -->
```
```javascript
// TODO: Write JavaScript to:
// 1. By default, only the first tab's content is visible.
// 2. When a tab button is clicked, hide all content divs.
// 3. Show the content div that corresponds to the clicked tab (use data attributes to link them).
// 4. Add an 'active' class to the currently selected tab button.
```

---

## 🎨 Creative Challenge

### Challenge 1: Build a Simple To-Do List
Combine everything you've learned to build a functional To-Do list application.

// TODO: Your To-Do list should have:
// 1. An input field and a button to add new tasks.
// 2. A list that displays the tasks.
// 3. Each task in the list should have a "delete" button that removes it.
// 4. Clicking on a task should mark it as complete (e.g., line-through).
// 5. (Super Bonus) Save the list of tasks to localStorage so they persist after a page refresh.
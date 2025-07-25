# Part 3 Examples: How to Study This Code

Welcome to the examples for Part 3! This folder contains working code that demonstrates all the modern JavaScript (ES6+) concepts from the `notes.md` file.

It can be a lot to take in at once. Follow this guide to study the code effectively and without confusion.

## 🎯 The Goal

The goal here is to see the concepts from the notes in action. You will learn how to:
- Run modern JavaScript in a browser.
- See how `import` and `export` connect different files.
- Observe the output of each new ES6+ feature.

## 📂 File Breakdown

There are three key files here:

1.  **`index.html`**: The web page. Its most important job is to load our main JavaScript file using `<script type="module" ...>`. This `type="module"` is what enables `import` and `export`.
2.  **`utils.js`**: A "helper" module. Its only job is to `export` some functions and variables so that another file can use them.
3.  **`main.js`**: The main script. It `import`s code from `utils.js` and contains all the live examples for the concepts you're learning.

## 🧑‍🏫 Recommended Study Procedure

Follow these steps for a structured learning experience:

1.  **Read the Notes First**: Before touching the code, make sure you have read through the main `notes.md` file for Part 3. This gives you the theoretical foundation.

2.  **Open the Files**:
    -   In your browser: Open the `index.html` file.
    -   In VS Code: Open `main.js` and `utils.js` side-by-side so you can see them both.

3.  **Open the Developer Console**: In your browser, press `F12` (or `Cmd+Option+I` on Mac) to open the developer tools, and click on the **Console** tab. This is where most of the output will appear.

4.  **Go Section by Section**: The `main.js` file is organized with numbered comments that match the sections in `notes.md`. Don't try to read it all at once!

    ```javascript
    // --- 7. ES6 Modules: `import` & `export` ---
    // ... code for this section ...

    // --- 2. Arrow Functions ---
    // ... code for this section ...
    ```

5.  **Connect the Dots**: For each section in `main.js`:
    -   **Read the Code**: Look at the JavaScript code for that specific concept.
    -   **Check the Console**: Find the corresponding `console.log` output in your browser's developer console.
    -   **Check the Page**: Look at the rendered output on the `index.html` page. The `logToPage` function displays results directly on the webpage for clarity.
    -   **Trace the Imports**: Look at the top of `main.js` to see how it `import`s `PI`, `add`, and `multiply` from `utils.js`. This is a crucial concept to understand.

6.  **Experiment!** The best way to learn is by doing.
    -   Change a value in `main.js` and save the file.
    -   Refresh your browser and see how the output changes.
    -   Try writing a new arrow function or destructuring another object.

By following this step-by-step process, you can approach the code methodically, connect it back to the theory, and truly understand how modern JavaScript works.

Happy coding! 🚀
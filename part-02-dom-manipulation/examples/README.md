# Part 2 Examples: How to Study This Code

Welcome to the examples for Part 2! This folder contains an interactive web page that demonstrates all the DOM manipulation concepts from the `notes.md` file.

Follow this guide to study the code effectively and without confusion.

## 🎯 The Goal

The goal here is to see how JavaScript brings a static HTML page to life. You will learn how to:
- Connect a JavaScript file to an HTML file.
- Select and modify elements on the page.
- Respond to user actions like clicks and form submissions.

## 📂 File Breakdown

There are two key files here:

1.  **`index.html`**: The web page. It contains all the visual elements (buttons, lists, forms) that we will interact with.
2.  **`examples.js`**: The script that contains all the logic. It "listens" for events on the HTML page and manipulates the elements.

## 🧑‍🏫 Recommended Study Procedure

Follow these steps for a structured learning experience:

1.  **Read the Notes First**: Before touching the code, make sure you have read through the main `notes.md` file for Part 2. This gives you the theoretical foundation.

2.  **Open the Files**:
    -   In your browser: Open the `index.html` file.
    -   In VS Code: Open `index.html` and `examples.js` side-by-side so you can see them both.

3.  **Open the Developer Console**: In your browser, press `F12` (or `Cmd+Option+I` on Mac) to open the developer tools, and click on the **Console** tab. This is where our `console.log` messages will appear.

4.  **Go Section by Section**: The `examples.js` file is organized with numbered comments. Don't try to read it all at once!

    ```javascript
    // --- 1. DOM Selection ---
    // ... code for this section ...

    // --- 2. Content & Style Manipulation ---
    // ... code for this section ...
    ```

5.  **Connect the Dots**: For each section in `examples.js`:
    -   **Find the HTML**: Locate the corresponding HTML element in `index.html` (e.g., find the button with `id="change-text-btn"`).
    -   **Read the JavaScript**: Understand what the code is supposed to do to that element.
    -   **Interact and Observe**: Perform the action on the webpage (e.g., click the button). Watch the page change and check the Console for any logged messages.

6.  **Experiment!** The best way to learn is by doing.
    -   In `examples.js`, try changing the text that appears when a button is clicked.
    -   Try changing a color or adding a new style.
    -   Add a new `console.log()` to see the value of a variable.

By following this step-by-step process, you can clearly see the relationship between HTML and JavaScript.

Happy coding! 🚀
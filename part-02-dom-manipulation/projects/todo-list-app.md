# Project 2: To-Do List Application
## Apply Your DOM Manipulation Skills

Build a classic To-Do List application. This project is the perfect way to practice all the core concepts of DOM manipulation, event handling, and browser storage.

## 🎯 Project Objectives

By completing this project, you will demonstrate your ability to:
- ✅ Select and manipulate DOM elements effectively.
- ✅ Create, add, and remove elements dynamically.
- ✅ Handle user events using event delegation.
- ✅ Manage form submissions.
- ✅ Persist data in the browser using `localStorage`.
- ✅ Structure your code for a small application.

---

## 📋 Requirements

### Core Features (Must Implement)
1.  **Add a Task**: An input field and a "submit" button to add new tasks to the list.
2.  **Display Tasks**: New tasks appear in a list on the page.
3.  **Complete a Task**: Clicking on a task should mark it as "complete" (e.g., by adding a CSS class that applies a line-through style). Clicking it again should un-mark it.
4.  **Delete a Task**: Each task should have a "delete" button that, when clicked, removes the task from the list.
5.  **Data Persistence**: The list of tasks (including their completion status) should be saved to `localStorage` so they are still there when the page is reloaded.

### Bonus Features (For an Extra Challenge)
6.  **Filter Tasks**: Add buttons to filter the view between "All", "Active", and "Completed" tasks.
7.  **Task Count**: Display the number of "active" (incomplete) tasks remaining.
8.  **Clear Completed**: A button to remove all completed tasks at once.
9.  **Edit Tasks**: Allow the user to edit the text of an existing task.

---

## 🏗️ Project Structure

Create these files inside your project folder:
```
part-02-dom-manipulation/projects/todo-list-app/
├── index.html       # The HTML structure for your app
├── style.css        # Styles to make your app look good
├── app.js           # All your JavaScript logic
└── README.md        # Your project documentation
```

---

## 📝 Step-by-Step Implementation Guide

### Step 1: HTML Structure (`index.html`)
- Create a main container for the app.
- Add a `<h1>` for the title (e.g., "My To-Do List").
- Create a `<form>` with a text `input` (for the new task) and a `button` of `type="submit"`.
- Create an empty `<ul>` that will hold the list of tasks.

### Step 2: CSS Styling (`style.css`)
- Style the main components to be visually appealing.
- Create a `.completed` class that applies `text-decoration: line-through;` and maybe a lighter color.
- Style the delete buttons to be subtle but clear.

### Step 3: JavaScript Logic (`app.js`)

1.  **Setup & Element Selection**:
    -   Wrap your code in a `DOMContentLoaded` event listener.
    -   Select all the necessary DOM elements: the form, the input field, the task list (`<ul>`).

2.  **Loading and Saving Tasks**:
    -   Create functions `saveTasks()` and `loadTasks()`.
    -   `saveTasks()` will get the current tasks and save them as a JSON string in `localStorage`.
    -   `loadTasks()` will get the tasks from `localStorage`, parse them, and call a function to render them on the page.
    -   Call `loadTasks()` when the script first runs.

3.  **Adding a New Task**:
    -   Add a `submit` event listener to the form.
    -   Prevent the default form submission.
    -   Get the text from the input field. If it's not empty, create a new task object (e.g., `{ text: 'My new task', completed: false, id: Date.now() }`).
    -   Add this new task to your local array of tasks.
    -   Call a `renderTasks()` function to update the display.
    -   Save the updated tasks to `localStorage`.
    -   Clear the input field.

4.  **Rendering Tasks**:
    -   Create a `renderTasks()` function that:
        -   Clears the current content of the `<ul>`.
        -   Loops through your array of task objects.
        -   For each task, creates an `<li>` element.
        -   Sets the `<li>`'s `innerHTML` to include the task text and a delete button.
        -   Adds the `.completed` class if the task's `completed` property is `true`.
        -   Adds a `data-id` attribute to the `<li>` to store the task's unique ID.
        -   Appends the `<li>` to the `<ul>`.

5.  **Handling Clicks (Complete/Delete)**:
    -   Add a `click` event listener to the `<ul>` (Event Delegation).
    -   Inside the handler, check `event.target`.
    -   If the target was a "delete" button, find the parent `<li>`, get its `data-id`, remove the corresponding task from your array, and re-render.
    -   If the target was an `<li>` element, get its `data-id`, find the corresponding task in your array, toggle its `completed` status, and re-render.
    -   Remember to save to `localStorage` after any change.

---

## 🧪 Testing Your Application

- **Add Tasks**: Can you add multiple tasks? Does it work if you press Enter or click the button?
- **Complete Tasks**: Does clicking a task toggle its completed state correctly?
- **Delete Tasks**: Does the delete button remove the correct task?
- **Persistence**: If you add/complete/delete tasks and then refresh the page, is the state preserved?
- **Edge Cases**: What happens if you try to add an empty task?

---

## 🎖️ Evaluation Criteria

**Beginner Level (Pass)**
- ✅ Can add, display, and delete tasks.
- ✅ Code is functional.

**Intermediate Level (Good)**
- ✅ All beginner requirements met.
- ✅ Tasks can be marked/unmarked as complete.
- ✅ Data correctly persists in `localStorage` on refresh.
- ✅ Uses event delegation for clicks on the list.

**Advanced Level (Excellent)**
- ✅ All intermediate requirements met.
- ✅ Implemented at least one bonus feature (e.g., filtering).
- ✅ Code is well-structured, commented, and easy to read.
- ✅ No console errors during normal operation.

Good luck building your To-Do List App! This project is a fantastic way to solidify your understanding of how JavaScript brings a web page to life.
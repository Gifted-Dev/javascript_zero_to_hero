/*
    Part 2: DOM Manipulation - Exercise Solutions
    
    This file contains the solutions for the exercises in `exercises.md`.
    It's recommended to try solving the exercises on your own first.
    
    To use this file, you'll need an `index.html` file to see the results.
    Each exercise solution is self-contained within a function or event listener
    to prevent conflicts.
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Manipulation Exercise Solutions Loaded");

    // --- Basic Level ---

    // Exercise 1: Element Selection
    // Assuming HTML: <h1 id="main-title">...</h1>, <p class="intro">...</p>, <ul><li>...</li>...</ul>
    const ex1_h1 = document.querySelector('#main-title');
    const ex1_p = document.querySelector('.intro');
    const ex1_first_li = document.querySelector('li'); // querySelector gets the first match
    const ex1_all_li = document.querySelectorAll('li');

    console.group("Exercise 1: Element Selection");
    console.log("H1 by ID:", ex1_h1);
    console.log("P by Class:", ex1_p);
    console.log("First LI by Tag:", ex1_first_li);
    console.log("All LIs (NodeList):", ex1_all_li);
    console.groupEnd();


    // Exercise 2: Content Modification
    if (ex1_h1) ex1_h1.textContent = "Welcome to DOM Exercises!";
    if (ex1_p) ex1_p.innerHTML = "This is the <strong>intro</strong> paragraph.";
    if (ex1_all_li.length > 1) ex1_all_li[1].textContent = "Updated Item";


    // Exercise 3: Style and Attribute Changes
    // Assuming HTML: <img id="logo" src="...">, <button id="change-img-btn">...</button>
    document.body.style.backgroundColor = '#f0f0f0';
    if (ex1_h1) ex1_h1.classList.add('highlight'); // CSS: .highlight { color: blue; }

    const changeImgBtn = document.querySelector('#change-img-btn');
    const logoImg = document.querySelector('#logo');
    if (changeImgBtn && logoImg) {
        changeImgBtn.addEventListener('click', () => {
            logoImg.src = 'https://via.placeholder.com/200';
            logoImg.alt = 'A placeholder image';
        });
    }


    // Exercise 4: Simple Event Handling
    // Assuming HTML: <button id="click-me-btn">Click Me</button>
    const clickMeBtn = document.querySelector('#click-me-btn');
    if (clickMeBtn) {
        clickMeBtn.addEventListener('click', (event) => {
            console.log("Button was clicked!");
            event.target.disabled = true;
            event.target.textContent = "Clicked!";
        });
    }


    // --- Intermediate Level ---

    // Exercise 5: Creating and Appending Elements
    // Assuming HTML: <div id="card-container"></div>
    const cardContainer = document.querySelector('#card-container');

    function createCard(title, content) {
        const card = document.createElement('div');
        card.className = 'card'; // Use a class for styling

        const h3 = document.createElement('h3');
        h3.textContent = title;

        const p = document.createElement('p');
        p.textContent = content;

        card.append(h3, p); // Modern way to append multiple elements

        if (cardContainer) {
            cardContainer.appendChild(card);
        }
    }

    createCard("Card 1", "This is the first dynamically created card.");
    createCard("Card 2", "This demonstrates creating and appending elements.");
    createCard("Card 3", "JavaScript makes the web interactive!");


    // Exercise 6: Event Delegation
    // Assuming HTML: <ul id="delegation-list"><li>...</li>...</ul>
    const delegationList = document.querySelector('#delegation-list');
    if (delegationList) {
        delegationList.addEventListener('click', (event) => {
            // Check if the clicked element is an LI
            if (event.target.tagName === 'LI') {
                event.target.classList.toggle('completed'); // CSS: .completed { text-decoration: line-through; }
            }
        });
    }


    // Exercise 7: Basic Form Handling
    // Assuming HTML: <form id="basic-form"><input name="name"><input name="email"><button type="submit">...</button></form>
    const basicForm = document.querySelector('#basic-form');
    if (basicForm) {
        basicForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Stop the form from submitting

            const name = event.target.elements.name.value;
            const email = event.target.elements.email.value;

            console.group("Exercise 7: Form Submission");
            console.log({
                name,
                email
            });
            console.groupEnd();

            event.target.reset(); // Clear the form fields
        });
    }


    // Exercise 8: Working with Local Storage
    // Assuming HTML: <button id="set-theme-btn">Set Theme</button><button id="clear-theme-btn">Clear Theme</button>
    const setThemeBtn = document.querySelector('#set-theme-btn');
    const clearThemeBtn = document.querySelector('#clear-theme-btn');

    function applyTheme() {
        const savedTheme = localStorage.getItem('userTheme');
        if (savedTheme) {
            document.body.className = `${savedTheme}-theme`; // Apply theme class to body
        } else {
            document.body.className = '';
        }
    }

    if (setThemeBtn) {
        setThemeBtn.addEventListener('click', () => {
            const theme = prompt("Enter theme ('dark' or 'light'):");
            if (theme === 'dark' || theme === 'light') {
                localStorage.setItem('userTheme', theme);
                applyTheme();
            } else {
                alert("Invalid theme.");
            }
        });
    }

    if (clearThemeBtn) {
        clearThemeBtn.addEventListener('click', () => {
            localStorage.removeItem('userTheme');
            applyTheme();
        });
    }

    applyTheme(); // Apply theme on page load


    // --- Advanced Level ---

    // Exercise 9: Interactive Form with Validation
    // Assuming HTML: <form id="validation-form">... with inputs name="name", name="email" and a div class="error-msg"
    const validationForm = document.querySelector('#validation-form');
    if (validationForm) {
        const emailInput = validationForm.elements.email;
        const nameInput = validationForm.elements.name;
        const emailError = document.querySelector('#email-error');

        emailInput.addEventListener('input', () => {
            if (emailInput.value.includes('@')) {
                emailError.textContent = '';
            } else {
                emailError.textContent = 'Email must contain an @ symbol.';
            }
        });

        validationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const isNameValid = nameInput.value.trim().length >= 3;
            const isEmailValid = emailInput.value.includes('@');

            if (isNameValid && isEmailValid) {
                console.log("Form submitted successfully!");
                validationForm.reset();
            } else {
                alert("Please fix the errors before submitting.");
            }
        });
    }


    // Exercise 10: Simple Modal/Popup
    // Assuming HTML: <button id="show-modal-btn">...</button>, <div id="modal" class="hidden">...<button id="close-modal-btn">...</button></div>
    const showModalBtn = document.querySelector('#show-modal-btn');
    const closeModalBtn = document.querySelector('#close-modal-btn');
    const modal = document.querySelector('#modal');

    if (showModalBtn && modal) {
        showModalBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Bonus: Close on outside click
    if (modal) {
        modal.addEventListener('click', (event) => {
            // If the click is on the modal background itself (not its children)
            if (event.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }


    // Exercise 11: Tabbed Interface
    // Assuming HTML: <div class="tabs-container"> <button class="tab active" data-tab="tab1">...</button> ... </div>
    // <div class="content-container"> <div class="content" id="tab1">...</div> ... </div>
    const tabsContainer = document.querySelector('.tabs-container');
    const contentContainer = document.querySelector('.content-container');

    if (tabsContainer && contentContainer) {
        tabsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('tab')) {
                const targetTab = event.target.dataset.tab;

                // Update active state on tabs
                tabsContainer.querySelectorAll('.tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                event.target.classList.add('active');

                // Show/hide content
                contentContainer.querySelectorAll('.content').forEach(content => {
                    if (content.id === targetTab) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });
            }
        });
    }

    // --- Creative Challenge ---

    // Exercise 1: Build a Simple To-Do List
    // The solution for this is the full project in `part-02-dom-manipulation/projects/todo-list-app/`
    // This demonstrates that the exercises build directly towards the final project.
    console.log("Creative Challenge 1: The To-Do List project is the comprehensive solution for this challenge.");

});
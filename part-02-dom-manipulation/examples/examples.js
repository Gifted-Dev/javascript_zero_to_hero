// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    console.log("DOM fully loaded and parsed");

    // --- 1. DOM Selection ---
    console.log("--- DOM Selection Examples ---");
    const mainTitle = document.querySelector('#main-title');
    console.log('Selected by ID:', mainTitle);

    const introParagraph = document.querySelector('.intro');
    console.log('Selected by Class:', introParagraph);

    const allListItems = document.querySelectorAll('#item-list .item');
    console.log('Selected all list items (NodeList):', allListItems);


    // --- 2. Content & Style Manipulation ---
    console.log("\n--- Content & Style Manipulation ---");
    const changeTextBtn = document.querySelector('#change-text-btn');
    const textToChange = document.querySelector('#text-to-change');
    const toggleStyleBtn = document.querySelector('#toggle-style-btn');

    changeTextBtn.addEventListener('click', () => {
        textToChange.textContent = 'The text has been changed! 🎉';
        console.log('Text content changed.');
    });

    toggleStyleBtn.addEventListener('click', () => {
        textToChange.classList.toggle('highlight');
        console.log('Highlight class toggled.');
    });


    // --- 3. Creating & Removing Elements (with Event Delegation) ---
    console.log("\n--- Creating, Removing & Event Delegation ---");
    const addItemBtn = document.querySelector('#add-item-btn');
    const newItemInput = document.querySelector('#new-item-input');
    const itemList = document.querySelector('#item-list');

    // Add new item
    addItemBtn.addEventListener('click', () => {
        const newItemText = newItemInput.value.trim();
        if (newItemText) {
            // Create new list item element
            const li = document.createElement('li');
            li.className = 'item';
            li.innerHTML = `${newItemText} <button class="delete-btn">X</button>`;
            
            // Add it to the list
            itemList.appendChild(li);
            console.log(`Added new item: "${newItemText}"`);

            // Clear the input
            newItemInput.value = '';
            newItemInput.focus();
        } else {
            alert('Please enter an item.');
        }
    });

    // Event Delegation for deleting and completing items
    itemList.addEventListener('click', (event) => {
        // Check if a delete button was clicked
        if (event.target.classList.contains('delete-btn')) {
            const itemToRemove = event.target.parentElement;
            itemList.removeChild(itemToRemove);
            console.log(`Removed item: "${itemToRemove.textContent.replace(' X', '')}"`);
        }

        // Check if a list item (but not the button) was clicked
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('completed');
            console.log('Toggled completed status on an item.');
        }
    });


    // --- 4. Form Handling & Validation ---
    console.log("\n--- Form Handling ---");
    const userForm = document.querySelector('#user-form');
    const usernameInput = document.querySelector('#username');
    const usernameError = document.querySelector('#username-error');
    const formOutput = document.querySelector('#form-output');

    // Real-time validation example
    usernameInput.addEventListener('input', () => {
        if (usernameInput.value.length > 0 && usernameInput.value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters.';
        } else {
            usernameError.textContent = '';
        }
    });

    userForm.addEventListener('submit', (event) => {
        // Prevent the default form submission
        event.preventDefault();
        console.log('Form submission prevented.');

        // Using FormData to easily collect form data
        const formData = new FormData(userForm);
        const data = Object.fromEntries(formData.entries());

        console.log('Form Data:', data);

        // Display the submitted data
        formOutput.innerHTML = `
            <h3>Form Submitted!</h3>
            <p><strong>Username:</strong> ${data.username}</p>
            <p><strong>Email:</strong> ${data.email}</p>
        `;

        // You could also save this to localStorage
        localStorage.setItem('lastUser', JSON.stringify(data));
        console.log('Saved form data to localStorage.');

        userForm.reset();
    });
});
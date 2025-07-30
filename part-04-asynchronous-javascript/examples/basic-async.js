/**
 * Basic Asynchronous JavaScript Examples
 * Run this file in Node.js or include in an HTML page
 */

console.log("=== Basic Async Examples ===\n");

// 1. Understanding the Event Loop
console.log("1. Event Loop Demonstration:");
console.log("Start");

setTimeout(() => {
    console.log("Timeout 1 (0ms)");
}, 0);

setTimeout(() => {
    console.log("Timeout 2 (100ms)");
}, 100);

Promise.resolve().then(() => {
    console.log("Promise 1");
});

Promise.resolve().then(() => {
    console.log("Promise 2");
});

console.log("End");
console.log("Expected order: Start, End, Promise 1, Promise 2, Timeout 1, Timeout 2\n");

// 2. Callback Example
console.log("2. Callback Example:");

function fetchUserData(userId, callback) {
    console.log(`Fetching user ${userId}...`);
    setTimeout(() => {
        const user = { id: userId, name: "John Doe", email: "john@example.com" };
        callback(null, user);
    }, 1000);
}

fetchUserData(1, (error, user) => {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("User data received:", user);
    }
});

// 3. Promise Example
console.log("\n3. Promise Example:");

function fetchUserDataPromise(userId) {
    console.log(`Fetching user ${userId} with Promise...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                const user = { id: userId, name: "Jane Doe", email: "jane@example.com" };
                resolve(user);
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

fetchUserDataPromise(2)
    .then(user => {
        console.log("Promise user data:", user);
        return user.name;
    })
    .then(name => {
        console.log("User name:", name);
    })
    .catch(error => {
        console.error("Promise error:", error.message);
    });

// 4. async/await Example
console.log("\n4. async/await Example:");

async function fetchUserDataAsync(userId) {
    try {
        console.log(`Fetching user ${userId} with async/await...`);
        const user = await fetchUserDataPromise(userId);
        console.log("Async user data:", user);
        return user;
    } catch (error) {
        console.error("Async error:", error.message);
        throw error;
    }
}

// Call async function
fetchUserDataAsync(3);

// 5. Promise.all Example
console.log("\n5. Promise.all Example:");

async function fetchMultipleUsers() {
    try {
        console.log("Fetching multiple users in parallel...");
        const users = await Promise.all([
            fetchUserDataPromise(1),
            fetchUserDataPromise(2),
            fetchUserDataPromise(3)
        ]);
        
        console.log("All users fetched:", users.map(u => u.name));
    } catch (error) {
        console.error("Error fetching users:", error.message);
    }
}

setTimeout(() => {
    fetchMultipleUsers();
}, 3000);

// 6. Error Handling Example
console.log("\n6. Error Handling Example:");

async function demonstrateErrorHandling() {
    try {
        // This will fail
        await fetchUserDataPromise(-1);
    } catch (error) {
        console.log("Caught error:", error.message);
        
        // Try with valid ID
        try {
            const user = await fetchUserDataPromise(4);
            console.log("Recovery successful:", user.name);
        } catch (recoveryError) {
            console.error("Recovery failed:", recoveryError.message);
        }
    }
}

setTimeout(() => {
    demonstrateErrorHandling();
}, 4000);
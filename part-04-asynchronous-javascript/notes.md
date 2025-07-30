# Part 4: Asynchronous JavaScript - Complete Guide
## Master Callbacks, Promises, async/await, and Real-World API Integration

Welcome to one of the most crucial parts of JavaScript development! Asynchronous programming is what makes JavaScript powerful for web development, allowing you to handle user interactions, API calls, and time-based operations without blocking the main thread.

## 📚 Table of Contents

1. [Understanding Asynchronous Programming](#understanding-asynchronous-programming)
2. [The Event Loop and Call Stack](#the-event-loop-and-call-stack)
3. [Callbacks and Callback Hell](#callbacks-and-callback-hell)
4. [Promises: The Modern Solution](#promises-the-modern-solution)
5. [async/await: Syntactic Sugar](#asyncawait-syntactic-sugar)
6. [Fetch API and HTTP Requests](#fetch-api-and-http-requests)
7. [Error Handling in Asynchronous Code](#error-handling-in-asynchronous-code)
8. [Advanced Patterns and Best Practices](#advanced-patterns-and-best-practices)
9. [Real-World Applications](#real-world-applications)
10. [Performance Considerations](#performance-considerations)

---

## 1. Understanding Asynchronous Programming

### What is Asynchronous Programming?

Asynchronous programming allows your code to perform long-running operations without blocking the execution of other code. This is essential for:

- **API calls** - Fetching data from servers
- **File operations** - Reading/writing files
- **User interactions** - Handling clicks, form submissions
- **Timers** - setTimeout, setInterval
- **Database operations** - Querying databases

### Synchronous vs Asynchronous

```javascript
// Synchronous (Blocking)
console.log("Start");
// This would block everything for 3 seconds
// for (let i = 0; i < 3000000000; i++) {} // Don't run this!
console.log("End");

// Asynchronous (Non-blocking)
console.log("Start");
setTimeout(() => {
    console.log("This runs after 2 seconds");
}, 2000);
console.log("End"); // This runs immediately
```

**Output:**
```
Start
End
This runs after 2 seconds
```

### Why JavaScript Needs Asynchronous Programming

JavaScript is **single-threaded**, meaning it can only execute one operation at a time. Without asynchronous programming:

```javascript
// Without async - This would freeze the browser
function fetchUserData() {
    // Imagine this takes 5 seconds
    let data = makeNetworkRequest(); // BLOCKS EVERYTHING
    return data;
}

// With async - Browser stays responsive
async function fetchUserData() {
    try {
        let data = await makeNetworkRequest(); // Doesn't block
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}
```

---

## 2. The Event Loop and Call Stack

Understanding how JavaScript handles asynchronous operations is crucial for writing effective code.

### The Call Stack

The call stack is where JavaScript keeps track of function calls:

```javascript
function first() {
    console.log("First function");
    second();
}

function second() {
    console.log("Second function");
    third();
}

function third() {
    console.log("Third function");
}

first();
// Call stack: first() -> second() -> third()
```

### The Event Loop

The event loop is what allows JavaScript to perform asynchronous operations:

```javascript
console.log("1"); // Synchronous

setTimeout(() => {
    console.log("2"); // Asynchronous - goes to callback queue
}, 0);

Promise.resolve().then(() => {
    console.log("3"); // Asynchronous - goes to microtask queue
});

console.log("4"); // Synchronous

// Output: 1, 4, 3, 2
```

**Key Concepts:**
- **Call Stack**: Where synchronous code executes
- **Callback Queue**: Where callback functions wait
- **Microtask Queue**: Where Promise callbacks wait (higher priority)
- **Event Loop**: Moves tasks from queues to call stack when it's empty

### Visualizing the Event Loop

```javascript
function demonstrateEventLoop() {
    console.log("Start");
    
    // Macro task (Timer)
    setTimeout(() => console.log("Timeout 1"), 0);
    setTimeout(() => console.log("Timeout 2"), 0);
    
    // Micro task (Promise)
    Promise.resolve().then(() => console.log("Promise 1"));
    Promise.resolve().then(() => console.log("Promise 2"));
    
    console.log("End");
}

demonstrateEventLoop();
// Output: Start, End, Promise 1, Promise 2, Timeout 1, Timeout 2
```

---

## 3. Callbacks and Callback Hell

### What are Callbacks?

A callback is a function passed as an argument to another function, to be executed later:

```javascript
function greetUser(name, callback) {
    console.log(`Hello, ${name}!`);
    callback();
}

function afterGreeting() {
    console.log("Nice to meet you!");
}

greetUser("Alice", afterGreeting);
// Output: Hello, Alice!
//         Nice to meet you!
```

### Practical Callback Examples

```javascript
// Array methods use callbacks
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
    console.log(num * 2);
});

const doubled = numbers.map((num) => num * 2);
const evens = numbers.filter((num) => num % 2 === 0);

// Event listeners use callbacks
document.getElementById("button").addEventListener("click", function() {
    console.log("Button clicked!");
});

// Timers use callbacks
setTimeout(() => {
    console.log("Timer finished!");
}, 1000);
```

### The Problem: Callback Hell

When you need to perform multiple asynchronous operations in sequence, callbacks can become nested and hard to read:

```javascript
// Callback Hell Example
function getUserData(userId, callback) {
    setTimeout(() => {
        console.log("Fetching user data...");
        callback(null, { id: userId, name: "John Doe" });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        console.log("Fetching user posts...");
        callback(null, ["Post 1", "Post 2", "Post 3"]);
    }, 1000);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        console.log("Fetching post comments...");
        callback(null, ["Comment 1", "Comment 2"]);
    }, 1000);
}

// This becomes hard to read and maintain
getUserData(1, (err, user) => {
    if (err) {
        console.error("Error fetching user:", err);
        return;
    }
    
    getUserPosts(user.id, (err, posts) => {
        if (err) {
            console.error("Error fetching posts:", err);
            return;
        }
        
        getPostComments(posts[0], (err, comments) => {
            if (err) {
                console.error("Error fetching comments:", err);
                return;
            }
            
            console.log("User:", user);
            console.log("Posts:", posts);
            console.log("Comments:", comments);
        });
    });
});
```

### Problems with Callback Hell

1. **Readability**: Code becomes hard to read and understand
2. **Maintainability**: Difficult to modify or debug
3. **Error Handling**: Error handling becomes repetitive and scattered
4. **Testing**: Hard to test individual parts

---

## 4. Promises: The Modern Solution

Promises provide a cleaner way to handle asynchronous operations and avoid callback hell.

### What is a Promise?

A Promise is an object representing the eventual completion or failure of an asynchronous operation:

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation
    setTimeout(() => {
        const success = Math.random() > 0.5;
        
        if (success) {
            resolve("Operation successful!");
        } else {
            reject(new Error("Operation failed!"));
        }
    }, 1000);
});

// Using the Promise
myPromise
    .then((result) => {
        console.log("Success:", result);
    })
    .catch((error) => {
        console.error("Error:", error.message);
    });
```

### Promise States

A Promise can be in one of three states:

1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled**: Operation completed successfully
3. **Rejected**: Operation failed

```javascript
// Demonstrating Promise states
function createPromise(shouldResolve) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve("Success!");
            } else {
                reject(new Error("Failed!"));
            }
        }, 1000);
    });
}

const promise1 = createPromise(true);  // Will resolve
const promise2 = createPromise(false); // Will reject

console.log("Promise 1 state:", promise1); // Promise { <pending> }
```

### Promise Methods

#### .then() and .catch()

```javascript
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 1, name: "John", email: "john@example.com" };
            resolve(data);
        }, 1000);
    });
};

fetchData()
    .then((data) => {
        console.log("Received data:", data);
        return data.name; // Return value for next .then()
    })
    .then((name) => {
        console.log("User name:", name);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
```

#### .finally()

```javascript
fetchData()
    .then((data) => {
        console.log("Data:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    })
    .finally(() => {
        console.log("Cleanup operations"); // Always runs
    });
```

### Promise Chaining

Promises can be chained to perform sequential asynchronous operations:

```javascript
// Converting callback hell to Promise chain
function getUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: "John Doe" });
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Post 1", "Post 2", "Post 3"]);
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Comment 1", "Comment 2"]);
        }, 1000);
    });
}

// Clean Promise chain
getUserData(1)
    .then((user) => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then((posts) => {
        console.log("Posts:", posts);
        return getPostComments(posts[0]);
    })
    .then((comments) => {
        console.log("Comments:", comments);
    })
    .catch((error) => {
        console.error("Error in chain:", error);
    });
```

### Static Promise Methods

#### Promise.all()

Waits for all promises to resolve (or any to reject):

```javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 1000));
const promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3])
    .then((values) => {
        console.log(values); // [3, 'foo', 42]
    })
    .catch((error) => {
        console.error("One of the promises failed:", error);
    });
```

#### Promise.allSettled()

Waits for all promises to settle (resolve or reject):

```javascript
const promises = [
    Promise.resolve('Success 1'),
    Promise.reject(new Error('Error 1')),
    Promise.resolve('Success 2')
];

Promise.allSettled(promises)
    .then((results) => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${index} succeeded:`, result.value);
            } else {
                console.log(`Promise ${index} failed:`, result.reason.message);
            }
        });
    });
```

#### Promise.race()

Returns the first promise to settle:

```javascript
const slowPromise = new Promise(resolve => setTimeout(() => resolve('slow'), 2000));
const fastPromise = new Promise(resolve => setTimeout(() => resolve('fast'), 1000));

Promise.race([slowPromise, fastPromise])
    .then((value) => {
        console.log(value); // 'fast'
    });
```

#### Promise.any()

Returns the first promise to resolve (ignores rejections):

```javascript
const promises = [
    Promise.reject(new Error('Error 1')),
    Promise.resolve('Success 1'),
    Promise.resolve('Success 2')
];

Promise.any(promises)
    .then((value) => {
        console.log(value); // 'Success 1'
    })
    .catch((error) => {
        console.error("All promises rejected:", error);
    });
```

---

## 5. async/await: Syntactic Sugar

The `async/await` syntax makes asynchronous code look and behave more like synchronous code.

### Basic async/await Syntax

```javascript
// Promise-based function
function fetchUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: "Alice", email: "alice@example.com" });
        }, 1000);
    });
}

// Using async/await
async function getUserInfo() {
    try {
        console.log("Fetching user data...");
        const user = await fetchUserData();
        console.log("User data received:", user);
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

// Calling async function
getUserInfo()
    .then((user) => {
        console.log("Final user:", user);
    })
    .catch((error) => {
        console.error("Failed to get user info:", error);
    });
```

### Converting Promises to async/await

```javascript
// Promise chain
function getDataWithPromises() {
    return getUserData(1)
        .then((user) => {
            console.log("User:", user);
            return getUserPosts(user.id);
        })
        .then((posts) => {
            console.log("Posts:", posts);
            return getPostComments(posts[0]);
        })
        .then((comments) => {
            console.log("Comments:", comments);
            return comments;
        });
}

// async/await version
async function getDataWithAsyncAwait() {
    try {
        const user = await getUserData(1);
        console.log("User:", user);
        
        const posts = await getUserPosts(user.id);
        console.log("Posts:", posts);
        
        const comments = await getPostComments(posts[0]);
        console.log("Comments:", comments);
        
        return comments;
    } catch (error) {
        console.error("Error in async function:", error);
        throw error;
    }
}
```

### Parallel Execution with async/await

```javascript
// Sequential execution (slower)
async function fetchDataSequentially() {
    const user = await fetchUserData();     // Wait 1 second
    const posts = await fetchUserPosts();   // Wait another 1 second
    const comments = await fetchComments(); // Wait another 1 second
    // Total: ~3 seconds
    
    return { user, posts, comments };
}

// Parallel execution (faster)
async function fetchDataInParallel() {
    const [user, posts, comments] = await Promise.all([
        fetchUserData(),    // All start at the same time
        fetchUserPosts(),   // All start at the same time
        fetchComments()     // All start at the same time
    ]);
    // Total: ~1 second (the longest operation)
    
    return { user, posts, comments };
}
```

### Error Handling with async/await

```javascript
async function robustDataFetching() {
    try {
        // Try to fetch user data
        const user = await fetchUserData();
        
        try {
            // Try to fetch posts
            const posts = await fetchUserPosts(user.id);
            return { user, posts };
        } catch (postsError) {
            console.warn("Failed to fetch posts:", postsError.message);
            // Return user data without posts
            return { user, posts: [] };
        }
        
    } catch (userError) {
        console.error("Failed to fetch user data:", userError.message);
        // Return default data
        return { user: null, posts: [] };
    }
}
```

### async/await Best Practices

```javascript
// ✅ Good: Proper error handling
async function goodExample() {
    try {
        const data = await fetchData();
        return processData(data);
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Failed to process data");
    }
}

// ❌ Bad: No error handling
async function badExample() {
    const data = await fetchData(); // Could throw an error
    return processData(data);
}

// ✅ Good: Parallel execution when possible
async function fetchMultipleResources() {
    const [users, posts, comments] = await Promise.all([
        fetchUsers(),
        fetchPosts(),
        fetchComments()
    ]);
    
    return { users, posts, comments };
}

// ❌ Bad: Unnecessary sequential execution
async function fetchMultipleResourcesSlowly() {
    const users = await fetchUsers();
    const posts = await fetchPosts();
    const comments = await fetchComments();
    
    return { users, posts, comments };
}
```

---

## 6. Fetch API and HTTP Requests

The Fetch API provides a modern way to make HTTP requests in JavaScript.

### Basic Fetch Usage

```javascript
// Simple GET request
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        console.log("Users:", users);
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
```

### HTTP Methods with Fetch

```javascript
// GET request
async function getUser(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.json();
}

// POST request
async function createUser(userData) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    
    return response.json();
}

// PUT request
async function updateUser(id, userData) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    
    return response.json();
}

// DELETE request
async function deleteUser(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
    });
    
    return response.ok;
}
```

### Advanced Fetch Options

```javascript
async function advancedFetch() {
    try {
        const response = await fetch('https://api.example.com/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token-here',
                'X-Custom-Header': 'custom-value'
            },
            body: JSON.stringify({
                name: 'John Doe',
                email: 'john@example.com'
            }),
            mode: 'cors',
            credentials: 'include',
            cache: 'no-cache'
        });
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse response based on content type
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else if (contentType && contentType.includes('text/')) {
            return await response.text();
        } else {
            return await response.blob();
        }
        
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
```

### Handling Different Response Types

```javascript
async function handleDifferentResponses() {
    try {
        // JSON response
        const jsonResponse = await fetch('/api/users');
        const users = await jsonResponse.json();
        
        // Text response
        const textResponse = await fetch('/api/status');
        const status = await textResponse.text();
        
        // Blob response (for files)
        const fileResponse = await fetch('/api/download/file.pdf');
        const fileBlob = await fileResponse.blob();
        
        // FormData response
        const formResponse = await fetch('/api/form-data');
        const formData = await formResponse.formData();
        
        return { users, status, fileBlob, formData };
    } catch (error) {
        console.error("Error handling responses:", error);
    }
}
```

### Request Timeout and Cancellation

```javascript
// Request with timeout
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        throw error;
    }
}

// Cancellable request
class APIClient {
    constructor() {
        this.currentRequest = null;
    }
    
    async fetchData(url) {
        // Cancel previous request if it exists
        if (this.currentRequest) {
            this.currentRequest.abort();
        }
        
        this.currentRequest = new AbortController();
        
        try {
            const response = await fetch(url, {
                signal: this.currentRequest.signal
            });
            
            this.currentRequest = null;
            return response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request was cancelled');
                return null;
            }
            throw error;
        }
    }
    
    cancelCurrentRequest() {
        if (this.currentRequest) {
            this.currentRequest.abort();
            this.currentRequest = null;
        }
    }
}
```

---

## 7. Error Handling in Asynchronous Code

Proper error handling is crucial for robust asynchronous applications.

### Try-Catch with async/await

```javascript
async function robustAsyncFunction() {
    try {
        const data = await fetchData();
        const processedData = await processData(data);
        const result = await saveData(processedData);
        
        return result;
    } catch (error) {
        // Handle different types of errors
        if (error.name === 'NetworkError') {
            console.error("Network error occurred:", error.message);
            // Maybe retry the request
            return await retryOperation();
        } else if (error.name === 'ValidationError') {
            console.error("Data validation failed:", error.message);
            // Return default data or ask user to fix input
            return getDefaultData();
        } else {
            console.error("Unexpected error:", error);
            // Log error for debugging and rethrow
            logErrorToService(error);
            throw error;
        }
    }
}
```

### Custom Error Classes

```javascript
class APIError extends Error {
    constructor(message, status, endpoint) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.endpoint = endpoint;
    }
}

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

async function fetchWithCustomErrors(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new APIError(
                `API request failed: ${response.statusText}`,
                response.status,
                url
            );
        }
        
        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            // Network error (fetch throws TypeError for network issues)
            throw new NetworkError('Network connection failed');
        }
        
        // Re-throw other errors
        throw error;
    }
}
```

### Error Handling Patterns

```javascript
// Pattern 1: Graceful degradation
async function fetchUserDataGracefully(userId) {
    try {
        const user = await fetchUser(userId);
        
        try {
            const posts = await fetchUserPosts(userId);
            user.posts = posts;
        } catch (postsError) {
            console.warn("Failed to fetch posts, continuing without them");
            user.posts = [];
        }
        
        try {
            const avatar = await fetchUserAvatar(userId);
            user.avatar = avatar;
        } catch (avatarError) {
            console.warn("Failed to fetch avatar, using default");
            user.avatar = '/default-avatar.png';
        }
        
        return user;
    } catch (userError) {
        console.error("Failed to fetch user data:", userError);
        return null;
    }
}

// Pattern 2: Retry mechanism
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.warn(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
    }
}

// Pattern 3: Circuit breaker
class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.threshold = threshold;
        this.timeout = timeout;
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    }
    
    async execute(operation) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.timeout) {
                this.state = 'HALF_OPEN';
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }
        
        try {
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
        }
    }
}
```

---

## 8. Advanced Patterns and Best Practices

### Async Iteration

```javascript
// Async generators
async function* fetchPaginatedData(baseUrl) {
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
        try {
            const response = await fetch(`${baseUrl}?page=${page}`);
            const data = await response.json();
            
            yield data.items;
            
            hasMore = data.hasNextPage;
            page++;
        } catch (error) {
            console.error(`Error fetching page ${page}:`, error);
            break;
        }
    }
}

// Using async iteration
async function processAllData() {
    for await (const items of fetchPaginatedData('/api/data')) {
        console.log(`Processing ${items.length} items`);
        
        // Process each batch
        for (const item of items) {
            await processItem(item);
        }
    }
}
```

### Async Queue Processing

```javascript
class AsyncQueue {
    constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }
    
    async add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                task,
                resolve,
                reject
            });
            
            this.process();
        });
    }
    
    async process() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { task, resolve, reject } = this.queue.shift();
        
        try {
            const result = await task();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.process(); // Process next item
        }
    }
}

// Usage
const queue = new AsyncQueue(3); // Process 3 tasks concurrently

const tasks = Array.from({ length: 10 }, (_, i) => 
    () => fetch(`/api/data/${i}`).then(r => r.json())
);

Promise.all(tasks.map(task => queue.add(task)))
    .then(results => console.log('All tasks completed:', results))
    .catch(error => console.error('Queue processing failed:', error));
```

### Debouncing and Throttling Async Operations

```javascript
// Debounced async function
function debounceAsync(func, delay) {
    let timeoutId;
    let lastPromise;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        return new Promise((resolve, reject) => {
            timeoutId = setTimeout(async () => {
                try {
                    const result = await func.apply(this, args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    };
}

// Throttled async function
function throttleAsync(func, limit) {
    let inThrottle;
    let lastResult;
    
    return async function(...args) {
        if (!inThrottle) {
            inThrottle = true;
            
            try {
                lastResult = await func.apply(this, args);
                return lastResult;
            } finally {
                setTimeout(() => inThrottle = false, limit);
            }
        }
        
        return lastResult;
    };
}

// Usage examples
const debouncedSearch = debounceAsync(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    return response.json();
}, 300);

const throttledSave = throttleAsync(async (data) => {
    const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return response.json();
}, 1000);
```

### Async Memoization

```javascript
function memoizeAsync(fn, keyGenerator = (...args) => JSON.stringify(args)) {
    const cache = new Map();
    const pendingPromises = new Map();
    
    return async function(...args) {
        const key = keyGenerator(...args);
        
        // Return cached result if available
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        // Return pending promise if request is in progress
        if (pendingPromises.has(key)) {
            return pendingPromises.get(key);
        }
        
        // Create new promise
        const promise = fn.apply(this, args);
        pendingPromises.set(key, promise);
        
        try {
            const result = await promise;
            cache.set(key, result);
            return result;
        } catch (error) {
            // Don't cache errors
            throw error;
        } finally {
            pendingPromises.delete(key);
        }
    };
}

// Usage
const memoizedFetch = memoizeAsync(async (url) => {
    const response = await fetch(url);
    return response.json();
});

// Multiple calls to the same URL will only make one request
const [result1, result2, result3] = await Promise.all([
    memoizedFetch('/api/users'),
    memoizedFetch('/api/users'), // Uses cached result
    memoizedFetch('/api/users')  // Uses cached result
]);
```

---

## 9. Real-World Applications

### Building a Data Fetching Service

```javascript
class DataService {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = options.headers || {};
        this.timeout = options.timeout || 10000;
        this.retryAttempts = options.retryAttempts || 3;
        this.cache = new Map();
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            headers: { ...this.defaultHeaders, ...options.headers },
            ...options
        };
        
        // Add timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        config.signal = controller.signal;
        
        try {
            const response = await this.fetchWithRetry(url, config);
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new APIError(
                    `Request failed: ${response.statusText}`,
                    response.status,
                    url
                );
            }
            
            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            
            throw error;
        }
    }
    
    async fetchWithRetry(url, config, attempt = 1) {
        try {
            return await fetch(url, config);
        } catch (error) {
            if (attempt < this.retryAttempts && this.isRetryableError(error)) {
                console.warn(`Attempt ${attempt} failed, retrying...`);
                await this.delay(1000 * attempt);
                return this.fetchWithRetry(url, config, attempt + 1);
            }
            throw error;
        }
    }
    
    isRetryableError(error) {
        return error.name === 'TypeError' || // Network error
               (error.status >= 500 && error.status < 600); // Server error
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // CRUD operations
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        
        // Check cache first
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }
        
        const data = await this.request(url);
        this.cache.set(url, data);
        return data;
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
    
    clearCache() {
        this.cache.clear();
    }
}

// Usage
const api = new DataService('https://api.example.com', {
    headers: { 'Authorization': 'Bearer token' },
    timeout: 5000,
    retryAttempts: 3
});

// Use the service
async function loadUserDashboard(userId) {
    try {
        const [user, posts, notifications] = await Promise.all([
            api.get(`/users/${userId}`),
            api.get(`/users/${userId}/posts`),
            api.get(`/users/${userId}/notifications`)
        ]);
        
        return { user, posts, notifications };
    } catch (error) {
        console.error('Failed to load dashboard:', error);
        throw error;
    }
}
```

### Real-time Data Updates

```javascript
class RealTimeDataManager {
    constructor() {
        this.subscribers = new Map();
        this.connections = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }
    
    async subscribe(channel, callback) {
        if (!this.subscribers.has(channel)) {
            this.subscribers.set(channel, new Set());
        }
        
        this.subscribers.get(channel).add(callback);
        
        // Establish connection if not exists
        if (!this.connections.has(channel)) {
            await this.connectToChannel(channel);
        }
        
        // Return unsubscribe function
        return () => {
            const channelSubscribers = this.subscribers.get(channel);
            if (channelSubscribers) {
                channelSubscribers.delete(callback);
                
                if (channelSubscribers.size === 0) {
                    this.disconnectFromChannel(channel);
                }
            }
        };
    }
    
    async connectToChannel(channel) {
        try {
            // Using Server-Sent Events for real-time updates
            const eventSource = new EventSource(`/api/stream/${channel}`);
            
            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.notifySubscribers(channel, data);
            };
            
            eventSource.onerror = () => {
                console.error(`Connection to ${channel} failed`);
                this.handleConnectionError(channel);
            };
            
            this.connections.set(channel, eventSource);
            this.reconnectAttempts = 0;
            
        } catch (error) {
            console.error(`Failed to connect to ${channel}:`, error);
            this.handleConnectionError(channel);
        }
    }
    
    notifySubscribers(channel, data) {
        const subscribers = this.subscribers.get(channel);
        if (subscribers) {
            subscribers.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('Subscriber callback error:', error);
                }
            });
        }
    }
    
    async handleConnectionError(channel) {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = Math.pow(2, this.reconnectAttempts) * 1000; // Exponential backoff
            
            console.log(`Reconnecting to ${channel} in ${delay}ms...`);
            
            setTimeout(() => {
                this.connectToChannel(channel);
            }, delay);
        } else {
            console.error(`Max reconnection attempts reached for ${channel}`);
        }
    }
    
    disconnectFromChannel(channel) {
        const connection = this.connections.get(channel);
        if (connection) {
            connection.close();
            this.connections.delete(channel);
        }
        
        this.subscribers.delete(channel);
    }
    
    disconnect() {
        this.connections.forEach((connection, channel) => {
            this.disconnectFromChannel(channel);
        });
    }
}

// Usage
const realTimeManager = new RealTimeDataManager();

async function setupRealTimeUpdates() {
    // Subscribe to user notifications
    const unsubscribeNotifications = await realTimeManager.subscribe(
        'notifications',
        (notification) => {
            console.log('New notification:', notification);
            updateNotificationUI(notification);
        }
    );
    
    // Subscribe to live chat messages
    const unsubscribeChat = await realTimeManager.subscribe(
        'chat',
        (message) => {
            console.log('New message:', message);
            addMessageToChat(message);
        }
    );
    
    // Cleanup when component unmounts
    return () => {
        unsubscribeNotifications();
        unsubscribeChat();
    };
}
```

---

## 10. Performance Considerations

### Optimizing Async Operations

```javascript
// Batch API requests
class BatchRequestManager {
    constructor(batchSize = 10, delay = 100) {
        this.batchSize = batchSize;
        this.delay = delay;
        this.queue = [];
        this.processing = false;
    }
    
    async request(url) {
        return new Promise((resolve, reject) => {
            this.queue.push({ url, resolve, reject });
            this.processBatch();
        });
    }
    
    async processBatch() {
        if (this.processing || this.queue.length === 0) {
            return;
        }
        
        this.processing = true;
        
        // Wait for more requests to accumulate
        await new Promise(resolve => setTimeout(resolve, this.delay));
        
        const batch = this.queue.splice(0, this.batchSize);
        
        try {
            const responses = await Promise.allSettled(
                batch.map(({ url }) => fetch(url))
            );
            
            responses.forEach((response, index) => {
                const { resolve, reject } = batch[index];
                
                if (response.status === 'fulfilled') {
                    resolve(response.value);
                } else {
                    reject(response.reason);
                }
            });
        } catch (error) {
            batch.forEach(({ reject }) => reject(error));
        }
        
        this.processing = false;
        
        // Process remaining items
        if (this.queue.length > 0) {
            this.processBatch();
        }
    }
}
```

### Memory Management

```javascript
// Proper cleanup of async operations
class AsyncResourceManager {
    constructor() {
        this.activeRequests = new Set();
        this.intervals = new Set();
        this.timeouts = new Set();
    }
    
    async fetch(url, options = {}) {
        const controller = new AbortController();
        const request = fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        this.activeRequests.add(controller);
        
        try {
            const response = await request;
            return response;
        } finally {
            this.activeRequests.delete(controller);
        }
    }
    
    setInterval(callback, delay) {
        const id = setInterval(callback, delay);
        this.intervals.add(id);
        return id;
    }
    
    setTimeout(callback, delay) {
        const id = setTimeout(() => {
            callback();
            this.timeouts.delete(id);
        }, delay);
        this.timeouts.add(id);
        return id;
    }
    
    cleanup() {
        // Cancel all active requests
        this.activeRequests.forEach(controller => controller.abort());
        this.activeRequests.clear();
        
        // Clear all intervals
        this.intervals.forEach(id => clearInterval(id));
        this.intervals.clear();
        
        // Clear all timeouts
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts.clear();
    }
}
```

### Monitoring and Debugging

```javascript
// Performance monitoring for async operations
class AsyncPerformanceMonitor {
    constructor() {
        this.metrics = new Map();
    }
    
    async measure(name, operation) {
        const startTime = performance.now();
        
        try {
            const result = await operation();
            const duration = performance.now() - startTime;
            
            this.recordMetric(name, duration, 'success');
            return result;
        } catch (error) {
            const duration = performance.now() - startTime;
            this.recordMetric(name, duration, 'error');
            throw error;
        }
    }
    
    recordMetric(name, duration, status) {
        if (!this.metrics.has(name)) {
            this.metrics.set(name, {
                count: 0,
                totalDuration: 0,
                successCount: 0,
                errorCount: 0,
                minDuration: Infinity,
                maxDuration: 0
            });
        }
        
        const metric = this.metrics.get(name);
        metric.count++;
        metric.totalDuration += duration;
        metric.minDuration = Math.min(metric.minDuration, duration);
        metric.maxDuration = Math.max(metric.maxDuration, duration);
        
        if (status === 'success') {
            metric.successCount++;
        } else {
            metric.errorCount++;
        }
    }
    
    getReport() {
        const report = {};
        
        this.metrics.forEach((metric, name) => {
            report[name] = {
                averageDuration: metric.totalDuration / metric.count,
                minDuration: metric.minDuration,
                maxDuration: metric.maxDuration,
                successRate: (metric.successCount / metric.count) * 100,
                totalCalls: metric.count
            };
        });
        
        return report;
    }
}

// Usage
const monitor = new AsyncPerformanceMonitor();

async function monitoredApiCall() {
    return monitor.measure('user-fetch', async () => {
        const response = await fetch('/api/users');
        return response.json();
    });
}
```

---

## 🎯 Summary and Best Practices

### Key Takeaways

1. **Understand the Event Loop**: Know how JavaScript handles asynchronous operations
2. **Prefer Promises over Callbacks**: Avoid callback hell with Promise chains
3. **Use async/await**: Write cleaner, more readable asynchronous code
4. **Handle Errors Properly**: Always include error handling in async operations
5. **Optimize Performance**: Use parallel execution when possible
6. **Clean Up Resources**: Cancel requests and clear timers when needed

### Best Practices Checklist

- ✅ Always handle errors in async functions
- ✅ Use `Promise.all()` for parallel operations
- ✅ Implement proper timeout and cancellation
- ✅ Cache responses when appropriate
- ✅ Use retry mechanisms for network requests
- ✅ Monitor performance of async operations
- ✅ Clean up resources to prevent memory leaks
- ✅ Use TypeScript for better async code safety

### Common Pitfalls to Avoid

- ❌ Forgetting to handle Promise rejections
- ❌ Using sequential await when parallel execution is possible
- ❌ Not implementing proper error boundaries
- ❌ Ignoring memory leaks from uncancelled operations
- ❌ Not validating API responses
- ❌ Blocking the main thread with heavy computations

---

## 🚀 What's Next?

You've now mastered asynchronous JavaScript! These skills are fundamental for:

- **Part 5**: Advanced DOM manipulation and browser APIs
- **Modern frameworks**: React, Vue.js, Angular
- **Node.js development**: Server-side JavaScript
- **Real-time applications**: WebSockets, Server-Sent Events

Practice these concepts with the exercises and project in this part, then move on to Part 5 where we'll explore advanced browser APIs and DOM manipulation techniques.

Remember: Asynchronous programming is at the heart of modern JavaScript development. Master these patterns, and you'll be well-equipped to build responsive, efficient web applications!
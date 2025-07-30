/**
 * Fetch API Examples
 * These examples work with real APIs - run in browser console or Node.js with fetch polyfill
 */

console.log("=== Fetch API Examples ===\n");

// 1. Basic GET Request
async function basicFetchExample() {
    try {
        console.log("1. Basic GET request to JSONPlaceholder API:");
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const user = await response.json();
        console.log("User data:", user);
        return user;
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

// 2. POST Request
async function postExample() {
    try {
        console.log("\n2. POST request example:");
        const newPost = {
            title: 'My New Post',
            body: 'This is the content of my new post.',
            userId: 1
        };
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost)
        });
        
        const createdPost = await response.json();
        console.log("Created post:", createdPost);
        return createdPost;
    } catch (error) {
        console.error("POST error:", error.message);
    }
}

// 3. Multiple Requests with Promise.all
async function multipleRequestsExample() {
    try {
        console.log("\n3. Multiple parallel requests:");
        const [users, posts, comments] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/comments').then(r => r.json())
        ]);
        
        console.log(`Fetched ${users.length} users, ${posts.length} posts, ${comments.length} comments`);
        return { users, posts, comments };
    } catch (error) {
        console.error("Multiple requests error:", error.message);
    }
}

// 4. Request with Timeout
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        console.log(`\n4. Request with ${timeout}ms timeout:`);
        const response = await fetch(url, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Data received within timeout:", data.slice(0, 2)); // Show first 2 items
        return data;
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            console.error("Request timed out");
        } else {
            console.error("Timeout fetch error:", error.message);
        }
        throw error;
    }
}

// 5. Retry Mechanism
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`\n5. Fetch attempt ${attempt}/${maxRetries}:`);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log("Retry fetch successful:", data.slice(0, 2));
            return data;
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

// 6. Advanced Fetch with Custom Headers
async function advancedFetchExample() {
    try {
        console.log("\n6. Advanced fetch with custom headers:");
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'JavaScript-Fetch-Example',
                'X-Custom-Header': 'CustomValue'
            },
            mode: 'cors',
            cache: 'no-cache'
        });
        
        // Log response headers
        console.log("Response headers:");
        for (const [key, value] of response.headers.entries()) {
            console.log(`  ${key}: ${value}`);
        }
        
        const post = await response.json();
        console.log("Post data:", post);
        return post;
    } catch (error) {
        console.error("Advanced fetch error:", error.message);
    }
}

// 7. Error Handling with Different Response Types
async function handleDifferentResponseTypes() {
    console.log("\n7. Handling different response types:");
    
    try {
        // JSON response
        const jsonResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const userData = await jsonResponse.json();
        console.log("JSON data:", userData.name);
        
        // Text response (simulated)
        const textResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const textData = await textResponse.text();
        console.log("Text data length:", textData.length);
        
    } catch (error) {
        console.error("Response type error:", error.message);
    }
}

// Run examples with delays to see output clearly
async function runAllExamples() {
    await basicFetchExample();
    
    setTimeout(async () => {
        await postExample();
    }, 1000);
    
    setTimeout(async () => {
        await multipleRequestsExample();
    }, 2000);
    
    setTimeout(async () => {
        await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts', 3000);
    }, 3000);
    
    setTimeout(async () => {
        await fetchWithRetry('https://jsonplaceholder.typicode.com/albums');
    }, 4000);
    
    setTimeout(async () => {
        await advancedFetchExample();
    }, 5000);
    
    setTimeout(async () => {
        await handleDifferentResponseTypes();
    }, 6000);
}

// Start the examples
runAllExamples();

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        basicFetchExample,
        postExample,
        multipleRequestsExample,
        fetchWithTimeout,
        fetchWithRetry,
        advancedFetchExample,
        handleDifferentResponseTypes
    };
}
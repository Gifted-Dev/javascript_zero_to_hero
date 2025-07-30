# Part 4 Examples: Asynchronous JavaScript

This folder contains working examples that demonstrate all the asynchronous JavaScript concepts from the `notes.md` file.

## 📂 Files Overview

- **`basic-async.js`** - Fundamental async concepts (callbacks, promises, async/await)
- **`fetch-api.js`** - Real-world HTTP requests using the Fetch API
- **`advanced-patterns.js`** - Advanced patterns like queues, retry mechanisms, and performance monitoring

## 🚀 How to Run These Examples

### Option 1: Browser Console
1. Open your browser's developer tools (F12)
2. Copy and paste the code from any file into the console
3. Press Enter to execute

### Option 2: HTML Page
Create an HTML file and include the scripts:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Async JavaScript Examples</title>
</head>
<body>
    <h1>Check the Console for Output</h1>
    <script src="basic-async.js"></script>
    <script src="fetch-api.js"></script>
</body>
</html>
```

### Option 3: Node.js
```bash
# Install node-fetch for Node.js compatibility (if needed)
npm install node-fetch

# Run the examples
node basic-async.js
node fetch-api.js
```

## 📚 What You'll Learn

### From `basic-async.js`:
- How the event loop works
- Callback patterns and callback hell
- Promise creation and chaining
- async/await syntax
- Error handling in async code
- Promise.all for parallel execution

### From `fetch-api.js`:
- Making HTTP GET and POST requests
- Handling different response types
- Request timeouts and cancellation
- Retry mechanisms for failed requests
- Advanced fetch options and headers
- Parallel API calls

### From `advanced-patterns.js`:
- Async queues and batch processing
- Debouncing and throttling async operations
- Memoization for async functions
- Performance monitoring
- Memory management and cleanup

## 🎯 Key Concepts Demonstrated

1. **Event Loop Understanding**
   ```javascript
   console.log("Start");
   setTimeout(() => console.log("Timeout"), 0);
   Promise.resolve().then(() => console.log("Promise"));
   console.log("End");
   // Output: Start, End, Promise, Timeout
   ```

2. **Promise vs Callback**
   ```javascript
   // Callback (harder to read)
   fetchUser(1, (err, user) => {
       if (err) return console.error(err);
       fetchPosts(user.id, (err, posts) => {
           if (err) return console.error(err);
           console.log(posts);
       });
   });
   
   // Promise (cleaner)
   fetchUser(1)
       .then(user => fetchPosts(user.id))
       .then(posts => console.log(posts))
       .catch(err => console.error(err));
   ```

3. **async/await (cleanest)**
   ```javascript
   async function getUserPosts(userId) {
       try {
           const user = await fetchUser(userId);
           const posts = await fetchPosts(user.id);
           return posts;
       } catch (error) {
           console.error(error);
       }
   }
   ```

## 🔧 Tips for Running Examples

- **Always check the console** for output and errors
- **Modify the examples** to experiment with different scenarios
- **Try breaking the code** to see how error handling works
- **Use browser dev tools** to step through async code execution
- **Test with slow network** to see async behavior clearly

## 🚨 Common Gotchas

1. **Forgetting await** - async functions return promises
2. **Not handling errors** - always use try/catch or .catch()
3. **Mixing callbacks and promises** - stick to one pattern
4. **Blocking the main thread** - use async for heavy operations
# Part 4: Asynchronous JavaScript - Exercises

Master asynchronous programming through hands-on practice! These exercises progress from basic callback understanding to advanced async patterns used in real-world applications.

## 🎯 How to Use These Exercises

1. **Read each problem carefully** and understand the requirements
2. **Try to solve it yourself first** - resist the urge to peek at solutions!
3. **Test your code thoroughly** - async code can be tricky to debug
4. **Compare with provided solutions** (in `solutions.js`)
5. **Experiment with variations** - modify the exercises to explore edge cases

---

## 📚 Basic Level (Must Complete All)

### Exercise 1: Understanding the Event Loop
Create a function that demonstrates the order of execution in JavaScript's event loop:

```javascript
function demonstrateEventLoop() {
    // TODO: Use console.log, setTimeout, Promise.resolve().then()
    // to show the order: synchronous → microtasks → macrotasks
    
    // Expected output order:
    // 1. "Start"
    // 2. "End" 
    // 3. "Promise"
    // 4. "Timeout"
}
```

### Exercise 2: Callback to Promise Conversion
Convert this callback-based function to use Promises:

```javascript
// Given callback-based function:
function fetchUserCallback(userId, callback) {
    setTimeout(() => {
        if (userId <= 0) {
            callback(new Error("Invalid user ID"), null);
        } else {
            callback(null, { id: userId, name: `User ${userId}` });
        }
    }, 1000);
}

// TODO: Create a Promise-based version
function fetchUserPromise(userId) {
    // Your implementation here
}

// Test it:
// fetchUserPromise(1).then(user => console.log(user)).catch(err => console.error(err));
```

### Exercise 3: Basic async/await
Rewrite this Promise chain using async/await:

```javascript
// Given Promise chain:
function getUserPosts(userId) {
    return fetchUser(userId)
        .then(user => fetchPosts(user.id))
        .then(posts => posts.filter(post => post.published))
        .then(publishedPosts => {
            console.log(`Found ${publishedPosts.length} published posts`);
            return publishedPosts;
        })
        .catch(error => {
            console.error("Error:", error.message);
            return [];
        });
}

// TODO: Convert to async/await
async function getUserPostsAsync(userId) {
    // Your implementation here
}
```

### Exercise 4: Error Handling Practice
Create a robust async function that handles multiple types of errors:

```javascript
async function robustApiCall(url) {
    // TODO: Implement with proper error handling for:
    // 1. Network errors (fetch fails)
    // 2. HTTP errors (status 400-500)
    // 3. JSON parsing errors
    // 4. Timeout errors (abort after 5 seconds)
    
    // Should return: { success: boolean, data: any, error: string }
}
```

### Exercise 5: Promise.all Practice
Fetch multiple users in parallel and combine their data:

```javascript
async function fetchMultipleUsers(userIds) {
    // TODO: Use Promise.all to fetch all users simultaneously
    // Handle the case where some requests might fail
    // Return an array of successful results only
    
    // Example: fetchMultipleUsers([1, 2, 3, 999]) 
    // Should return data for users 1, 2, 3 (999 might fail)
}
```

---

## 🚀 Intermediate Level

### Exercise 6: Custom Promise Implementation
Create a simplified Promise implementation to understand how Promises work internally:

```javascript
class SimplePromise {
    constructor(executor) {
        // TODO: Implement basic Promise functionality
        // Should support: then(), catch(), resolve, reject
    }
    
    then(onFulfilled, onRejected) {
        // TODO: Implement then method
    }
    
    catch(onRejected) {
        // TODO: Implement catch method
    }
    
    static resolve(value) {
        // TODO: Implement static resolve
    }
    
    static reject(reason) {
        // TODO: Implement static reject
    }
}
```

### Exercise 7: Async Iterator
Create an async iterator that fetches paginated data:

```javascript
class PaginatedDataFetcher {
    constructor(baseUrl, pageSize = 10) {
        this.baseUrl = baseUrl;
        this.pageSize = pageSize;
        this.currentPage = 1;
    }
    
    // TODO: Implement async iterator protocol
    // Should fetch data page by page until no more data
    
    async *[Symbol.asyncIterator]() {
        // Your implementation here
    }
}

// Usage example:
// for await (const item of new PaginatedDataFetcher('/api/users')) {
//     console.log(item);
// }
```

### Exercise 8: Rate Limiting
Implement a rate limiter for API calls:

```javascript
class RateLimiter {
    constructor(maxRequests, timeWindow) {
        // TODO: Allow maxRequests per timeWindow (in milliseconds)
    }
    
    async execute(asyncFunction) {
        // TODO: Execute the function only if rate limit allows
        // If rate limit exceeded, wait until it's safe to proceed
    }
}

// Example usage:
// const limiter = new RateLimiter(5, 1000); // 5 requests per second
// await limiter.execute(() => fetch('/api/data'));
```

### Exercise 9: Async Queue with Priority
Extend the basic queue to support priority levels:

```javascript
class PriorityAsyncQueue {
    constructor() {
        // TODO: Implement queue that processes high priority tasks first
    }
    
    async add(asyncFunction, priority = 0) {
        // TODO: Higher priority numbers should execute first
    }
    
    // TODO: Implement other necessary methods
}
```

### Exercise 10: Timeout Wrapper
Create a utility that adds timeout functionality to any Promise:

```javascript
function withTimeout(promise, timeoutMs, timeoutMessage = "Operation timed out") {
    // TODO: Return a new Promise that either:
    // 1. Resolves/rejects with the original promise result
    // 2. Rejects with timeout error if timeoutMs elapsed
    
    // Bonus: Clean up the timeout if the original promise settles first
}

// Usage:
// const result = await withTimeout(fetch('/slow-api'), 5000, "API call timed out");
```

---

## 🔥 Advanced Level

### Exercise 11: Async Pool
Implement a pool that limits concurrent async operations:

```javascript
class AsyncPool {
    constructor(concurrencyLimit) {
        // TODO: Allow only 'concurrencyLimit' operations to run simultaneously
    }
    
    async execute(asyncFunction) {
        // TODO: Queue the function if pool is full
        // Execute immediately if pool has capacity
    }
    
    async executeAll(asyncFunctions) {
        // TODO: Execute all functions with concurrency control
        // Return results in the same order as input
    }
}
```

### Exercise 12: Retry with Exponential Backoff
Create an advanced retry mechanism:

```javascript
async function retryWithBackoff(operation, options = {}) {
    const {
        maxRetries = 3,
        initialDelay = 1000,
        maxDelay = 30000,
        backoffFactor = 2,
        jitter = true,
        retryCondition = () => true
    } = options;
    
    // TODO: Implement retry logic with:
    // - Exponential backoff (delay *= backoffFactor each retry)
    // - Maximum delay cap
    // - Optional jitter (random delay variation)
    // - Custom retry condition function
}
```

### Exercise 13: Async State Machine
Build a state machine for handling complex async workflows:

```javascript
class AsyncStateMachine {
    constructor(states, initialState) {
        // TODO: Implement state machine that can:
        // - Transition between states based on async operations
        // - Handle state-specific logic
        // - Emit events on state changes
        // - Support rollback on errors
    }
    
    async transition(event, data) {
        // TODO: Handle state transitions
    }
    
    getCurrentState() {
        // TODO: Return current state
    }
    
    onStateChange(callback) {
        // TODO: Register state change listeners
    }
}
```

### Exercise 14: Async Middleware Pipeline
Create a middleware system for async operations:

```javascript
class AsyncPipeline {
    constructor() {
        this.middlewares = [];
    }
    
    use(middleware) {
        // TODO: Add middleware function
        // Middleware signature: async (context, next) => { ... }
    }
    
    async execute(initialContext) {
        // TODO: Execute all middlewares in order
        // Each middleware can modify context and call next()
        // Support error handling and early termination
    }
}
```

### Exercise 15: Memory-Efficient Async Stream Processor
Process large datasets without loading everything into memory:

```javascript
class AsyncStreamProcessor {
    constructor(source, batchSize = 100) {
        // TODO: Process data in batches to avoid memory issues
    }
    
    async *process(transformFunction) {
        // TODO: Yield processed items one by one
        // Load and process data in batches
        // Handle backpressure
    }
    
    async reduce(reducerFunction, initialValue) {
        // TODO: Reduce the stream to a single value
    }
    
    async filter(predicateFunction) {
        // TODO: Return new processor with filtered data
    }
    
    async map(transformFunction) {
        // TODO: Return new processor with transformed data
    }
}
```

---

## 🎨 Creative Challenges

### Challenge 1: Async Animation Framework
Build a framework for creating smooth async animations:

```javascript
class AsyncAnimator {
    // TODO: Create animations that can be:
    // - Chained together
    // - Run in parallel
    // - Paused/resumed
    // - Cancelled
    // - Eased with different timing functions
}
```

### Challenge 2: Distributed Task Coordinator
Simulate a system that coordinates tasks across multiple "workers":

```javascript
class TaskCoordinator {
    // TODO: Distribute tasks to workers
    // Handle worker failures
    // Implement load balancing
    // Support task dependencies
}
```

### Challenge 3: Real-time Data Synchronizer
Build a system that keeps local data in sync with a remote source:

```javascript
class DataSynchronizer {
    // TODO: Implement real-time sync with:
    // - Conflict resolution
    // - Offline support
    // - Optimistic updates
    // - Rollback on errors
}
```

---

## 🧪 Testing Your Solutions

For each exercise, test with:

1. **Happy path** - Normal, expected inputs
2. **Error cases** - Invalid inputs, network failures
3. **Edge cases** - Empty data, very large datasets
4. **Concurrent access** - Multiple operations at once
5. **Performance** - Time and memory usage

## 💡 Hints

- Use `console.time()` and `console.timeEnd()` to measure performance
- Test error handling by temporarily breaking your code
- Use browser dev tools to inspect Promise states
- Consider using `Promise.allSettled()` when you need all results regardless of failures
- Remember that `async` functions always return Promises

## 🎯 Success Criteria

You've mastered async JavaScript when you can:
- ✅ Explain the event loop and task queues
- ✅ Convert between callbacks, Promises, and async/await
- ✅ Handle errors gracefully in async code
- ✅ Implement complex async patterns from scratch
- ✅ Optimize async operations for performance
- ✅ Debug async code effectively

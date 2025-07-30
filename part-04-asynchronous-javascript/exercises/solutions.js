/**
 * Part 4: Asynchronous JavaScript - Exercise Solutions
 * 
 * Complete solutions for all exercises in exercises.md
 * Study these solutions to understand best practices and patterns
 */

console.log("🎯 Asynchronous JavaScript - Exercise Solutions");
console.log("===============================================");

// ============================================================================
// BASIC LEVEL SOLUTIONS
// ============================================================================

// Exercise 1: Understanding the Event Loop
function demonstrateEventLoop() {
    console.log("Start"); // 1. Synchronous - executes immediately
    
    setTimeout(() => {
        console.log("Timeout"); // 4. Macrotask - executes last
    }, 0);
    
    Promise.resolve().then(() => {
        console.log("Promise"); // 3. Microtask - executes before macrotasks
    });
    
    console.log("End"); // 2. Synchronous - executes immediately
}

// Exercise 2: Callback to Promise Conversion
function fetchUserCallback(userId, callback) {
    setTimeout(() => {
        if (userId <= 0) {
            callback(new Error("Invalid user ID"), null);
        } else {
            callback(null, { id: userId, name: `User ${userId}` });
        }
    }, 1000);
}

function fetchUserPromise(userId) {
    return new Promise((resolve, reject) => {
        fetchUserCallback(userId, (error, user) => {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        });
    });
}

// Exercise 3: Basic async/await
// Mock functions for the example
async function fetchUser(userId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: userId, name: `User ${userId}` };
}

async function fetchPosts(userId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { id: 1, title: "Post 1", published: true },
        { id: 2, title: "Post 2", published: false },
        { id: 3, title: "Post 3", published: true }
    ];
}

async function getUserPostsAsync(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchPosts(user.id);
        const publishedPosts = posts.filter(post => post.published);
        
        console.log(`Found ${publishedPosts.length} published posts`);
        return publishedPosts;
    } catch (error) {
        console.error("Error:", error.message);
        return [];
    }
}

// Exercise 4: Error Handling Practice
async function robustApiCall(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            return {
                success: false,
                data: null,
                error: `HTTP Error: ${response.status} ${response.statusText}`
            };
        }
        
        const data = await response.json();
        
        return {
            success: true,
            data: data,
            error: null
        };
        
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            return {
                success: false,
                data: null,
                error: "Request timed out after 5 seconds"
            };
        }
        
        if (error instanceof SyntaxError) {
            return {
                success: false,
                data: null,
                error: "Invalid JSON response"
            };
        }
        
        return {
            success: false,
            data: null,
            error: `Network error: ${error.message}`
        };
    }
}

// Exercise 5: Promise.all Practice
async function fetchMultipleUsers(userIds) {
    const userPromises = userIds.map(async (userId) => {
        try {
            const user = await fetchUserPromise(userId);
            return { success: true, data: user };
        } catch (error) {
            console.warn(`Failed to fetch user ${userId}:`, error.message);
            return { success: false, error: error.message };
        }
    });
    
    const results = await Promise.all(userPromises);
    
    // Return only successful results
    return results
        .filter(result => result.success)
        .map(result => result.data);
}

// ============================================================================
// INTERMEDIATE LEVEL SOLUTIONS
// ============================================================================

// Exercise 6: Custom Promise Implementation
class SimplePromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach(callback => callback(value));
            }
        };
        
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(callback => callback(reason));
            }
        };
        
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    
    then(onFulfilled, onRejected) {
        return new SimplePromise((resolve, reject) => {
            const handleFulfilled = (value) => {
                try {
                    if (typeof onFulfilled === 'function') {
                        const result = onFulfilled(value);
                        resolve(result);
                    } else {
                        resolve(value);
                    }
                } catch (error) {
                    reject(error);
                }
            };
            
            const handleRejected = (reason) => {
                try {
                    if (typeof onRejected === 'function') {
                        const result = onRejected(reason);
                        resolve(result);
                    } else {
                        reject(reason);
                    }
                } catch (error) {
                    reject(error);
                }
            };
            
            if (this.state === 'fulfilled') {
                setTimeout(() => handleFulfilled(this.value), 0);
            } else if (this.state === 'rejected') {
                setTimeout(() => handleRejected(this.reason), 0);
            } else {
                this.onFulfilledCallbacks.push(handleFulfilled);
                this.onRejectedCallbacks.push(handleRejected);
            }
        });
    }
    
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    
    static resolve(value) {
        return new SimplePromise((resolve) => resolve(value));
    }
    
    static reject(reason) {
        return new SimplePromise((_, reject) => reject(reason));
    }
}

// Exercise 7: Async Iterator
class PaginatedDataFetcher {
    constructor(baseUrl, pageSize = 10) {
        this.baseUrl = baseUrl;
        this.pageSize = pageSize;
        this.currentPage = 1;
    }
    
    async *[Symbol.asyncIterator]() {
        let hasMoreData = true;
        
        while (hasMoreData) {
            try {
                // Simulate API call
                const response = await this.fetchPage(this.currentPage);
                
                if (response.data.length === 0) {
                    hasMoreData = false;
                    break;
                }
                
                for (const item of response.data) {
                    yield item;
                }
                
                hasMoreData = response.hasMore;
                this.currentPage++;
                
            } catch (error) {
                console.error(`Error fetching page ${this.currentPage}:`, error);
                hasMoreData = false;
            }
        }
    }
    
    async fetchPage(page) {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simulate paginated response
        const startIndex = (page - 1) * this.pageSize;
        const data = Array.from({ length: this.pageSize }, (_, i) => ({
            id: startIndex + i + 1,
            name: `Item ${startIndex + i + 1}`
        }));
        
        return {
            data: page <= 3 ? data : [], // Simulate 3 pages of data
            hasMore: page < 3,
            page: page,
            totalPages: 3
        };
    }
}

// Exercise 8: Rate Limiting
class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }
    
    async execute(asyncFunction) {
        await this.waitForSlot();
        
        try {
            const result = await asyncFunction();
            return result;
        } finally {
            // Record the request timestamp
            this.requests.push(Date.now());
        }
    }
    
    async waitForSlot() {
        const now = Date.now();
        
        // Remove old requests outside the time window
        this.requests = this.requests.filter(
            timestamp => now - timestamp < this.timeWindow
        );
        
        // If we're at the limit, wait until the oldest request expires
        if (this.requests.length >= this.maxRequests) {
            const oldestRequest = this.requests[0];
            const waitTime = this.timeWindow - (now - oldestRequest);
            
            if (waitTime > 0) {
                await new Promise(resolve => setTimeout(resolve, waitTime));
                return this.waitForSlot(); // Recursive call to check again
            }
        }
    }
}

// Exercise 9: Async Queue with Priority
class PriorityAsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
    
    async add(asyncFunction, priority = 0) {
        return new Promise((resolve, reject) => {
            const task = {
                asyncFunction,
                priority,
                resolve,
                reject,
                timestamp: Date.now() // For FIFO within same priority
            };
            
            // Insert task in priority order (higher priority first)
            let inserted = false;
            for (let i = 0; i < this.queue.length; i++) {
                if (this.queue[i].priority < priority) {
                    this.queue.splice(i, 0, task);
                    inserted = true;
                    break;
                }
            }
            
            if (!inserted) {
                this.queue.push(task);
            }
            
            this.process();
        });
    }
    
    async process() {
        if (this.processing || this.queue.length === 0) {
            return;
        }
        
        this.processing = true;
        
        while (this.queue.length > 0) {
            const { asyncFunction, resolve, reject } = this.queue.shift();
            
            try {
                const result = await asyncFunction();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }
        
        this.processing = false;
    }
}

// Exercise 10: Timeout Wrapper
function withTimeout(promise, timeoutMs, timeoutMessage = "Operation timed out") {
    let timeoutId;
    
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error(timeoutMessage));
        }, timeoutMs);
    });
    
    return Promise.race([
        promise.finally(() => clearTimeout(timeoutId)),
        timeoutPromise
    ]);
}

// ============================================================================
// DEMONSTRATION FUNCTIONS
// ============================================================================

async function demonstrateBasicSolutions() {
    console.log("\n📚 Basic Level Solutions Demo");
    console.log("============================");
    
    // Exercise 1
    console.log("\n1. Event Loop Demo:");
    demonstrateEventLoop();
    
    // Exercise 2
    console.log("\n2. Promise Conversion Demo:");
    try {
        const user = await fetchUserPromise(1);
        console.log("Fetched user:", user);
    } catch (error) {
        console.error("Error:", error.message);
    }
    
    // Exercise 3
    console.log("\n3. async/await Demo:");
    const posts = await getUserPostsAsync(1);
    console.log("Published posts:", posts);
}

async function demonstrateIntermediateSolutions() {
    console.log("\n🚀 Intermediate Level Solutions Demo");
    console.log("===================================");
    
    // Exercise 6: Custom Promise
    console.log("\n6. Custom Promise Demo:");
    const customPromise = new SimplePromise((resolve) => {
        setTimeout(() => resolve("Custom Promise Result"), 1000);
    });
    
    const result = await customPromise;
    console.log("Custom Promise result:", result);
    
    // Exercise 8: Rate Limiter
    console.log("\n8. Rate Limiter Demo:");
    const limiter = new RateLimiter(2, 1000); // 2 requests per second
    
    const apiCall = () => {
        console.log("API call executed at", new Date().toISOString());
        return Promise.resolve("API Response");
    };
    
    // These calls will be rate limited
    await limiter.execute(apiCall);
    await limiter.execute(apiCall);
    await limiter.execute(apiCall); // This will wait
}

// ============================================================================
// ADVANCED LEVEL SOLUTIONS
// ============================================================================

// Exercise 11: Async Pool
class AsyncPool {
    constructor(concurrencyLimit) {
        this.concurrencyLimit = concurrencyLimit;
        this.running = new Set();
        this.queue = [];
    }

    async execute(asyncFunction) {
        return new Promise((resolve, reject) => {
            this.queue.push({ asyncFunction, resolve, reject });
            this.processQueue();
        });
    }

    async processQueue() {
        if (this.running.size >= this.concurrencyLimit || this.queue.length === 0) {
            return;
        }

        const { asyncFunction, resolve, reject } = this.queue.shift();
        const promise = this.runTask(asyncFunction, resolve, reject);
        this.running.add(promise);

        promise.finally(() => {
            this.running.delete(promise);
            this.processQueue();
        });
    }

    async runTask(asyncFunction, resolve, reject) {
        try {
            const result = await asyncFunction();
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }

    async executeAll(asyncFunctions) {
        const promises = asyncFunctions.map(fn => this.execute(fn));
        return Promise.all(promises);
    }
}

// Exercise 12: Retry with Exponential Backoff
async function retryWithBackoff(operation, options = {}) {
    const {
        maxRetries = 3,
        initialDelay = 1000,
        maxDelay = 30000,
        backoffFactor = 2,
        jitter = true,
        retryCondition = () => true
    } = options;

    let lastError;
    let delay = initialDelay;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await operation();
            return result;
        } catch (error) {
            lastError = error;

            if (attempt === maxRetries || !retryCondition(error)) {
                throw error;
            }

            // Calculate delay with exponential backoff
            let currentDelay = Math.min(delay, maxDelay);

            // Add jitter to prevent thundering herd
            if (jitter) {
                currentDelay = currentDelay * (0.5 + Math.random() * 0.5);
            }

            console.log(`Attempt ${attempt} failed, retrying in ${currentDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, currentDelay));

            delay *= backoffFactor;
        }
    }

    throw lastError;
}

// Exercise 13: Async State Machine
class AsyncStateMachine {
    constructor(states, initialState) {
        this.states = states;
        this.currentState = initialState;
        this.listeners = [];
        this.history = [initialState];
    }

    async transition(event, data) {
        const currentStateConfig = this.states[this.currentState];

        if (!currentStateConfig || !currentStateConfig.transitions[event]) {
            throw new Error(`Invalid transition: ${event} from state ${this.currentState}`);
        }

        const transition = currentStateConfig.transitions[event];
        const nextState = typeof transition.target === 'function'
            ? await transition.target(data)
            : transition.target;

        try {
            // Execute exit action for current state
            if (currentStateConfig.onExit) {
                await currentStateConfig.onExit(data);
            }

            // Execute transition action
            if (transition.action) {
                await transition.action(data);
            }

            const previousState = this.currentState;
            this.currentState = nextState;
            this.history.push(nextState);

            // Execute entry action for new state
            const newStateConfig = this.states[nextState];
            if (newStateConfig && newStateConfig.onEntry) {
                await newStateConfig.onEntry(data);
            }

            // Notify listeners
            this.listeners.forEach(listener => {
                listener(previousState, nextState, event, data);
            });

            return nextState;

        } catch (error) {
            console.error(`State transition failed: ${error.message}`);
            throw error;
        }
    }

    getCurrentState() {
        return this.currentState;
    }

    onStateChange(callback) {
        this.listeners.push(callback);
        return () => {
            const index = this.listeners.indexOf(callback);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    async rollback() {
        if (this.history.length > 1) {
            this.history.pop(); // Remove current state
            const previousState = this.history[this.history.length - 1];
            this.currentState = previousState;
            return previousState;
        }
        throw new Error("Cannot rollback: no previous state");
    }
}

// Exercise 14: Async Middleware Pipeline
class AsyncPipeline {
    constructor() {
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }

    async execute(initialContext) {
        let index = 0;

        const next = async () => {
            if (index >= this.middlewares.length) {
                return;
            }

            const middleware = this.middlewares[index++];
            await middleware(initialContext, next);
        };

        try {
            await next();
            return initialContext;
        } catch (error) {
            console.error("Pipeline execution failed:", error);
            throw error;
        }
    }
}

// Exercise 15: Memory-Efficient Async Stream Processor
class AsyncStreamProcessor {
    constructor(source, batchSize = 100) {
        this.source = source;
        this.batchSize = batchSize;
    }

    async *process(transformFunction) {
        if (typeof this.source[Symbol.asyncIterator] === 'function') {
            // Handle async iterable source
            for await (const item of this.source) {
                yield await transformFunction(item);
            }
        } else if (Array.isArray(this.source)) {
            // Handle array source in batches
            for (let i = 0; i < this.source.length; i += this.batchSize) {
                const batch = this.source.slice(i, i + this.batchSize);
                for (const item of batch) {
                    yield await transformFunction(item);
                }
                // Allow other tasks to run between batches
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }
    }

    async reduce(reducerFunction, initialValue) {
        let accumulator = initialValue;

        for await (const item of this.process(x => x)) {
            accumulator = await reducerFunction(accumulator, item);
        }

        return accumulator;
    }

    filter(predicateFunction) {
        const filteredSource = this.createFilteredSource(predicateFunction);
        return new AsyncStreamProcessor(filteredSource, this.batchSize);
    }

    async *createFilteredSource(predicateFunction) {
        for await (const item of this.process(x => x)) {
            if (await predicateFunction(item)) {
                yield item;
            }
        }
    }

    map(transformFunction) {
        const mappedSource = this.createMappedSource(transformFunction);
        return new AsyncStreamProcessor(mappedSource, this.batchSize);
    }

    async *createMappedSource(transformFunction) {
        for await (const item of this.process(x => x)) {
            yield await transformFunction(item);
        }
    }
}

// ============================================================================
// ADVANCED DEMONSTRATIONS
// ============================================================================

async function demonstrateAdvancedSolutions() {
    console.log("\n🔥 Advanced Level Solutions Demo");
    console.log("===============================");

    // Exercise 11: Async Pool
    console.log("\n11. Async Pool Demo:");
    const pool = new AsyncPool(2); // Max 2 concurrent operations

    const slowTask = (id, delay) => async () => {
        console.log(`Task ${id} started`);
        await new Promise(resolve => setTimeout(resolve, delay));
        console.log(`Task ${id} completed`);
        return `Result ${id}`;
    };

    const tasks = [
        slowTask(1, 1000),
        slowTask(2, 500),
        slowTask(3, 800),
        slowTask(4, 300)
    ];

    const results = await pool.executeAll(tasks);
    console.log("Pool results:", results);

    // Exercise 14: Middleware Pipeline
    console.log("\n14. Middleware Pipeline Demo:");
    const pipeline = new AsyncPipeline();

    pipeline
        .use(async (context, next) => {
            console.log("Middleware 1: Before");
            context.step1 = "completed";
            await next();
            console.log("Middleware 1: After");
        })
        .use(async (context, next) => {
            console.log("Middleware 2: Processing");
            context.step2 = "completed";
            await next();
        })
        .use(async (context, next) => {
            console.log("Middleware 3: Final step");
            context.step3 = "completed";
            await next();
        });

    const result = await pipeline.execute({ data: "initial" });
    console.log("Pipeline result:", result);
}

// Uncomment to run demonstrations:
// demonstrateBasicSolutions();
// setTimeout(() => demonstrateIntermediateSolutions(), 3000);
// setTimeout(() => demonstrateAdvancedSolutions(), 6000);

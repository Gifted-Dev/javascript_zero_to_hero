/**
 * Part 4: Advanced Asynchronous JavaScript Patterns
 * 
 * This file demonstrates advanced patterns and techniques for handling
 * asynchronous operations in JavaScript. These patterns are commonly
 * used in production applications.
 */

console.log("🚀 Advanced Async Patterns Examples");
console.log("=====================================");

// ============================================================================
// 1. ASYNC QUEUE - Process tasks one at a time
// ============================================================================

class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async add(asyncFunction) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                asyncFunction,
                resolve,
                reject
            });
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

// Example usage of AsyncQueue
async function demonstrateAsyncQueue() {
    console.log("\n📋 1. Async Queue Example");
    console.log("-------------------------");
    
    const queue = new AsyncQueue();
    
    // Simulate async tasks with different delays
    const createTask = (name, delay) => () => {
        return new Promise(resolve => {
            console.log(`Starting task: ${name}`);
            setTimeout(() => {
                console.log(`Completed task: ${name}`);
                resolve(`Result from ${name}`);
            }, delay);
        });
    };

    // Add tasks to queue (they'll execute one by one)
    queue.add(createTask("Task 1", 1000));
    queue.add(createTask("Task 2", 500));
    queue.add(createTask("Task 3", 800));
    
    console.log("All tasks added to queue - they'll execute sequentially");
}

// ============================================================================
// 2. RETRY MECHANISM - Retry failed operations
// ============================================================================

async function retryOperation(operation, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}/${maxRetries}`);
            const result = await operation();
            console.log(`✅ Success on attempt ${attempt}`);
            return result;
        } catch (error) {
            lastError = error;
            console.log(`❌ Attempt ${attempt} failed:`, error.message);
            
            if (attempt < maxRetries) {
                console.log(`⏳ Waiting ${delay}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
            }
        }
    }
    
    throw new Error(`Operation failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
}

// Example usage of retry mechanism
async function demonstrateRetryMechanism() {
    console.log("\n🔄 2. Retry Mechanism Example");
    console.log("-----------------------------");
    
    // Simulate an unreliable operation that fails 70% of the time
    const unreliableOperation = () => {
        return new Promise((resolve, reject) => {
            if (Math.random() < 0.7) {
                reject(new Error("Network timeout"));
            } else {
                resolve("Operation successful!");
            }
        });
    };

    try {
        const result = await retryOperation(unreliableOperation, 5, 500);
        console.log("Final result:", result);
    } catch (error) {
        console.log("Operation ultimately failed:", error.message);
    }
}

// ============================================================================
// 3. DEBOUNCING ASYNC OPERATIONS
// ============================================================================

function debounceAsync(func, delay) {
    let timeoutId;
    let latestResolve;
    let latestReject;

    return function(...args) {
        return new Promise((resolve, reject) => {
            // Clear previous timeout
            if (timeoutId) {
                clearTimeout(timeoutId);
                // Reject the previous promise
                if (latestReject) {
                    latestReject(new Error("Debounced"));
                }
            }

            latestResolve = resolve;
            latestReject = reject;

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

// Example usage of debounced async function
async function demonstrateDebouncing() {
    console.log("\n⏱️  3. Debouncing Async Operations");
    console.log("----------------------------------");
    
    // Simulate an API search function
    const searchAPI = async (query) => {
        console.log(`🔍 Searching for: "${query}"`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        return `Results for "${query}"`;
    };

    const debouncedSearch = debounceAsync(searchAPI, 1000);

    // Simulate rapid user typing
    console.log("Simulating rapid user typing...");
    
    try {
        // These calls will be debounced - only the last one will execute
        debouncedSearch("a").catch(() => console.log("Search for 'a' was cancelled"));
        debouncedSearch("ap").catch(() => console.log("Search for 'ap' was cancelled"));
        debouncedSearch("app").catch(() => console.log("Search for 'app' was cancelled"));
        const result = await debouncedSearch("apple");
        console.log("Final search result:", result);
    } catch (error) {
        console.log("Search error:", error.message);
    }
}

// ============================================================================
// 4. ASYNC MEMOIZATION - Cache async results
// ============================================================================

function memoizeAsync(fn) {
    const cache = new Map();
    
    return async function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log(`📦 Cache hit for key: ${key}`);
            return cache.get(key);
        }
        
        console.log(`🔄 Cache miss for key: ${key} - executing function`);
        const result = await fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Example usage of async memoization
async function demonstrateMemoization() {
    console.log("\n💾 4. Async Memoization Example");
    console.log("-------------------------------");
    
    // Simulate expensive async operation
    const expensiveOperation = async (n) => {
        console.log(`Computing expensive operation for ${n}...`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        return n * n * n; // Cube calculation
    };

    const memoizedOperation = memoizeAsync(expensiveOperation);

    // First calls - will execute the function
    console.log("Result 1:", await memoizedOperation(5));
    console.log("Result 2:", await memoizedOperation(3));
    
    // Second calls - will use cache
    console.log("Result 3 (cached):", await memoizedOperation(5));
    console.log("Result 4 (cached):", await memoizedOperation(3));
}

// ============================================================================
// 5. PERFORMANCE MONITORING
// ============================================================================

function withPerformanceMonitoring(asyncFunction, name) {
    return async function(...args) {
        const startTime = performance.now();
        const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
        
        try {
            console.log(`⏱️  Starting ${name}...`);
            const result = await asyncFunction.apply(this, args);
            
            const endTime = performance.now();
            const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
            const duration = endTime - startTime;
            const memoryDelta = endMemory - startMemory;
            
            console.log(`✅ ${name} completed in ${duration.toFixed(2)}ms`);
            if (performance.memory) {
                console.log(`📊 Memory change: ${(memoryDelta / 1024 / 1024).toFixed(2)}MB`);
            }
            
            return result;
        } catch (error) {
            const endTime = performance.now();
            const duration = endTime - startTime;
            console.log(`❌ ${name} failed after ${duration.toFixed(2)}ms:`, error.message);
            throw error;
        }
    };
}

// Example usage of performance monitoring
async function demonstratePerformanceMonitoring() {
    console.log("\n📊 5. Performance Monitoring Example");
    console.log("------------------------------------");
    
    // Simulate different types of operations
    const fastOperation = async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return "Fast result";
    };

    const slowOperation = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Simulate some memory usage
        const largeArray = new Array(1000000).fill(0);
        return "Slow result";
    };

    const monitoredFast = withPerformanceMonitoring(fastOperation, "Fast Operation");
    const monitoredSlow = withPerformanceMonitoring(slowOperation, "Slow Operation");

    await monitoredFast();
    await monitoredSlow();
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function runAllExamples() {
    try {
        await demonstrateAsyncQueue();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait between examples
        
        await demonstrateRetryMechanism();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await demonstrateDebouncing();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await demonstrateMemoization();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await demonstratePerformanceMonitoring();
        
        console.log("\n🎉 All advanced patterns demonstrated!");
        console.log("=====================================");
        
    } catch (error) {
        console.error("Error running examples:", error);
    }
}

// Uncomment the line below to run all examples
// runAllExamples();

// Or run individual examples:
// demonstrateAsyncQueue();
// demonstrateRetryMechanism();
// demonstrateDebouncing();
// demonstrateMemoization();
// demonstratePerformanceMonitoring();

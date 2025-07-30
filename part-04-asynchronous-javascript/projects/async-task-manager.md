# Project: Async Task Manager
## Build a Real-World Asynchronous Application

Create a comprehensive task management application that demonstrates all the asynchronous JavaScript concepts you've learned. This project will simulate real-world scenarios including API interactions, data persistence, and complex async workflows.

## 🎯 Project Objectives

By completing this project, you will:
- ✅ Master Promise-based API interactions
- ✅ Implement complex async workflows with proper error handling
- ✅ Build retry mechanisms and rate limiting
- ✅ Create real-time data synchronization
- ✅ Handle concurrent operations efficiently
- ✅ Implement offline-first functionality
- ✅ Practice advanced async patterns

---

## 📋 Core Requirements

### 1. Task Management System
- **Create tasks** with title, description, priority, and due date
- **Update task status** (pending, in-progress, completed)
- **Delete tasks** with confirmation
- **Search and filter** tasks by various criteria
- **Bulk operations** on multiple tasks

### 2. Asynchronous Features
- **Auto-save** changes with debouncing
- **Background sync** with simulated API
- **Offline support** with local storage fallback
- **Real-time updates** simulation
- **Progress tracking** for long-running operations

### 3. Advanced Async Patterns
- **Retry mechanisms** for failed API calls
- **Rate limiting** for API requests
- **Concurrent task processing** with limits
- **Queue management** for background operations
- **Performance monitoring** and optimization

---

## 🏗️ Project Structure

Create this file structure:
```
projects/async-task-manager/
├── index.html              # Main application interface
├── css/
│   └── styles.css          # Application styling
├── js/
│   ├── app.js              # Main application logic
│   ├── task-manager.js     # Core task management
│   ├── api-client.js       # API communication layer
│   ├── storage-manager.js  # Local storage handling
│   ├── sync-manager.js     # Background synchronization
│   └── utils/
│       ├── async-utils.js  # Async utility functions
│       ├── rate-limiter.js # Rate limiting implementation
│       └── retry-manager.js # Retry mechanism
├── data/
│   └── mock-api.js         # Mock API for testing
└── README.md               # Project documentation
```

---

## 📝 Step-by-Step Implementation Guide

### Phase 1: Basic Setup and Core Functionality

#### Step 1: HTML Structure (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Async Task Manager</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <h1>Async Task Manager</h1>
            <div class="status-indicators">
                <span id="connection-status" class="status online">Online</span>
                <span id="sync-status" class="status">Synced</span>
            </div>
        </header>

        <main class="app-main">
            <section class="task-controls">
                <div class="search-filter">
                    <input type="text" id="search-input" placeholder="Search tasks...">
                    <select id="filter-status">
                        <option value="all">All Tasks</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select id="filter-priority">
                        <option value="all">All Priorities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                
                <div class="bulk-actions">
                    <button id="select-all-btn">Select All</button>
                    <button id="bulk-complete-btn" disabled>Mark Complete</button>
                    <button id="bulk-delete-btn" disabled>Delete Selected</button>
                </div>
            </section>

            <section class="task-form">
                <h2>Add New Task</h2>
                <form id="task-form">
                    <input type="text" id="task-title" placeholder="Task title" required>
                    <textarea id="task-description" placeholder="Task description"></textarea>
                    <select id="task-priority">
                        <option value="low">Low Priority</option>
                        <option value="medium" selected>Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <input type="datetime-local" id="task-due-date">
                    <button type="submit">Add Task</button>
                </form>
            </section>

            <section class="task-list">
                <h2>Tasks</h2>
                <div id="loading-indicator" class="loading hidden">Loading...</div>
                <div id="task-container"></div>
                <div id="empty-state" class="empty-state hidden">
                    <p>No tasks found. Create your first task above!</p>
                </div>
            </section>
        </main>

        <div id="progress-modal" class="modal hidden">
            <div class="modal-content">
                <h3>Processing...</h3>
                <div class="progress-bar">
                    <div id="progress-fill" class="progress-fill"></div>
                </div>
                <p id="progress-text">Initializing...</p>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="js/utils/async-utils.js"></script>
    <script src="js/utils/rate-limiter.js"></script>
    <script src="js/utils/retry-manager.js"></script>
    <script src="js/storage-manager.js"></script>
    <script src="js/api-client.js"></script>
    <script src="js/sync-manager.js"></script>
    <script src="js/task-manager.js"></script>
    <script src="js/app.js"></script>
    <script src="data/mock-api.js"></script>
</body>
</html>
```

#### Step 2: Core Task Manager (js/task-manager.js)
```javascript
class TaskManager {
    constructor() {
        this.tasks = new Map();
        this.listeners = new Set();
        this.lastModified = Date.now();
    }

    // Task CRUD operations
    async createTask(taskData) {
        const task = {
            id: this.generateId(),
            title: taskData.title,
            description: taskData.description || '',
            priority: taskData.priority || 'medium',
            status: 'pending',
            dueDate: taskData.dueDate || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tasks.set(task.id, task);
        this.lastModified = Date.now();
        this.notifyListeners('create', task);
        
        return task;
    }

    async updateTask(taskId, updates) {
        const task = this.tasks.get(taskId);
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }

        const updatedTask = {
            ...task,
            ...updates,
            updatedAt: new Date().toISOString()
        };

        this.tasks.set(taskId, updatedTask);
        this.lastModified = Date.now();
        this.notifyListeners('update', updatedTask);
        
        return updatedTask;
    }

    async deleteTask(taskId) {
        const task = this.tasks.get(taskId);
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }

        this.tasks.delete(taskId);
        this.lastModified = Date.now();
        this.notifyListeners('delete', task);
        
        return task;
    }

    // Bulk operations
    async bulkUpdateTasks(taskIds, updates) {
        const results = [];
        
        for (const taskId of taskIds) {
            try {
                const updatedTask = await this.updateTask(taskId, updates);
                results.push({ success: true, task: updatedTask });
            } catch (error) {
                results.push({ success: false, taskId, error: error.message });
            }
        }
        
        return results;
    }

    async bulkDeleteTasks(taskIds) {
        const results = [];
        
        for (const taskId of taskIds) {
            try {
                const deletedTask = await this.deleteTask(taskId);
                results.push({ success: true, task: deletedTask });
            } catch (error) {
                results.push({ success: false, taskId, error: error.message });
            }
        }
        
        return results;
    }

    // Query operations
    getTasks(filters = {}) {
        let tasks = Array.from(this.tasks.values());

        if (filters.status && filters.status !== 'all') {
            tasks = tasks.filter(task => task.status === filters.status);
        }

        if (filters.priority && filters.priority !== 'all') {
            tasks = tasks.filter(task => task.priority === filters.priority);
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            tasks = tasks.filter(task => 
                task.title.toLowerCase().includes(searchTerm) ||
                task.description.toLowerCase().includes(searchTerm)
            );
        }

        return tasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    getTask(taskId) {
        return this.tasks.get(taskId);
    }

    // Event handling
    addListener(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    notifyListeners(action, task) {
        this.listeners.forEach(callback => {
            try {
                callback(action, task);
            } catch (error) {
                console.error('Error in task listener:', error);
            }
        });
    }

    // Utility methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getStats() {
        const tasks = Array.from(this.tasks.values());
        return {
            total: tasks.length,
            pending: tasks.filter(t => t.status === 'pending').length,
            inProgress: tasks.filter(t => t.status === 'in-progress').length,
            completed: tasks.filter(t => t.status === 'completed').length,
            overdue: tasks.filter(t => 
                t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed'
            ).length
        };
    }

    // Data export/import
    exportTasks() {
        return {
            tasks: Array.from(this.tasks.values()),
            lastModified: this.lastModified,
            exportedAt: new Date().toISOString()
        };
    }

    importTasks(data) {
        this.tasks.clear();
        
        if (data.tasks && Array.isArray(data.tasks)) {
            data.tasks.forEach(task => {
                this.tasks.set(task.id, task);
            });
        }
        
        this.lastModified = data.lastModified || Date.now();
        this.notifyListeners('import', null);
    }
}
```

### Phase 2: Async Utilities and API Layer

#### Step 3: Async Utilities (js/utils/async-utils.js)
```javascript
// Debounce function for async operations
function debounceAsync(func, delay) {
    let timeoutId;
    let latestResolve;
    let latestReject;

    return function(...args) {
        return new Promise((resolve, reject) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
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

// Throttle function for async operations
function throttleAsync(func, limit) {
    let inThrottle;
    
    return async function(...args) {
        if (!inThrottle) {
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
            return await func.apply(this, args);
        }
    };
}

// Timeout wrapper for promises
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

// Async queue for sequential processing
class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async add(asyncFunction) {
        return new Promise((resolve, reject) => {
            this.queue.push({ asyncFunction, resolve, reject });
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

// Progress tracker for long operations
class ProgressTracker {
    constructor(total, onProgress) {
        this.total = total;
        this.current = 0;
        this.onProgress = onProgress;
    }

    increment(amount = 1) {
        this.current = Math.min(this.current + amount, this.total);
        const percentage = (this.current / this.total) * 100;
        
        if (this.onProgress) {
            this.onProgress(this.current, this.total, percentage);
        }
        
        return percentage;
    }

    setProgress(current) {
        this.current = Math.min(current, this.total);
        const percentage = (this.current / this.total) * 100;
        
        if (this.onProgress) {
            this.onProgress(this.current, this.total, percentage);
        }
        
        return percentage;
    }

    isComplete() {
        return this.current >= this.total;
    }
}
```

---

## 🎯 Implementation Phases

### Phase 1: Core Functionality (Week 1)
- [ ] Set up project structure
- [ ] Implement basic task CRUD operations
- [ ] Create simple UI for task management
- [ ] Add local storage persistence

### Phase 2: Async Features (Week 2)
- [ ] Implement API client with retry logic
- [ ] Add rate limiting for API calls
- [ ] Create background sync manager
- [ ] Implement auto-save with debouncing

### Phase 3: Advanced Patterns (Week 3)
- [ ] Add bulk operations with progress tracking
- [ ] Implement offline-first functionality
- [ ] Create real-time update simulation
- [ ] Add performance monitoring

### Phase 4: Polish and Testing (Week 4)
- [ ] Comprehensive error handling
- [ ] User experience improvements
- [ ] Performance optimization
- [ ] Testing and debugging

---

## 🧪 Testing Scenarios

Test your application with these scenarios:

1. **Network Conditions**
   - Slow network simulation
   - Intermittent connectivity
   - Complete offline mode

2. **Data Scenarios**
   - Large number of tasks (1000+)
   - Concurrent modifications
   - Data corruption recovery

3. **User Interactions**
   - Rapid task creation/deletion
   - Bulk operations on many items
   - Search with real-time filtering

4. **Error Conditions**
   - API failures and recovery
   - Storage quota exceeded
   - Invalid data handling

---

## 🏆 Success Criteria

Your project is complete when:
- ✅ All core features work reliably
- ✅ Async operations handle errors gracefully
- ✅ Application works offline
- ✅ Performance is smooth with large datasets
- ✅ Code follows async best practices
- ✅ User experience is polished

## 🚀 Bonus Features

For extra challenge, implement:
- **Real-time collaboration** simulation
- **Task dependencies** and workflows
- **Advanced search** with filters
- **Data export/import** functionality
- **Keyboard shortcuts** for power users
- **Dark mode** toggle
- **Task templates** and categories

This project will give you hands-on experience with all the async patterns you've learned and prepare you for real-world JavaScript development!

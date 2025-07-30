# Part 5: JavaScript in the Browser - Complete Guide
## Master Advanced DOM, Storage APIs, Performance, and Browser-Specific Features

Welcome to the browser-focused part of your JavaScript journey! This section covers everything you need to build high-performance, interactive web applications that leverage the full power of modern browsers.

## 📚 Table of Contents

1. [Advanced DOM Manipulation](#advanced-dom-manipulation)
2. [Browser Storage APIs](#browser-storage-apis)
3. [Web APIs and Browser Features](#web-apis-and-browser-features)
4. [Performance Optimization](#performance-optimization)
5. [Event Handling and User Interactions](#event-handling-and-user-interactions)
6. [Browser Security and Best Practices](#browser-security-and-best-practices)
7. [Progressive Web App Features](#progressive-web-app-features)
8. [Cross-Browser Compatibility](#cross-browser-compatibility)
9. [Debugging and Development Tools](#debugging-and-development-tools)
10. [Real-World Browser Applications](#real-world-browser-applications)

---

## 1. Advanced DOM Manipulation

### Understanding the DOM Tree

The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page structure as a tree of objects that JavaScript can manipulate.

```javascript
// DOM Tree Structure
document
├── html
    ├── head
    │   ├── title
    │   ├── meta
    │   └── link
    └── body
        ├── header
        ├── main
        │   ├── section
        │   └── article
        └── footer
```

### Modern DOM Selection Methods

```javascript
// Modern selection methods
const element = document.querySelector('.my-class');
const elements = document.querySelectorAll('div[data-active="true"]');

// More specific selections
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;
const siblings = element.parentElement.children;

// Advanced CSS selectors
const complexSelection = document.querySelectorAll(
    'article:nth-child(odd) .content:not(.hidden)'
);
```

### Efficient DOM Manipulation

```javascript
// Document Fragment for batch operations
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}

// Single DOM update instead of 1000
container.appendChild(fragment);

// Template elements for reusable content
const template = document.querySelector('#item-template');
const clone = template.content.cloneNode(true);
clone.querySelector('.title').textContent = 'New Title';
container.appendChild(clone);
```

### Virtual DOM Concepts

```javascript
// Understanding why virtual DOM exists
class SimpleVirtualDOM {
    constructor() {
        this.virtualTree = null;
        this.realDOM = null;
    }
    
    createElement(tag, props, ...children) {
        return {
            tag,
            props: props || {},
            children: children.flat()
        };
    }
    
    render(virtualElement, container) {
        const realElement = this.createRealElement(virtualElement);
        
        if (this.realDOM) {
            container.replaceChild(realElement, this.realDOM);
        } else {
            container.appendChild(realElement);
        }
        
        this.realDOM = realElement;
        this.virtualTree = virtualElement;
    }
    
    createRealElement(virtualElement) {
        if (typeof virtualElement === 'string') {
            return document.createTextNode(virtualElement);
        }
        
        const element = document.createElement(virtualElement.tag);
        
        // Set properties
        Object.keys(virtualElement.props).forEach(key => {
            if (key.startsWith('on')) {
                // Event listener
                const eventType = key.slice(2).toLowerCase();
                element.addEventListener(eventType, virtualElement.props[key]);
            } else {
                element.setAttribute(key, virtualElement.props[key]);
            }
        });
        
        // Add children
        virtualElement.children.forEach(child => {
            element.appendChild(this.createRealElement(child));
        });
        
        return element;
    }
}
```

### Intersection Observer for Performance

```javascript
// Lazy loading images with Intersection Observer
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

// Observe all lazy images
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Infinite scrolling implementation
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadMoreContent();
        }
    });
});

scrollObserver.observe(document.querySelector('.load-more-trigger'));
```

### Mutation Observer for Dynamic Content

```javascript
// Watch for DOM changes
const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Initialize new elements
                    initializeNewElement(node);
                }
            });
        }
        
        if (mutation.type === 'attributes') {
            console.log(`Attribute ${mutation.attributeName} changed`);
        }
    });
});

// Start observing
mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true
});
```

---

## 2. Browser Storage APIs

### LocalStorage and SessionStorage

```javascript
// LocalStorage - persists until manually cleared
class LocalStorageManager {
    static set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('LocalStorage set error:', error);
            return false;
        }
    }
    
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('LocalStorage get error:', error);
            return defaultValue;
        }
    }
    
    static remove(key) {
        localStorage.removeItem(key);
    }
    
    static clear() {
        localStorage.clear();
    }
    
    static getSize() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return total;
    }
}

// SessionStorage - cleared when tab closes
class SessionStorageManager {
    static set(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('SessionStorage error:', error);
            return false;
        }
    }
    
    static get(key, defaultValue = null) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            return defaultValue;
        }
    }
}
```

### IndexedDB for Complex Data

```javascript
// IndexedDB wrapper for complex data storage
class IndexedDBManager {
    constructor(dbName, version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }
    
    async init(stores = []) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                stores.forEach(store => {
                    if (!db.objectStoreNames.contains(store.name)) {
                        const objectStore = db.createObjectStore(store.name, {
                            keyPath: store.keyPath || 'id',
                            autoIncrement: store.autoIncrement || true
                        });
                        
                        // Create indexes
                        if (store.indexes) {
                            store.indexes.forEach(index => {
                                objectStore.createIndex(index.name, index.keyPath, {
                                    unique: index.unique || false
                                });
                            });
                        }
                    }
                });
            };
        });
    }
    
    async add(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async get(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async update(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    async delete(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}
```

### Cache API for Offline Support

```javascript
// Service Worker Cache API
class CacheManager {
    constructor(cacheName) {
        this.cacheName = cacheName;
    }
    
    async addToCache(requests) {
        const cache = await caches.open(this.cacheName);
        return cache.addAll(requests);
    }
    
    async getFromCache(request) {
        const cache = await caches.open(this.cacheName);
        return cache.match(request);
    }
    
    async updateCache(request, response) {
        const cache = await caches.open(this.cacheName);
        return cache.put(request, response);
    }
    
    async deleteFromCache(request) {
        const cache = await caches.open(this.cacheName);
        return cache.delete(request);
    }
    
    async clearCache() {
        return caches.delete(this.cacheName);
    }
}
```

---

## 3. Web APIs and Browser Features

### Geolocation API

```javascript
// Modern geolocation with error handling
class GeolocationManager {
    static async getCurrentPosition(options = {}) {
        const defaultOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                finalOptions
            );
        });
    }
    
    static watchPosition(callback, errorCallback, options = {}) {
        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported');
        }
        
        return navigator.geolocation.watchPosition(
            callback,
            errorCallback,
            options
        );
    }
    
    static clearWatch(watchId) {
        navigator.geolocation.clearWatch(watchId);
    }
}

// Usage example
async function getLocationAndWeather() {
    try {
        const position = await GeolocationManager.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        
        console.log(`Location: ${latitude}, ${longitude}`);
        
        // Fetch weather data using coordinates
        const weather = await fetch(
            `https://api.weather.com/v1/current?lat=${latitude}&lon=${longitude}`
        );
        
        return await weather.json();
    } catch (error) {
        console.error('Location error:', error.message);
    }
}
```

### Notification API

```javascript
// Browser notifications with permission handling
class NotificationManager {
    static async requestPermission() {
        if (!('Notification' in window)) {
            throw new Error('This browser does not support notifications');
        }
        
        if (Notification.permission === 'granted') {
            return true;
        }
        
        if (Notification.permission === 'denied') {
            return false;
        }
        
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    
    static async show(title, options = {}) {
        const hasPermission = await this.requestPermission();
        
        if (!hasPermission) {
            console.warn('Notification permission denied');
            return null;
        }
        
        const defaultOptions = {
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
            vibrate: [200, 100, 200],
            requireInteraction: false,
            silent: false
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        const notification = new Notification(title, finalOptions);
        
        // Auto-close after 5 seconds if not requiring interaction
        if (!finalOptions.requireInteraction) {
            setTimeout(() => notification.close(), 5000);
        }
        
        return notification;
    }
    
    static async showWithActions(title, message, actions = []) {
        if ('serviceWorker' in navigator && 'showNotification' in ServiceWorkerRegistration.prototype) {
            const registration = await navigator.serviceWorker.ready;
            
            return registration.showNotification(title, {
                body: message,
                icon: '/icon-192x192.png',
                actions: actions,
                data: { timestamp: Date.now() }
            });
        } else {
            return this.show(title, { body: message });
        }
    }
}
```

### File API and Drag & Drop

```javascript
// File handling with drag and drop
class FileManager {
    constructor(dropZone) {
        this.dropZone = dropZone;
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, this.highlight.bind(this), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, this.unhighlight.bind(this), false);
        });

        this.dropZone.addEventListener('drop', this.handleDrop.bind(this), false);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    highlight() {
        this.dropZone.classList.add('drag-over');
    }

    unhighlight() {
        this.dropZone.classList.remove('drag-over');
    }

    handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        this.handleFiles(files);
    }

    async handleFiles(files) {
        const fileArray = Array.from(files);

        for (const file of fileArray) {
            await this.processFile(file);
        }
    }

    async processFile(file) {
        // Validate file
        if (!this.validateFile(file)) {
            console.error(`Invalid file: ${file.name}`);
            return;
        }

        // Read file based on type
        if (file.type.startsWith('image/')) {
            await this.handleImageFile(file);
        } else if (file.type === 'text/plain') {
            await this.handleTextFile(file);
        } else if (file.type === 'application/json') {
            await this.handleJSONFile(file);
        }
    }

    validateFile(file) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/png', 'text/plain', 'application/json'];

        if (file.size > maxSize) {
            alert(`File ${file.name} is too large. Maximum size is 10MB.`);
            return false;
        }

        if (!allowedTypes.includes(file.type)) {
            alert(`File type ${file.type} is not allowed.`);
            return false;
        }

        return true;
    }

    async handleImageFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Create thumbnail
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const maxWidth = 200;
                    const maxHeight = 200;
                    let { width, height } = img;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(img, 0, 0, width, height);

                    const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
                    this.displayImage(file.name, e.target.result, thumbnail);
                    resolve();
                };

                img.src = e.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async handleTextFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                this.displayText(file.name, e.target.result);
                resolve();
            };

            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    async handleJSONFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    this.displayJSON(file.name, data);
                    resolve();
                } catch (error) {
                    console.error('Invalid JSON file:', error);
                    reject(error);
                }
            };

            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    displayImage(name, src, thumbnail) {
        console.log(`Image uploaded: ${name}`);
        // Implementation for displaying image
    }

    displayText(name, content) {
        console.log(`Text file uploaded: ${name}`);
        console.log('Content:', content.substring(0, 100) + '...');
    }

    displayJSON(name, data) {
        console.log(`JSON file uploaded: ${name}`);
        console.log('Data:', data);
    }
}
```

---

## 4. Performance Optimization

### Measuring Performance

```javascript
// Performance monitoring utilities
class PerformanceMonitor {
    static measureFunction(fn, name) {
        return async function(...args) {
            const startTime = performance.now();
            const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;

            try {
                const result = await fn.apply(this, args);

                const endTime = performance.now();
                const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;

                console.log(`${name} Performance:`, {
                    duration: `${(endTime - startTime).toFixed(2)}ms`,
                    memoryDelta: `${((endMemory - startMemory) / 1024 / 1024).toFixed(2)}MB`
                });

                return result;
            } catch (error) {
                const endTime = performance.now();
                console.log(`${name} failed after ${(endTime - startTime).toFixed(2)}ms`);
                throw error;
            }
        };
    }

    static markStart(name) {
        performance.mark(`${name}-start`);
    }

    static markEnd(name) {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);

        const measure = performance.getEntriesByName(name)[0];
        console.log(`${name}: ${measure.duration.toFixed(2)}ms`);

        return measure.duration;
    }

    static getNavigationTiming() {
        const navigation = performance.getEntriesByType('navigation')[0];

        return {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            domParsing: navigation.domInteractive - navigation.responseEnd,
            domReady: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            pageLoad: navigation.loadEventEnd - navigation.navigationStart
        };
    }

    static observeResourceTiming() {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
                if (entry.duration > 100) { // Log slow resources
                    console.warn(`Slow resource: ${entry.name} (${entry.duration.toFixed(2)}ms)`);
                }
            });
        });

        observer.observe({ entryTypes: ['resource'] });
        return observer;
    }
}
```

### DOM Performance Optimization

```javascript
// Efficient DOM updates
class DOMOptimizer {
    static batchDOMUpdates(updates) {
        // Use requestAnimationFrame for smooth updates
        return new Promise(resolve => {
            requestAnimationFrame(() => {
                updates.forEach(update => update());
                resolve();
            });
        });
    }

    static createVirtualScroller(container, itemHeight, renderItem) {
        let scrollTop = 0;
        let containerHeight = container.clientHeight;
        let totalItems = 0;
        let items = [];

        const visibleStart = Math.floor(scrollTop / itemHeight);
        const visibleEnd = Math.min(
            visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
            totalItems
        );

        function render() {
            // Clear container
            container.innerHTML = '';

            // Create spacer for items above viewport
            if (visibleStart > 0) {
                const spacer = document.createElement('div');
                spacer.style.height = `${visibleStart * itemHeight}px`;
                container.appendChild(spacer);
            }

            // Render visible items
            for (let i = visibleStart; i < visibleEnd; i++) {
                const item = renderItem(items[i], i);
                container.appendChild(item);
            }

            // Create spacer for items below viewport
            if (visibleEnd < totalItems) {
                const spacer = document.createElement('div');
                spacer.style.height = `${(totalItems - visibleEnd) * itemHeight}px`;
                container.appendChild(spacer);
            }
        }

        container.addEventListener('scroll', () => {
            scrollTop = container.scrollTop;
            render();
        });

        return {
            setItems(newItems) {
                items = newItems;
                totalItems = items.length;
                render();
            },
            refresh: render
        };
    }

    static debounceResize(callback, delay = 250) {
        let timeoutId;

        return function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(callback, delay);
        };
    }

    static optimizeImages() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}
```

### Memory Management

```javascript
// Memory management utilities
class MemoryManager {
    static trackMemoryUsage() {
        if (!performance.memory) {
            console.warn('Memory API not available');
            return null;
        }

        const memory = performance.memory;

        return {
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
            limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
        };
    }

    static createWeakCache() {
        const cache = new WeakMap();

        return {
            set(key, value) {
                cache.set(key, value);
            },

            get(key) {
                return cache.get(key);
            },

            has(key) {
                return cache.has(key);
            },

            delete(key) {
                return cache.delete(key);
            }
        };
    }

    static createObjectPool(createFn, resetFn, initialSize = 10) {
        const pool = [];

        // Pre-populate pool
        for (let i = 0; i < initialSize; i++) {
            pool.push(createFn());
        }

        return {
            acquire() {
                return pool.length > 0 ? pool.pop() : createFn();
            },

            release(obj) {
                resetFn(obj);
                pool.push(obj);
            },

            size() {
                return pool.length;
            }
        };
    }

    static monitorMemoryLeaks() {
        let baseline = this.trackMemoryUsage();

        return setInterval(() => {
            const current = this.trackMemoryUsage();
            if (current && baseline) {
                const growth = current.used - baseline.used;
                if (growth > 10) { // More than 10MB growth
                    console.warn(`Potential memory leak detected: +${growth}MB`);
                }
                baseline = current;
            }
        }, 30000); // Check every 30 seconds
    }
}
```

---

## 5. Event Handling and User Interactions

### Modern Event Handling

```javascript
// Advanced event handling patterns
class EventManager {
    constructor() {
        this.listeners = new Map();
        this.delegatedListeners = new Map();
    }

    // Event delegation for dynamic content
    delegate(container, selector, eventType, handler) {
        const delegatedHandler = (event) => {
            const target = event.target.closest(selector);
            if (target && container.contains(target)) {
                handler.call(target, event);
            }
        };

        container.addEventListener(eventType, delegatedHandler);

        // Store for cleanup
        const key = `${selector}-${eventType}`;
        if (!this.delegatedListeners.has(container)) {
            this.delegatedListeners.set(container, new Map());
        }
        this.delegatedListeners.get(container).set(key, delegatedHandler);

        return () => {
            container.removeEventListener(eventType, delegatedHandler);
            this.delegatedListeners.get(container).delete(key);
        };
    }

    // Throttled event handling
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Debounced event handling
    debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Custom event system
    createCustomEvent(name, detail = {}) {
        return new CustomEvent(name, {
            detail,
            bubbles: true,
            cancelable: true
        });
    }

    // Gesture recognition
    setupGestureRecognition(element) {
        let startX, startY, startTime;
        let isTracking = false;

        const gestures = {
            swipeLeft: [],
            swipeRight: [],
            swipeUp: [],
            swipeDown: [],
            tap: [],
            longPress: []
        };

        element.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
            isTracking = true;

            // Long press detection
            setTimeout(() => {
                if (isTracking) {
                    this.triggerGesture(element, 'longPress', { x: startX, y: startY });
                }
            }, 500);
        });

        element.addEventListener('touchend', (e) => {
            if (!isTracking) return;

            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            const endTime = Date.now();

            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const deltaTime = endTime - startTime;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (deltaTime < 200 && distance < 10) {
                // Tap
                this.triggerGesture(element, 'tap', { x: endX, y: endY });
            } else if (distance > 50) {
                // Swipe
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    // Horizontal swipe
                    if (deltaX > 0) {
                        this.triggerGesture(element, 'swipeRight', { distance, deltaTime });
                    } else {
                        this.triggerGesture(element, 'swipeLeft', { distance, deltaTime });
                    }
                } else {
                    // Vertical swipe
                    if (deltaY > 0) {
                        this.triggerGesture(element, 'swipeDown', { distance, deltaTime });
                    } else {
                        this.triggerGesture(element, 'swipeUp', { distance, deltaTime });
                    }
                }
            }

            isTracking = false;
        });

        return gestures;
    }

    triggerGesture(element, gestureType, data) {
        const event = this.createCustomEvent(`gesture:${gestureType}`, data);
        element.dispatchEvent(event);
    }
}
```

### Keyboard and Accessibility

```javascript
// Keyboard navigation and accessibility
class AccessibilityManager {
    static setupKeyboardNavigation(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        let currentIndex = 0;

        container.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    currentIndex = (currentIndex + 1) % focusableElements.length;
                    focusableElements[currentIndex].focus();
                    break;

                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    currentIndex = currentIndex === 0
                        ? focusableElements.length - 1
                        : currentIndex - 1;
                    focusableElements[currentIndex].focus();
                    break;

                case 'Home':
                    e.preventDefault();
                    currentIndex = 0;
                    focusableElements[currentIndex].focus();
                    break;

                case 'End':
                    e.preventDefault();
                    currentIndex = focusableElements.length - 1;
                    focusableElements[currentIndex].focus();
                    break;
            }
        });
    }

    static announceToScreenReader(message, priority = 'polite') {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    static setupFocusTrap(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        container.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }

            if (e.key === 'Escape') {
                container.dispatchEvent(new CustomEvent('focustrap:escape'));
            }
        });

        // Focus first element
        firstElement.focus();
    }
}
```

---

## 6. Browser Security and Best Practices

### Content Security Policy (CSP)

```javascript
// CSP utilities and security helpers
class SecurityManager {
    static generateNonce() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return btoa(String.fromCharCode.apply(null, array));
    }

    static sanitizeHTML(html) {
        const template = document.createElement('template');
        template.innerHTML = html;

        // Remove script tags
        const scripts = template.content.querySelectorAll('script');
        scripts.forEach(script => script.remove());

        // Remove event handlers
        const elements = template.content.querySelectorAll('*');
        elements.forEach(element => {
            Array.from(element.attributes).forEach(attr => {
                if (attr.name.startsWith('on')) {
                    element.removeAttribute(attr.name);
                }
            });
        });

        return template.innerHTML;
    }

    static validateURL(url) {
        try {
            const urlObj = new URL(url);

            // Only allow http and https
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                return false;
            }

            // Block suspicious patterns
            const suspiciousPatterns = [
                /javascript:/i,
                /data:/i,
                /vbscript:/i
            ];

            return !suspiciousPatterns.some(pattern => pattern.test(url));
        } catch {
            return false;
        }
    }

    static escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    static createSecureIframe(src, sandbox = []) {
        const iframe = document.createElement('iframe');
        iframe.src = src;

        const defaultSandbox = [
            'allow-scripts',
            'allow-same-origin'
        ];

        iframe.sandbox = [...defaultSandbox, ...sandbox].join(' ');
        iframe.loading = 'lazy';

        return iframe;
    }
}
```

### Data Validation and Sanitization

```javascript
// Input validation and sanitization
class ValidationManager {
    static validators = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\+?[\d\s\-\(\)]+$/,
        url: /^https?:\/\/.+/,
        creditCard: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
        strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    };

    static validate(value, type, options = {}) {
        if (options.required && (!value || value.trim() === '')) {
            return { valid: false, error: 'This field is required' };
        }

        if (!value && !options.required) {
            return { valid: true };
        }

        const validator = this.validators[type];
        if (validator && !validator.test(value)) {
            return { valid: false, error: `Invalid ${type} format` };
        }

        // Length validation
        if (options.minLength && value.length < options.minLength) {
            return { valid: false, error: `Minimum length is ${options.minLength}` };
        }

        if (options.maxLength && value.length > options.maxLength) {
            return { valid: false, error: `Maximum length is ${options.maxLength}` };
        }

        // Custom validator
        if (options.custom && typeof options.custom === 'function') {
            const customResult = options.custom(value);
            if (customResult !== true) {
                return { valid: false, error: customResult };
            }
        }

        return { valid: true };
    }

    static sanitizeInput(input, type = 'text') {
        if (typeof input !== 'string') {
            input = String(input);
        }

        switch (type) {
            case 'text':
                return input.trim().replace(/[<>]/g, '');

            case 'number':
                return input.replace(/[^\d.-]/g, '');

            case 'email':
                return input.toLowerCase().trim();

            case 'phone':
                return input.replace(/[^\d+\-\(\)\s]/g, '');

            case 'alphanumeric':
                return input.replace(/[^a-zA-Z0-9]/g, '');

            default:
                return input.trim();
        }
    }

    static createFormValidator(form) {
        const fields = new Map();

        return {
            addField(name, rules) {
                fields.set(name, rules);
            },

            validate() {
                const errors = {};
                let isValid = true;

                fields.forEach((rules, name) => {
                    const field = form.querySelector(`[name="${name}"]`);
                    if (field) {
                        const result = ValidationManager.validate(field.value, rules.type, rules);
                        if (!result.valid) {
                            errors[name] = result.error;
                            isValid = false;
                        }
                    }
                });

                return { isValid, errors };
            },

            showErrors(errors) {
                // Clear previous errors
                form.querySelectorAll('.error-message').forEach(el => el.remove());

                Object.keys(errors).forEach(name => {
                    const field = form.querySelector(`[name="${name}"]`);
                    if (field) {
                        const errorEl = document.createElement('div');
                        errorEl.className = 'error-message';
                        errorEl.textContent = errors[name];
                        field.parentNode.appendChild(errorEl);
                    }
                });
            }
        };
    }
}
```

---

## 7. Progressive Web App Features

### Service Workers

```javascript
// Service Worker registration and management
class ServiceWorkerManager {
    static async register(scriptURL, options = {}) {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service Workers not supported');
        }

        try {
            const registration = await navigator.serviceWorker.register(scriptURL, options);

            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New version available
                        this.showUpdateNotification();
                    }
                });
            });

            return registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            throw error;
        }
    }

    static async unregister() {
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();

            for (const registration of registrations) {
                await registration.unregister();
            }
        }
    }

    static showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <p>A new version is available!</p>
            <button onclick="window.location.reload()">Update</button>
            <button onclick="this.parentNode.remove()">Later</button>
        `;

        document.body.appendChild(notification);
    }

    static async checkForUpdates() {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            return registration.update();
        }
    }
}
```

### Web App Manifest

```javascript
// PWA installation and manifest utilities
class PWAManager {
    static async checkInstallability() {
        return new Promise((resolve) => {
            let deferredPrompt;

            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                resolve(true);
            });

            // Timeout after 3 seconds
            setTimeout(() => {
                if (!deferredPrompt) {
                    resolve(false);
                }
            }, 3000);
        });
    }

    static async promptInstall() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            this.deferredPrompt = null;
            return outcome === 'accepted';
        }
        return false;
    }

    static isStandalone() {
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.navigator.standalone === true;
    }

    static async getManifest() {
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (!manifestLink) return null;

        try {
            const response = await fetch(manifestLink.href);
            return await response.json();
        } catch (error) {
            console.error('Failed to load manifest:', error);
            return null;
        }
    }

    static createInstallButton(container) {
        const button = document.createElement('button');
        button.textContent = 'Install App';
        button.className = 'install-button';
        button.style.display = 'none';

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            button.style.display = 'block';

            button.addEventListener('click', async () => {
                e.prompt();
                const { outcome } = await e.userChoice;

                if (outcome === 'accepted') {
                    button.style.display = 'none';
                }
            });
        });

        container.appendChild(button);
        return button;
    }
}
```

---

## 8. Real-World Applications

### Building a Complete Browser Application

This section demonstrates how to combine all the concepts into a real-world application. The example shows a task management PWA with offline support, real-time sync, and modern browser features.

```javascript
// Complete application example combining all concepts
class TaskManagerApp {
    constructor() {
        this.db = null;
        this.syncManager = null;
        this.eventManager = new EventManager();
        this.performanceMonitor = new PerformanceMonitor();

        this.init();
    }

    async init() {
        try {
            // Initialize IndexedDB
            this.db = new IndexedDBManager('TaskManager', 1);
            await this.db.init([
                {
                    name: 'tasks',
                    keyPath: 'id',
                    autoIncrement: true,
                    indexes: [
                        { name: 'status', keyPath: 'status' },
                        { name: 'priority', keyPath: 'priority' },
                        { name: 'dueDate', keyPath: 'dueDate' }
                    ]
                }
            ]);

            // Register service worker
            await ServiceWorkerManager.register('/sw.js');

            // Setup UI
            this.setupUI();

            // Load initial data
            await this.loadTasks();

            // Setup real-time sync
            this.setupSync();

            console.log('Task Manager App initialized successfully');
        } catch (error) {
            console.error('App initialization failed:', error);
        }
    }

    setupUI() {
        // Setup event delegation
        this.eventManager.delegate(
            document.body,
            '.task-item .complete-btn',
            'click',
            this.handleTaskComplete.bind(this)
        );

        this.eventManager.delegate(
            document.body,
            '.task-item .delete-btn',
            'click',
            this.handleTaskDelete.bind(this)
        );

        // Setup form handling
        const taskForm = document.getElementById('task-form');
        taskForm.addEventListener('submit', this.handleTaskSubmit.bind(this));

        // Setup search with debouncing
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input',
            this.eventManager.debounce(this.handleSearch.bind(this), 300)
        );

        // Setup keyboard navigation
        AccessibilityManager.setupKeyboardNavigation(document.body);
    }

    async loadTasks() {
        const tasks = await this.db.getAll('tasks');
        this.renderTasks(tasks);
    }

    renderTasks(tasks) {
        const container = document.getElementById('task-container');
        container.innerHTML = '';

        if (tasks.length === 0) {
            container.innerHTML = '<p>No tasks found</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            fragment.appendChild(taskElement);
        });

        container.appendChild(fragment);
    }

    createTaskElement(task) {
        const div = document.createElement('div');
        div.className = `task-item ${task.status}`;
        div.dataset.taskId = task.id;

        div.innerHTML = `
            <div class="task-content">
                <h3>${SecurityManager.escapeHTML(task.title)}</h3>
                <p>${SecurityManager.escapeHTML(task.description)}</p>
                <span class="priority ${task.priority}">${task.priority}</span>
                ${task.dueDate ? `<span class="due-date">${new Date(task.dueDate).toLocaleDateString()}</span>` : ''}
            </div>
            <div class="task-actions">
                <button class="complete-btn" ${task.status === 'completed' ? 'disabled' : ''}>
                    ${task.status === 'completed' ? 'Completed' : 'Complete'}
                </button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        return div;
    }

    async handleTaskSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const task = {
            title: formData.get('title'),
            description: formData.get('description'),
            priority: formData.get('priority'),
            dueDate: formData.get('dueDate'),
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Validate task
        const validation = ValidationManager.validate(task.title, 'text', {
            required: true,
            minLength: 3
        });

        if (!validation.valid) {
            alert(validation.error);
            return;
        }

        try {
            await this.db.add('tasks', task);
            await this.loadTasks();
            e.target.reset();

            // Show success notification
            NotificationManager.show('Task created successfully!');
        } catch (error) {
            console.error('Failed to create task:', error);
            alert('Failed to create task');
        }
    }

    async handleTaskComplete(e) {
        const taskId = parseInt(e.target.closest('.task-item').dataset.taskId);

        try {
            const task = await this.db.get('tasks', taskId);
            task.status = 'completed';
            task.completedAt = new Date().toISOString();

            await this.db.update('tasks', task);
            await this.loadTasks();

            NotificationManager.show('Task completed!');
        } catch (error) {
            console.error('Failed to complete task:', error);
        }
    }

    async handleTaskDelete(e) {
        const taskId = parseInt(e.target.closest('.task-item').dataset.taskId);

        if (confirm('Are you sure you want to delete this task?')) {
            try {
                await this.db.delete('tasks', taskId);
                await this.loadTasks();

                NotificationManager.show('Task deleted');
            } catch (error) {
                console.error('Failed to delete task:', error);
            }
        }
    }

    async handleSearch(e) {
        const query = e.target.value.toLowerCase();
        const allTasks = await this.db.getAll('tasks');

        const filteredTasks = allTasks.filter(task =>
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query)
        );

        this.renderTasks(filteredTasks);
    }

    setupSync() {
        // Simulate real-time sync
        setInterval(async () => {
            // In a real app, this would sync with a server
            console.log('Syncing data...');
        }, 30000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManagerApp();
});
```

This comprehensive guide covers all the essential browser JavaScript concepts you need to build modern, performant web applications. Practice these concepts by building real projects and experimenting with the provided examples!
```

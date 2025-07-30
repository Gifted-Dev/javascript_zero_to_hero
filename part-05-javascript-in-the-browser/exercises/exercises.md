# Part 5: JavaScript in the Browser - Exercises

Master browser-specific JavaScript through hands-on practice! These exercises cover DOM manipulation, storage APIs, web APIs, performance optimization, and modern browser features.

## 🎯 How to Use These Exercises

1. **Set up a local server** - Many exercises require HTTP(S) due to browser security
2. **Use browser DevTools** - Monitor performance, storage, and network activity
3. **Test across browsers** - Ensure compatibility and graceful degradation
4. **Focus on user experience** - Consider accessibility and performance
5. **Compare with solutions** (in `solutions.js`)

---

## 📚 Basic Level (Must Complete All)

### Exercise 1: Efficient DOM Manipulation
Create a function that efficiently adds 1000 list items to the DOM:

```javascript
function createLargeList(container, itemCount) {
    // TODO: Use document fragments for efficient DOM updates
    // Each item should have:
    // - A unique ID
    // - Text content showing the item number
    // - A click handler that highlights the item
    // - Measure and log the performance
}

// Test it:
// createLargeList(document.getElementById('list-container'), 1000);
```

### Exercise 2: Local Storage Manager
Build a robust local storage wrapper with error handling:

```javascript
class StorageManager {
    // TODO: Implement methods for:
    // - set(key, value) - with JSON serialization and error handling
    // - get(key, defaultValue) - with JSON parsing and fallback
    // - remove(key)
    // - clear()
    // - getSize() - calculate total storage used
    // - isQuotaExceeded() - check if storage is full
}

// Test cases:
// const storage = new StorageManager();
// storage.set('user', { name: 'John', age: 30 });
// console.log(storage.get('user'));
```

### Exercise 3: Image Lazy Loading
Implement lazy loading for images using Intersection Observer:

```javascript
class LazyImageLoader {
    constructor(options = {}) {
        // TODO: Set up Intersection Observer
        // Options should include:
        // - rootMargin (default: '50px')
        // - threshold (default: 0.1)
        // - placeholder image URL
    }
    
    observe(img) {
        // TODO: Start observing an image element
        // Image should have data-src attribute with real URL
    }
    
    unobserve(img) {
        // TODO: Stop observing an image
    }
    
    loadImage(img) {
        // TODO: Load the actual image and handle loading states
    }
}
```

### Exercise 4: Form Validation
Create a comprehensive form validation system:

```javascript
class FormValidator {
    constructor(form) {
        this.form = form;
        this.rules = new Map();
        // TODO: Set up form event listeners
    }
    
    addRule(fieldName, validator, errorMessage) {
        // TODO: Add validation rule for a field
        // validator should be a function that returns true/false
    }
    
    validate() {
        // TODO: Validate all fields and return results
        // Return: { isValid: boolean, errors: object }
    }
    
    showErrors(errors) {
        // TODO: Display error messages in the UI
    }
    
    clearErrors() {
        // TODO: Remove all error messages
    }
}

// Usage example:
// const validator = new FormValidator(document.getElementById('myForm'));
// validator.addRule('email', (value) => /\S+@\S+\.\S+/.test(value), 'Invalid email');
```

### Exercise 5: Notification System
Build a browser notification manager:

```javascript
class NotificationManager {
    static async requestPermission() {
        // TODO: Request notification permission
        // Handle all permission states
    }
    
    static async show(title, options = {}) {
        // TODO: Show notification with fallback for denied permission
        // Include default options like icon, badge, etc.
    }
    
    static async showWithActions(title, body, actions = []) {
        // TODO: Show notification with action buttons
        // Use Service Worker if available
    }
    
    static createFallbackNotification(message) {
        // TODO: Create in-page notification for when browser notifications are unavailable
    }
}
```

---

## 🚀 Intermediate Level

### Exercise 6: Virtual Scrolling Component
Create a virtual scrolling list for handling large datasets:

```javascript
class VirtualScrollList {
    constructor(container, options = {}) {
        // TODO: Initialize virtual scrolling
        // Options: itemHeight, bufferSize, renderItem function
    }
    
    setData(items) {
        // TODO: Set the data array and trigger initial render
    }
    
    scrollToIndex(index) {
        // TODO: Scroll to a specific item index
    }
    
    updateItem(index, newData) {
        // TODO: Update a specific item without full re-render
    }
    
    destroy() {
        // TODO: Clean up event listeners and DOM
    }
}
```

### Exercise 7: IndexedDB Wrapper
Create a Promise-based IndexedDB wrapper:

```javascript
class IndexedDBManager {
    constructor(dbName, version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }
    
    async init(stores = []) {
        // TODO: Initialize database with object stores
        // stores format: [{ name, keyPath, indexes }]
    }
    
    async add(storeName, data) {
        // TODO: Add data to store
    }
    
    async get(storeName, key) {
        // TODO: Get data by key
    }
    
    async getAll(storeName, query = null) {
        // TODO: Get all data, optionally filtered
    }
    
    async update(storeName, data) {
        // TODO: Update existing data
    }
    
    async delete(storeName, key) {
        // TODO: Delete data by key
    }
    
    async search(storeName, indexName, value) {
        // TODO: Search using an index
    }
}
```

### Exercise 8: Drag and Drop File Handler
Implement a drag and drop file upload system:

```javascript
class FileDropHandler {
    constructor(dropZone, options = {}) {
        // TODO: Set up drag and drop events
        // Options: allowedTypes, maxSize, multiple
    }
    
    setupEventListeners() {
        // TODO: Handle dragenter, dragover, dragleave, drop
    }
    
    validateFile(file) {
        // TODO: Validate file type and size
    }
    
    async processFile(file) {
        // TODO: Process file based on type
        // Handle images, text, JSON, etc.
    }
    
    showProgress(filename, progress) {
        // TODO: Show upload progress
    }
    
    onFileProcessed(callback) {
        // TODO: Register callback for when file is processed
    }
}
```

### Exercise 9: Performance Monitor
Create a performance monitoring utility:

```javascript
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.observers = [];
    }
    
    startMeasure(name) {
        // TODO: Start performance measurement
    }
    
    endMeasure(name) {
        // TODO: End measurement and calculate duration
    }
    
    measureFunction(fn, name) {
        // TODO: Wrap function to measure its performance
    }
    
    observeResourceTiming() {
        // TODO: Monitor resource loading performance
    }
    
    trackMemoryUsage() {
        // TODO: Track memory usage over time
    }
    
    generateReport() {
        // TODO: Generate performance report
    }
}
```

### Exercise 10: Gesture Recognition
Implement touch gesture recognition:

```javascript
class GestureRecognizer {
    constructor(element) {
        this.element = element;
        this.gestures = new Map();
        // TODO: Set up touch event listeners
    }
    
    addGesture(name, recognizer) {
        // TODO: Add gesture recognizer function
        // recognizer receives touch data and returns confidence score
    }
    
    onGesture(callback) {
        // TODO: Register gesture callback
    }
    
    handleTouchStart(e) {
        // TODO: Handle touch start
    }
    
    handleTouchMove(e) {
        // TODO: Handle touch move and detect gestures
    }
    
    handleTouchEnd(e) {
        // TODO: Handle touch end and finalize gesture
    }
}
```

---

## 🔥 Advanced Level

### Exercise 11: Service Worker Cache Manager
Build a sophisticated caching system:

```javascript
class CacheManager {
    constructor(cacheName, version = 1) {
        this.cacheName = `${cacheName}-v${version}`;
        this.strategies = new Map();
    }
    
    async install(resources = []) {
        // TODO: Install cache with initial resources
    }
    
    addStrategy(pattern, strategy) {
        // TODO: Add caching strategy for URL patterns
        // Strategies: cache-first, network-first, stale-while-revalidate
    }
    
    async handleRequest(request) {
        // TODO: Handle request based on matching strategy
    }
    
    async updateCache(request, response) {
        // TODO: Update cache with new response
    }
    
    async cleanupOldCaches() {
        // TODO: Remove old cache versions
    }
}
```

### Exercise 12: Real-time Data Synchronizer
Create a system for real-time data synchronization:

```javascript
class DataSynchronizer {
    constructor(options = {}) {
        // TODO: Initialize with WebSocket or polling
        // Options: endpoint, syncInterval, conflictResolution
    }
    
    async sync(localData) {
        // TODO: Synchronize local data with server
        // Handle conflicts and merge strategies
    }
    
    onDataChange(callback) {
        // TODO: Register callback for data changes
    }
    
    handleConflict(localData, serverData) {
        // TODO: Resolve data conflicts
        // Strategies: server-wins, client-wins, merge, user-choice
    }
    
    enableOfflineMode() {
        // TODO: Enable offline functionality
    }
    
    queueOfflineChanges(change) {
        // TODO: Queue changes for when connection returns
    }
}
```

### Exercise 13: Progressive Web App Manager
Build a complete PWA management system:

```javascript
class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
    }
    
    async init() {
        // TODO: Initialize PWA features
        // Register service worker, check installation status
    }
    
    async checkInstallability() {
        // TODO: Check if app can be installed
    }
    
    async promptInstall() {
        // TODO: Show installation prompt
    }
    
    onInstallStateChange(callback) {
        // TODO: Register callback for install state changes
    }
    
    async enableOfflineMode() {
        // TODO: Enable offline functionality
    }
    
    async syncInBackground() {
        // TODO: Implement background sync
    }
}
```

### Exercise 14: Memory-Efficient Data Grid
Create a data grid that handles large datasets efficiently:

```javascript
class DataGrid {
    constructor(container, options = {}) {
        // TODO: Initialize grid with virtual scrolling
        // Options: columns, rowHeight, pageSize
    }
    
    setData(data) {
        // TODO: Set data with efficient rendering
    }
    
    addColumn(column) {
        // TODO: Add column dynamically
    }
    
    sort(columnKey, direction) {
        // TODO: Sort data efficiently
    }
    
    filter(filterFn) {
        // TODO: Filter data without re-rendering everything
    }
    
    exportData(format = 'csv') {
        // TODO: Export visible data
    }
    
    onCellEdit(callback) {
        // TODO: Handle cell editing
    }
}
```

### Exercise 15: Browser Feature Detection and Polyfills
Create a comprehensive feature detection system:

```javascript
class FeatureDetector {
    constructor() {
        this.features = new Map();
        this.polyfills = new Map();
    }
    
    detect(featureName, testFunction) {
        // TODO: Detect browser feature support
    }
    
    addPolyfill(featureName, polyfillFunction) {
        // TODO: Add polyfill for unsupported features
    }
    
    loadPolyfillsIfNeeded() {
        // TODO: Load polyfills for unsupported features
    }
    
    getCapabilities() {
        // TODO: Return object with all feature support status
    }
    
    enableGracefulDegradation(feature, fallback) {
        // TODO: Provide fallback for unsupported features
    }
}
```

---

## 🎨 Creative Challenges

### Challenge 1: Interactive Canvas Drawing App
Build a drawing application with:
- Multiple brush types and sizes
- Color picker and palette
- Undo/redo functionality
- Save/load drawings to/from storage
- Touch and mouse support

### Challenge 2: Real-time Collaborative Editor
Create a collaborative text editor with:
- Real-time synchronization
- Conflict resolution
- User presence indicators
- Offline editing support
- Version history

### Challenge 3: Advanced Image Gallery
Build an image gallery with:
- Lazy loading and infinite scroll
- Image optimization and caching
- Gesture navigation (swipe, pinch-to-zoom)
- Fullscreen mode with keyboard navigation
- Metadata display and search

---

## 🧪 Testing Your Solutions

For each exercise, test with:

1. **Different browsers** - Chrome, Firefox, Safari, Edge
2. **Various devices** - Desktop, tablet, mobile
3. **Network conditions** - Fast, slow, offline
4. **Accessibility tools** - Screen readers, keyboard navigation
5. **Performance monitoring** - Memory usage, rendering performance

## 💡 Hints

- Use `performance.mark()` and `performance.measure()` for timing
- Check `navigator.storage.estimate()` for storage quota
- Use `IntersectionObserver` for efficient scroll-based features
- Implement progressive enhancement for better compatibility
- Always provide fallbacks for unsupported features

## 🎯 Success Criteria

You've mastered browser JavaScript when you can:
- ✅ Efficiently manipulate the DOM without performance issues
- ✅ Implement offline-first applications with proper caching
- ✅ Handle large datasets with virtual scrolling
- ✅ Create accessible and responsive user interfaces
- ✅ Optimize applications for performance and memory usage
- ✅ Build Progressive Web Apps with modern browser features

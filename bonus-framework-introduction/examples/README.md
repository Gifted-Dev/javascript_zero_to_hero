# Bonus: Framework Introduction - Examples

This folder contains practical examples showing how to transition from vanilla JavaScript to modern frameworks like React and Vue.js, demonstrating how your existing JavaScript knowledge applies to these popular tools.

## 📂 Files Overview

- **`vanilla-to-react/`** - Step-by-step migration from vanilla JS to React
- **`vanilla-to-vue/`** - Step-by-step migration from vanilla JS to Vue.js
- **`framework-comparison/`** - Side-by-side comparisons of the same app in different frameworks
- **`migration-strategies/`** - Different approaches to migrating existing applications
- **`shared-logic/`** - Examples of framework-agnostic business logic
- **`getting-started/`** - Quick start templates for each framework

## 🚀 How to Use These Examples

### Prerequisites
```bash
# Node.js (version 16 or higher)
node --version

# Package managers
npm --version
# or
yarn --version

# Framework CLI tools (optional but recommended)
npx create-react-app --version
npm create vue@latest --version
```

### Getting Started
```bash
# Clone or navigate to the examples folder
cd bonus-framework-introduction/examples

# For React examples
cd vanilla-to-react
npm install
npm start

# For Vue examples
cd vanilla-to-vue
npm install
npm run dev

# For comparison examples
cd framework-comparison
# Follow individual README files in each subfolder
```

## 📚 What You'll Learn

### From `vanilla-to-react/`:
- Converting vanilla JavaScript components to React
- Understanding JSX and component-based architecture
- Managing state with React hooks
- Handling events in React
- Using React Context for global state
- Implementing routing with React Router
- Testing React components
- Performance optimization techniques

### From `vanilla-to-vue/`:
- Converting vanilla JavaScript to Vue components
- Understanding Vue templates and directives
- Managing reactivity with Vue's composition API
- Handling events and user interactions
- Using Pinia for state management
- Implementing routing with Vue Router
- Testing Vue components
- Progressive enhancement strategies

### From `framework-comparison/`:
- Same application built in vanilla JS, React, and Vue
- Comparing syntax and patterns across frameworks
- Understanding the trade-offs of each approach
- Performance comparisons and benchmarks
- Bundle size analysis
- Developer experience differences

### From `migration-strategies/`:
- Gradual migration approaches
- Micro-frontend integration
- Component-by-component migration
- Feature-by-feature migration
- Maintaining existing functionality during migration
- Risk mitigation strategies

### From `shared-logic/`:
- Framework-agnostic business logic
- Reusable utility functions
- API service layers
- Data validation and transformation
- State management patterns
- Testing strategies for shared code

## 🎯 Key Concepts Demonstrated

### 1. Component Architecture
```javascript
// Vanilla JavaScript
class TodoItem {
    constructor(todo, container) {
        this.todo = todo;
        this.container = container;
        this.render();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="todo-item">
                <span>${this.todo.text}</span>
                <button onclick="this.toggle()">Toggle</button>
            </div>
        `;
    }
}

// React
function TodoItem({ todo, onToggle }) {
    return (
        <div className="todo-item">
            <span>{todo.text}</span>
            <button onClick={() => onToggle(todo.id)}>Toggle</button>
        </div>
    );
}

// Vue.js
<template>
  <div class="todo-item">
    <span>{{ todo.text }}</span>
    <button @click="$emit('toggle', todo.id)">Toggle</button>
  </div>
</template>

<script setup>
defineProps(['todo'])
defineEmits(['toggle'])
</script>
```

### 2. State Management
```javascript
// Vanilla JavaScript
let todos = [];
function addTodo(text) {
    todos.push({ id: Date.now(), text, completed: false });
    renderTodos();
}

// React with Hooks
function useTodos() {
    const [todos, setTodos] = useState([]);
    
    const addTodo = useCallback((text) => {
        setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
    }, []);
    
    return { todos, addTodo };
}

// Vue with Composition API
function useTodos() {
    const todos = ref([]);
    
    const addTodo = (text) => {
        todos.value.push({ id: Date.now(), text, completed: false });
    };
    
    return { todos, addTodo };
}
```

### 3. Event Handling
```javascript
// Vanilla JavaScript
document.getElementById('add-btn').addEventListener('click', () => {
    const input = document.getElementById('todo-input');
    addTodo(input.value);
    input.value = '';
});

// React
function TodoInput({ onAdd }) {
    const [value, setValue] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            onAdd(value);
            setValue('');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add todo..."
            />
            <button type="submit">Add</button>
        </form>
    );
}

// Vue.js
<template>
  <form @submit.prevent="handleSubmit">
    <input 
      v-model="inputValue"
      placeholder="Add todo..."
    />
    <button type="submit">Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const emit = defineEmits(['add'])

const handleSubmit = () => {
    if (inputValue.value.trim()) {
        emit('add', inputValue.value)
        inputValue.value = ''
    }
}
</script>
```

### 4. Lifecycle Management
```javascript
// Vanilla JavaScript
class TodoApp {
    constructor() {
        this.init();
    }
    
    init() {
        this.loadTodos();
        this.setupEventListeners();
        this.render();
    }
    
    destroy() {
        this.removeEventListeners();
        this.cleanup();
    }
}

// React
function TodoApp() {
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        // Component mount
        loadTodos().then(setTodos);
        
        return () => {
            // Component unmount
            cleanup();
        };
    }, []);
    
    return <div>{/* JSX */}</div>;
}

// Vue.js
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const todos = ref([])

onMounted(async () => {
    todos.value = await loadTodos()
})

onUnmounted(() => {
    cleanup()
})
</script>
```

## 🔧 Development Tools and Setup

### React Development Environment
```javascript
// package.json for React project
{
  "name": "react-todo-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5"
  }
}

// React component structure
src/
├── components/
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   └── TodoInput.jsx
├── hooks/
│   ├── useTodos.js
│   └── useLocalStorage.js
├── context/
│   └── TodoContext.js
├── utils/
│   └── todoHelpers.js
├── App.jsx
└── index.js
```

### Vue Development Environment
```javascript
// package.json for Vue project
{
  "name": "vue-todo-app",
  "version": "1.0.0",
  "dependencies": {
    "vue": "^3.2.47",
    "vue-router": "^4.1.6",
    "pinia": "^2.0.32"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.0.0",
    "vite": "^4.1.0",
    "vitest": "^0.28.5",
    "@vue/test-utils": "^2.3.0"
  }
}

// Vue component structure
src/
├── components/
│   ├── TodoItem.vue
│   ├── TodoList.vue
│   └── TodoInput.vue
├── composables/
│   ├── useTodos.js
│   └── useLocalStorage.js
├── stores/
│   └── todos.js
├── utils/
│   └── todoHelpers.js
├── App.vue
└── main.js
```

## 🧪 Hands-On Exercises

### Exercise 1: Convert Vanilla Component to React
Take a vanilla JavaScript component and convert it to React:
```javascript
// Start with this vanilla component
class CounterComponent {
    constructor(container) {
        this.count = 0;
        this.container = container;
        this.render();
    }
    
    increment() {
        this.count++;
        this.render();
    }
    
    render() {
        this.container.innerHTML = `
            <div>
                <span>Count: ${this.count}</span>
                <button onclick="this.increment()">+</button>
            </div>
        `;
    }
}

// Convert to React functional component
// TODO: Implement React version
```

### Exercise 2: Convert Vanilla Component to Vue
Take the same vanilla component and convert it to Vue:
```vue
<!-- TODO: Implement Vue version -->
<template>
  <!-- Your template here -->
</template>

<script setup>
// Your script here
</script>
```

### Exercise 3: Compare Performance
Build the same application in vanilla JS, React, and Vue, then compare:
- Bundle size
- Runtime performance
- Memory usage
- Development time
- Maintainability

### Exercise 4: Migration Strategy
Plan and execute a migration strategy for a complex vanilla JS application:
1. Identify components for migration
2. Choose migration approach
3. Implement gradual migration
4. Maintain functionality during transition
5. Test and validate results

## 💡 Best Practices Demonstrated

### 1. **Component Design**
- Single responsibility principle
- Reusable and composable components
- Clear prop interfaces
- Proper event handling

### 2. **State Management**
- Local vs global state decisions
- Immutable state updates
- Predictable state flow
- Performance optimization

### 3. **Code Organization**
- Logical file structure
- Separation of concerns
- Reusable utilities
- Clear naming conventions

### 4. **Performance**
- Efficient rendering strategies
- Memory management
- Bundle optimization
- Lazy loading techniques

### 5. **Testing**
- Component testing strategies
- Integration testing approaches
- End-to-end testing setup
- Test-driven development

## 🎨 Framework-Specific Patterns

### React Patterns
- Higher-Order Components (HOCs)
- Render Props pattern
- Custom Hooks for logic reuse
- Context for dependency injection
- Error boundaries for error handling

### Vue Patterns
- Composables for logic reuse
- Provide/Inject for dependency injection
- Slots for content distribution
- Directives for DOM manipulation
- Plugins for global functionality

### Common Patterns
- Observer pattern for state management
- Factory pattern for component creation
- Strategy pattern for different implementations
- Command pattern for actions
- Facade pattern for API abstraction

## 🚀 Next Steps

After completing these examples, you'll be ready to:

1. **Choose the right framework** for your projects
2. **Migrate existing applications** to modern frameworks
3. **Build new applications** with confidence
4. **Apply best practices** from day one
5. **Continue learning** advanced framework concepts

### Recommended Learning Path
1. Complete all examples in order
2. Build a personal project in your chosen framework
3. Contribute to open source projects
4. Learn advanced patterns and tools
5. Share your knowledge with others

These examples provide a comprehensive foundation for transitioning from vanilla JavaScript to modern frameworks, ensuring you can apply your existing knowledge effectively while learning new paradigms and patterns.

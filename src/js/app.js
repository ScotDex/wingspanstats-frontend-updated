import { createApp } from 'vue'; // Import createApp from Vue 3
import store from './store'; // Vuex store
import router from './router'; // Vue Router

const app = createApp({
  // You can add components or options here if needed
});

app.use(store); // Register the Vuex store
app.use(router); // Register the Vue Router

app.mount('#vue-root'); // Mount the app to the DOM

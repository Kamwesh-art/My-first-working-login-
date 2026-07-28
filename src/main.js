/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from './plugins'

// Components
import App from './App.vue'

// Router
import router from './router'

// Styles
import 'unfonts.css'
import 'virtual:uno.css'
import './styles/main.scss'


const app = createApp(App)

registerPlugins(app)

// Register Vue Router
app.use(router)

app.mount('#app')

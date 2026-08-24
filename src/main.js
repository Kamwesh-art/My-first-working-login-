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

//toaster
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

// Styles
import 'unfonts.css'
import 'virtual:uno.css'
import './styles/main.scss'

const app = createApp(App)

// Toaster
registerPlugins(app)

// Register Vue Router
app.use(router)

app.use(Toast, {
    position: "top-right",
    timeout: 3000,
})

app.mount("#app")




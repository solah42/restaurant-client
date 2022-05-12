import { createApp } from 'vue'
import App from './App.vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDDDfEP6_9H4zuBDD7x4yrrWVwMaPuCmr4',
        libraries: 'places',
    },
}).mount('#app')
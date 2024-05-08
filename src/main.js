import { createPinia } from 'pinia';
import { createApp } from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import 'vuetify/styles';
import './style.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(vuetify);

app.mount('#app');
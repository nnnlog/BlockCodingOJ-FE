import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App).use(store).use(router);
['field', 'block', 'category', 'xml', 'mutation', 'value', 'sep'].forEach(str => app.component(str));
//app.config.isCustomElement = tag => ['field','block','category','xml','mutation','value','sep'].includes(tag);
app.mount('#app');

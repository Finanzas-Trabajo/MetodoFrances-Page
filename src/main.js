import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config";
import router from "@/router";

import MultiSelect from 'primevue/multiselect';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';


const app= createApp(App);

app.use(PrimeVue);
app.use(router);

app.component('MultiSelect', MultiSelect);
app.component('InputNumber', InputNumber);
app.component('Dropdown', Dropdown);
app.component('Button', Button);

app.mount('#app')

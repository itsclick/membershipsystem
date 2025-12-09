import './bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import Swal from 'sweetalert2';


import { Bootstrap5Pagination } from 'laravel-vue-pagination';





// Initialize Vue app first
const app = createApp(App);







// SweetAlert setup
window.Swal = Swal;
const toast = Swal.mixin({
   toast: true,
   position: 'top-end', // corrected spelling from 'centre-top'
   showConfirmButton: false,
   timer: 3000,
   timerProgressBar: true,
});
window.toast = toast;

// Register pagination component
app.component('Pagination', Bootstrap5Pagination);

// Use router and Pinia
app.use(router);
app.use(createPinia());

// Mount the app
app.mount('#app');

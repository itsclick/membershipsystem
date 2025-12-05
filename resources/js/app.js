import './bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

import '../css/app.min.css';
import '../css/bootstrap.min.css';
import '../css/custom.css';
import '../css/icons.min.css';
import '../css/menu.css';
import '../css/shortcode-demo.css';
import '../css/style.css';
import '../css/theme-blog.css';
import '../css/theme-elements.css';
import '../css/theme-shop.css';
import '../css/theme.css';
import '../css/vendors.min.css';
import '../css/jsvectormap.min.css';
import '../css/skin-church.css';

import '../js/custome_js/app.js';
import '../js/custome_js/vendors.min';
import '../js/custome_js/config';

// Initialize Vue app first
const app = createApp(App);


// Add icon to library
library.add(faMoon);
// Register the component globally
app.component('font-awesome-icon', FontAwesomeIcon);



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

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './styles/global.css';

import loginTemplate from './pages/login/login.html?raw';
import './pages/login/login.css';
import './pages/login/login.js';

document.querySelector('#app').innerHTML = loginTemplate;

console.log('TaskFlow Frontend Started');
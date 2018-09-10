// Global app controller
import str from './models/Search';

// import {add, multiply, ID} from './views/searchView';
import * as searchView from './views/searchView';

console.log(`Using imported functions! Add ${searchView.ID} and 2: ${searchView.add(searchView.ID, 2)}`);
console.log(`Using imported functions! Multiply 12 and 2: ${searchView.multiply(12, 2)}`);
console.log(`Using imported default! ${str}`);
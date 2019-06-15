// Global app controller
import str from './views/searchViews';

//import {add, multiply, ID} from './models/Search';

import * as searchView from './models/Search';

console.log(`Using imported function ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)}. ${str}`);

import {createStore} from 'redux';
import reducers from './reducers/main';
const store = createStore(reducers);
export default store;

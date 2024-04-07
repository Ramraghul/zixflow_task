// Required Package Import;
import { combineReducers } from 'redux';
import contactReducer from './reducer';

//CombineReducers
const rootReducer = combineReducers({
    contact: contactReducer,
});

//RootReducer Export;
export default rootReducer;

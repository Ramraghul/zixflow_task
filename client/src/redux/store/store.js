// Required Package Import;
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';


// Store Configuration;
export default configureStore({
    reducer: rootReducer,
});

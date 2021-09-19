import {combineReducers} from "redux";
import orderedBooksReducer from './orderedBooksReducer';

const reducers = combineReducers({
    books:orderedBooksReducer
})

export default reducers;
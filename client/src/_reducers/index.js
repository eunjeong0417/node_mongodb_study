import { combineReducers } from "redux";
//combineReducers로 다양한 reducers를 하나로
//합쳐준다

import user from './user_reducer';

const rootReducer = combineReducers({
    user
})

export default rootReducer;
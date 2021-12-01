import {combineReducers, createStore} from "redux";
import {isAuthReducer, userReducer} from "./authReducer";
import {isLoadingReducer} from "./isLoadingReducer";


const rootReducer = combineReducers({
     auth: isAuthReducer,
     user: userReducer,
     isLoading: isLoadingReducer,
})

export const store = createStore(rootReducer)
import {combineReducers, createStore} from "redux";
import {isAuthReducer} from "./authReducer";
import {userReducer} from "./userReducer";
import {isLoadingReducer} from "./isLoadingReducer";


const rootReducer = combineReducers({
     auth: isAuthReducer,
     user: userReducer,
     isLoading: isLoadingReducer,
})

export const store = createStore(rootReducer)
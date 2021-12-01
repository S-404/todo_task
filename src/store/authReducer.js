const authState = {
    isAuth: false
}

const userState = {
    userid: '',
}

export const isAuthReducer = (state = authState, action)=>{
    switch (action.type){
        case "SET_AUTH":
            return {...state, isAuth: action.value}
        default:
            return state
    }
}

export const userReducer = (state = userState, action)=>{
    switch (action.type){
        case "SET_USERID":
            return {...state, userid: action.value}
        default:
            return state
    }
}
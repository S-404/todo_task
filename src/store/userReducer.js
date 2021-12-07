const userState = {
    userid: '',
    isAdmin: false,
}

export const userReducer = (state = userState, action)=>{
    switch (action.type){
        case "SET_USERID":
            return {...state, userid: action.value}
        case "SET_ADMIN_ROLE":
            return {...state, isAdmin: action.value}
        default:
            return state
    }
}

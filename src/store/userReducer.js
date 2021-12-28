const userState = {
    userid: '',
    isAdmin: false,
    selectedUG: 0,
}

export const userReducer = (state = userState, action)=>{
    switch (action.type){
        case "SET_USERID":
            return {...state, userid: action.value}
        case "SET_ADMIN_ROLE":
            return {...state, isAdmin: action.value}
        case "SET_SELECTED_UG":
            return {...state, selectedUG: action.value}
        default:
            return state
    }
}

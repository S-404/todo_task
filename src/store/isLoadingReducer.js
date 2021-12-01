const isLoadingState = {
    isLoading: false
}

export const isLoadingReducer = (state = isLoadingState,action)=>{
    switch (action.type){
        case "SET_isLoading":
            return {...state, isLoading: action.value}
        default:
            return state
    }
}
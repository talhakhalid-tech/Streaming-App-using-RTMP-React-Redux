//to initialize the state 
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
}

//Reducer to change state whether the user is signed in or not by seeing action by which it is called
export default (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case 'SIGN_IN':
            return {...state,isSignedIn: true,userId: action.payload}
        case 'SIGN_OUT':
            return {...state,isSignedIn: false,userId: null}
        default:
            return state
    }
}
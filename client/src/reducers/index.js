import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import {reducer as formReducer} from 'redux-form'
import streamReducer from './streamReducer'



export default combineReducers({
    Auth: AuthReducer,
    //wiring up form reducer from redux-form library to our store
    form: formReducer,
    streams: streamReducer
});
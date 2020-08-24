import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers/index';
import reduxThunk from 'redux-thunk'

//wiring up redux debug tool extension to our project
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)))
ReactDOM.render(
<Provider store ={store}>
    <App/>
</Provider>
,document.querySelector('#root'))
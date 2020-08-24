import React,{Component} from 'react'
import {Router,Route,Switch} from 'react-router-dom'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import Header from './Header'
import history from '../history'


class App extends Component{
    render(){
        return(
            <div className='ui container'>
                {/* passing our own created history as prop so default history will not be created by Router 
                instead will use our history component */}
                <Router history={history}>
                    <div>
                        <Header/>
                        {/*  */}
                        <Switch>
                            {/* These are routes set up for all pages */}
                            {/* component to show which component it will render for the given route */}
                            <Route path='/' exact component={StreamList}/>
                            <Route path='/streams/create' exact component={StreamCreate}/>
                            {/* :id in the path means that this is a param to be passed to that path which is variable
                                or this is also called wildcard*/}
                            <Route path='/streams/delete/:id' exact component={StreamDelete}/>
                            <Route path='/streams/edit/:id' exact component={StreamEdit}/>
                            <Route path='/streams/:id' exact component={StreamShow}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
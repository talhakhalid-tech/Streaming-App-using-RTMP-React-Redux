import React,{Component} from 'react'
import {connect } from 'react-redux'
import {signIn,signOut} from '../actions/index'


class GoogleAuth extends Component{


    componentDidMount(){
        //loading auth2 on google API
        window.gapi.load('client:auth2', () =>{
            //intializing clientID when the google api loads up by calling callback function
            window.gapi.client.init({
                clientId: '119752710701-i6f13a4hi3513uara4i29letmuhr3t46.apps.googleusercontent.com',
                scope: 'email'
                
            })
            //function to be executed after we get access to google API by our clientID
            .then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    //Funtion to Change state in redux store whether the user is signed in or not
    onAuthChange = (isSignedIn) =>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else{
            this.props.signOut()
        }
    }

    //function to be executed when user wants to sign out by clicking on sign out button
    onSignOutClick = () =>{
        this.auth.signOut();
    }

    //function to be executed when user wants to sign in by clicking sign in with google button
    onSignInClick = () =>{
        this.auth.signIn();
    }

    renderAuthButton(){
        //condition to be executed when we don't know state of user whether signed in or not
        if(this.props.isSignedIn === null){
            return null
        }
        //conditon to be executed if user is signed in and allowing him to sign out
        else if(this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className='ui red google button'>
                    <i className='google icon'/>
                    Sign out
                </button>
            );
        }
        //condition to be executed if user is not signed in and allowing him to sign in with google
        return (
                <button onClick={this.onSignInClick} className='ui red google button'>
                    <i className='google icon'/>
                    Sign In with Google
                </button>
        );
    }

    render(){
        return(
        <div className='item'>{this.renderAuthButton()}</div>
        );
    }
}

//object to be passed as props to GoogleAuth component
const mapStateToProps = (state) =>{
    return {isSignedIn: state.Auth.isSignedIn}
}

//wiring up actions to GoogleAuth component by using connect and accessing state from redux store by calling mapStateToProps function
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth)
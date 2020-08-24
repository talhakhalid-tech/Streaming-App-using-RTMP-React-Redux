import React,{Component} from 'react'
import {connect} from 'react-redux'
import {createStream} from '../../actions/index'
import StreamForm from './StreamForm'

class StreamCreate extends Component{


    //function get called when the user submit the form.......formValues argument contains all input data of form
    onFormSubmit = (formValues) => {
        //calling action creator createStream
        this.props.createStream(formValues)
    }

    render(){
        return (
            <div>
                <h2>Create a Stream</h2>
                {/* passing onSubmit event handler as props */}
                <StreamForm onSubmit={this.onFormSubmit}/>
            </div>
        );
    }
};


//wiring up connect and redux-form to component and wiring up action creator "createStream"
export default connect(null,{createStream})(StreamCreate);
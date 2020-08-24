 import React,{Component} from 'react'
 import _ from 'lodash'
import {connect} from 'react-redux'
import {fetchStream,updateStream} from '../../actions/index'
import StreamForm from './StreamForm';

class StreamEdit extends Component{

    //calling action creator to fetch single stream
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    onFormSubmit = (formValues) =>{
        //calling updateStream action creator
        this.props.updateStream(this.props.match.params.id,formValues)
    }

    render(){
        if(this.props.stream){
            return (
                <div>
                    <h2>Edit a Stream</h2>
                    <StreamForm 
                    //passing initial values to streamform component
                        initialValues={_.pick(this.props.stream,'title','description')}
                        //passing onsubmit callback
                        onSubmit={this.onFormSubmit}/>
                </div>
            );
        }
        return <div>Loading</div>
    }
}

const mapStateToProps = (state,ownProps) =>{
    //passing stream as prop which is to be edited
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream: fetchStream,updateStream: updateStream})(StreamEdit);
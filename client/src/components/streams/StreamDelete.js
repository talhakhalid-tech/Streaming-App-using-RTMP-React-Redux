import React from 'react'
import Modal from '../modal'
import history from '../../history'
import {connect} from 'react-redux'
import {fetchStream,deleteStream} from '../../actions/index'
import {Link} from 'react-router-dom'

class StreamDelete extends React.Component{
    
    //function to fetch single stream
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    //method to be called when user click on delete button in modal
    onDeleteClick = () =>{
        this.props.deleteStream(this.props.match.params.id)
    }

    
    //method to render action buttons to show on modal
    renderAction = () => {
        return (
            //actions(buttons div) to be passed to modal
            <React.Fragment>
                <button onClick={this.onDeleteClick} className="ui red button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    //method to show content to show on modal conditionaly
    renderContent(){
        if(this.props.stream){
            return `Are you sure You want to delete stream with title "${this.props.stream.title}" ?`
        }
        return 'Loading....'
    }

    render(){
            {/* Modal component to return which is a portal to index.html  */}
            return (
                <Modal
                    title='Delete Stream'
                    content= {this.renderContent()}
                    actions={this.renderAction()}
                    onDismiss = {()=>history.push('/')}
                />
            );
    }
    
}
const mapStateToProps = (state,ownProps) =>{
    //passing stream as prop which is to be edited
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream: fetchStream,deleteStream: deleteStream})(StreamDelete);
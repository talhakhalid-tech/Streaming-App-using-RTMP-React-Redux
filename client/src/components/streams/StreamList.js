import React,{Component} from 'react'
import {connect} from 'react-redux'
import {fetchStreams} from '../../actions/index'
import {Link} from 'react-router-dom'

class StreamList extends Component{

    //function to show administrative button if user who created current stream is logged in
    renderAdmin(userId,id){
        if(this.props.currentUserId === userId){
            const editLink = `/streams/edit/${id}`
            const deleteLink = `/streams/delete/${id}`
            return (
                <div className='right floated content'>
                    <Link to={editLink} className='ui button primary'>Edit</Link>
                    <Link to={deleteLink} className='ui button negative'>Delete</Link>
                </div>
            );
        }
    }

    //function to show create stream button when the user is logged in
    renderCreate(){
        if(this.props.isUserSignedIn){
            return(
                <div style={{textAlign: 'right'}}>
                    {/* To create link to route createStream */}
                    <Link to='/streams/create' className='ui button primary'>
                        Create Stream
                    </Link>
                </div>
            )
        }
    }


    //function to map over the array and for each object making an item of stream for streams list
    renderList(){
        return (this.props.streams.map(stream => {
            return(
            <div className='item' key={stream.id}>
            {/* calling renderAdmin function to whether show the administrative buttons or not */}
            {this.renderAdmin(stream.userId,stream.id)}
                <i className='large middle aligned icon camera'/>
                <div className='content'>
                    {/* creating navigation allowing user to click on stream title to show that stream */}
                    <Link to={`/streams/${stream.id}`} className='header'>{stream.title}</Link>
                    <div className='description'>
                        {stream.description}
                    </div>
                </div>
            </div>
                )
        })
        )
    }

    componentDidMount(){
            //calling action creator
            this.props.fetchStreams()
    }

    render(){
        return (
            <div>
                <h2>Streams</h2>
                <div className='ui celled list'>
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
    );
    }
}

//taking state from redux store and pass it to component as props
const mapStateToProps =(state) =>{
    //converting object of objects into array of objects
    return {
        streams: Object.values(state.streams),
        currentUserId: state.Auth.userId,
        isUserSignedIn: state.Auth.isSignedIn
    }
}

export default connect(mapStateToProps,{fetchStreams: fetchStreams})(StreamList);
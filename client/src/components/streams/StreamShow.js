import React,{Component} from 'react'
import {connect} from 'react-redux'
import {fetchStream} from '../../actions/index'
import FlvJs from 'flv.js';

class StreamShow extends Component{

    //constructor function to use refs
    constructor(props){
        super(props);
        //creating the reference to original DOM element in browser of video
        this.videoRef = React.createRef()
    }

    //calling action creator to fetch single stream
    componentDidMount(){
        const {id}=this.props.match.params
        this.props.fetchStream(id)
        //calling buildPlayer method
        this.buildPlayer()
    }

    //creating this method as componentDidMount will be rendered only one time 
    //so every time we need to call buildPlayer method
    componentDidUpdate(){
        this.buildPlayer()
    }

    //this component will be called when user navigate back from this route or component
    componentWillUnmount(){
        //destroying the player
         this.player.destroy()
    }

    buildPlayer(){
        if(this.player || !this.props.stream)
        {
            return;
        }
        //All this from node-media-server documentation
        //creating player using flv on our browsing server and assigning it to this.player
        this.player = FlvJs.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
        })
        //attaching our video tag to this player
        this.player.attachMediaElement(this.videoRef.current)
        //loading this player to our tag means browser
        this.player.load()
    }

    render(){
        if(this.props.stream){
            return(
                <div>
                {/* creating video tag and passing ref as prop with value of this.videoRef */}
                <video ref={this.videoRef } style={{width: '100%'}} controls />
                    <h1>{this.props.stream.title}</h1>
                    <h5>{this.props.stream.description}</h5>
                </div>
            );
        }
        return <div>Loading...</div>
    }
}

const mapStateToProps = (state,ownProps) =>{
    //passing stream as prop which is to be edited
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream: fetchStream})(StreamShow);
import streams from '../APIs/streams'
import history from '../history'

//Action creater which returns an action to change state in redux store to the user is signed in now
export const signIn = (userId) =>{
    //action
    return{
        type:'SIGN_IN',
        payload: userId
    }
}

//action creater which returns an action to change state in redux store to user is signed out now
export const signOut = () =>{
    //action
    return{
        type:'SIGN_OUT'
    }
}

//action creater which uses middleware to make a post request to our api to create a stream
export const createStream = formValues => async (dispatch,getState) =>{

    //destructuring out userId from Auth by using getState funtion which allows to access state of redux store
    const {userId} = getState().Auth
    //axios post method to post formValues and userId recieved to it as arguments to streams in db.json
    const response = await streams.post('/streams',{...formValues,userId})
    //action to be dispatch when the post request was made
    dispatch({
        type: 'CREATE_STREAM',
        //payload contains the stream just posted
        payload: response.data
    });

    //doing programmatic navigation to home directory when we get response back from API 
    history.push('/')
}

//action creator which uses middleware to make get request to our api to get the list of all streams
export const fetchStreams = () => async dispatch =>{
    //axios get method to get all streams from streams in db.json
    const response = await streams.get('/streams')
    //action to be dispatch when get request was made
    dispatch({
        type: 'FETCH_STREAMS',
        //payload contains the streams fetched
        payload: response.data
    })
}

//action creator which uses middleware to make get request to our api to get a single stream using stream ID
export const fetchStream = (id) =>async dispatch =>{
    //axios get method to get one stream from streams in db.json by using stream ID
    const response = await streams.get(`/streams/${id}`)
    //action to be dispatch when get request was made
    dispatch({
        type: 'FETCH_STREAM',
        //payload contains the single stream fetched
        payload: response.data
    })
}

//action creator which uses middleware to make a put request to our api to update stream using stream ID and values it get as argument
export const updateStream = (id,formValues) => async dispatch =>{
    //axios put method to update particular stream by using ID with formValues in db.json
    const response = await streams.patch(`/streams/${id}`,formValues)
    //action to be dispatch when get request was made
    dispatch({
        type: 'UPDATE_STREAM',
        //payload contains the new updated stream
        payload: response.data
    })
    history.push('/')
}

//action creator which uses middleware to make a delete request to our api to delete stream using its ID
export const deleteStream = (id) => async dispatch =>{
    //axios delete method to delete particular stream by using ID in db.json
    await streams.delete(`/streams/${id}`)
    //action to be dispatch when get request was made
    dispatch({
        type: 'DELETE_STREAM',
        payload: id
    })
    history.push('/')
}
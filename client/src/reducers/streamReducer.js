import _ from 'lodash'

export default (state ={},action) => {
    switch(action.type){
        //when fetching all streams from api
        case 'FETCH_STREAMS':
            //will create a new object from the huge object returned by _.mapKeys funtion with key value pairs 
            return {...state,..._.mapKeys(action.payload,'id')}

        //first three are identical because all are returning a single stream(object)
        //when fetching single stream 
        case 'FETCH_STREAM':
            return {...state,[action.payload.id]: action.payload}

        //when creating a stream
        case 'CREATE_STREAM':
            return {...state,[action.payload.id]: action.payload}

        //when updating a stream
        case 'UPDATE_STREAM':
            return {...state,[action.payload.id]: action.payload}

        //when deleting a stream using _.omit funtion
        case 'DELETE_STREAM':
            return _.omit(state,action.payload)

        //default case when reducer runs first time
        default:
            return state
    }
}
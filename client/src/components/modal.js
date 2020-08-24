import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props =>{

    //creating a portal using createPortal() function
    return ReactDOM.createPortal(
        //first argument which is jsx to be return like in simple components
        //event handler to call when user clicks outside the modal
        //this event handler will programmaticaly navigate us to homepage
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            {/* this event handler will stop this div to propagate to parent div event handler */}
            <div onClick={(e) =>{e.stopPropagation()}} className="ui standard modal visible active">
                <div className="header">
                    {props.title}
                </div>
                <div className="content">
                    <p>
                        {props.content}
                    </p>
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        //place at which we want our portal component to be render
        document.querySelector("#modal")
    )

}

export default Modal;
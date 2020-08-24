import React,{Component} from 'react'
import {Field,reduxForm} from 'redux-form'

class StreamForm extends Component{

    //to show error if user do not input values
    renderError({error,touched}){
        if(touched && error){
            return (
                <div className='ui error message'>
                    <div className='header'>
                        {error}
                    </div>
                </div>
            )
        }
    }

    //function to show input fields
    renderInput=({input,label,meta})=>{
        const className =`field ${meta.error && meta.touched ? 'error':''}`
        return(
            //input field and adding up all properties of redux-form to it
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        );
    }

    //function get called when the user submit the form.......formValues argument contains all input data of form
    onFormSubmit = (formValues) => {
        //calling onSubmit funtion passed to it as prop
        this.props.onSubmit(formValues)
    }

    render(){
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onFormSubmit)} className='ui form error'>
                    {/* redux-form field component*/}
                    <Field name='title' component={this.renderInput} label='Enter Title'/>
                    <br/>
                    <Field name='description' component={this.renderInput} label='Enter Description'/>
                    <button className='ui primary button'>Submit</button>
                </form>
            </div>
        );
    }
};

//funtion to validate values entered by user
const validate = (formValues) =>{
    const errors ={}
    if(!formValues.title){
        //condition to be run if user do not enter title
        errors.title='You Must Enter The Title'
    }
    if(!formValues.description){
        //condition to be run if user do not enter description
        errors.description='You Must Enter The Description'
    }
    return errors
}

//wiring up redux-form to component and wiring up action creator "createStream"
export default reduxForm({
    //wiring up form createstream
    form: 'StreamForm',
    //wiring up validator
    validate: validate})(StreamForm);
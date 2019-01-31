import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    state = { status: true };

    renderError({ error, touched }) {
        if (touched && error) {
            this.setState({ status: true});
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        } else {
            this.setState({ status: false});
        }
    }

    renderInput = ({input, label, meta}) => { 

        //necessary to change this to arrow function because this in this.renderError is undefined 

        const className = `field ${meta.error && meta.touched ? 'error': ''}`;

        return (
            // <input onChange={formProps.input.onChange} value={formProps.input.value}/>
            //The above is exactly the same as below

            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>            
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button disabled={this.state.status} className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validatefunction = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate: validatefunction
})(StreamForm);

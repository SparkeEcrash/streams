import React from 'react';
import { connect } from 'react-redux';
import {signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({   //returns a promise
                clientId: '942330419080-dpu26rk6khavkdj03mqilflnc5rn15lq.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange);     
                //this sets up a listener that checks for onAuthChange being invoked
                //this listener function is set up by google API to detect changes in the auth.isSignedIn object  
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })   
        //anytime this.auth.isSignedIn.get() value changes *from signing in or signing out* 
        //the listen function attached to 'auth.isSignedIn' invokes the onAuthChange function,
        //setting up a new state and re-rendering
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if(this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default connect(null, {signIn, signOut})(GoogleAuth);
import React from 'react';
import { connect } from 'react-redux';
import {signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({   //returns a promise
                clientId: '942330419080-dpu26rk6khavkdj03mqilflnc5rn15lq.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange( this.auth.isSignedIn.get() )
                this.auth.isSignedIn.listen(this.onAuthChange);     
                //this sets up a listener that checks for onAuthChange being invoked
                //this listener function is set up by google API to detect changes in the auth.isSignedIn object  
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {   //check the status of signed in by seeing if 'isSignedIn' state is true or false after componentDidMount() runs and state
                            // is set with 'this.setState({ isSignedIn: this.auth.issignedIn.get() })
            this.props.signIn(this.auth.currentUser.get().getId());    //update the state in redux store to 'signed in'
        } else {
            this.props.signOut();   //update the state in redux store to 'signed out'
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
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

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
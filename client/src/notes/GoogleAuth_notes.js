import React from 'react';

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
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })   
        //anytime this.auth.isSignedIn.get() value changes *from signing in or signing out* 
        //onAuthChange function get invoked, setting up a new state and re-rendering
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div>I don't know if we are signed in</div>
        } else if(this.state.isSignedIn) {
            return <div>I am signed in!</div>
        } else {
            return <div>I am not signed in</div>
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }
    
    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <h3>Edit a Stream</h3>
                    <StreamForm
                        // initialValues={{ title: 'EDIT ME', description: 'CHANGE ME TOO'}}
                        //second set of {} is indicating that we are creating an object
                        initialValues={_.pick(this.props.stream, 'title', 'description')}
                        //this.props.stream
                        //{title: "***", description: "***", userId: "***", id: "***", }
                        onSubmit={this.onSubmit}/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);


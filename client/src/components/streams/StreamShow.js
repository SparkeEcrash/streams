import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        } else {
            const { id } = this.props.match.params;
            this.player = flv.createPlayer({
                type: 'flv',
                url: `http://localhost:8000/live/${id}.flv`
            });
            this.player.attachMediaElement(this.videoRef.current);
            //buildPlayer() is necessary because if this runs in componentdidmount this.videoRef does not exist because only <div>Loading...</div> is returned in render since this.props.stream is undefined
            this.player.load();
            this.player.play();
        }
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls={true} />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
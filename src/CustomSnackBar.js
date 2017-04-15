import React from 'react';
import {Snackbar} from 'react-mdl';

class CustomSnackBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: undefined
        }
    }

    showSnackbar = (message) => {
        if (this.state.message) {
            setTimeout(() => {
                this.setState({open: true, message: message});
            }, 2500)
        } else {
            this.setState({open: true, message: message});
        }
    };

    handleTimeoutSnackbar = () => {
        this.setState({open: false, message: undefined});
    }

    render() {
        const {open, message} = this.state;
        return (
            <Snackbar active={open} onTimeout={this.handleTimeoutSnackbar}>{message}</Snackbar>
        )
    }
}

export default CustomSnackBar;

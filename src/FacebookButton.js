/**
 * Created by gomes on 01/04/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './FacebookButton.css';

class FacebookButton extends Component {
    static propTypes = {
        className: PropTypes.string,
        text: PropTypes.string,
        style: PropTypes.object,
        onTouchTap: PropTypes.func
    };

    static defaultProps = {
        style: {},
        text: "Facebook",
        className: ""
    };

    static defaultStyle = {
        button: {},
        icon: {},
        text: {}
    };

    static defaultClassName = " facebook-button ";

    render() {
        const {className, style, text, onTouchTap} = this.props;
        let mergedStyle = Object.assign(style, FacebookButton.defaultStyle);
        let mergedClassName = className.concat(FacebookButton.defaultClassName).trim();
        return (
            <button className={mergedClassName} style={mergedStyle.button} type="submit" onClick={onTouchTap}>
                <i style={mergedStyle.icon} className="fa fa-facebook-square icon" aria-hidden="true"></i>
                <span className="text" style={mergedStyle.text}>{text}</span>
            </button>
        )
    }
}

export default FacebookButton;

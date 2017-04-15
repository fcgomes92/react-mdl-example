/**
 * Created by gomes on 01/04/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './SelectableList.css';

class SelectableList extends Component {
    static propTypes = {
        listWrapper: PropTypes.func.isRequired,
        className: PropTypes.string,
        childrenClassName: PropTypes.string,
        selectedClassName: PropTypes.string,
        onSelectItem: PropTypes.func,
        extraReturn: PropTypes.string,
        forceSelected: PropTypes.number,
        selected: PropTypes.number,
        children: PropTypes.array
    };

    static defaultProps = {
        extraReturn: undefined,
        forceSelected: undefined,
        className: 'selectable-list',
        childrenClassName: 'selectable-list-item',
        selectedClassName: 'selected'
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }

    onSelectItem = (selected, extra) => {
        let newSelected = this.props.forceSelected
            ? this.props.forceSelected
            : parseInt(selected.split("-")[1], 10);
        this.setState({
            selected: newSelected
        }, () => {
            if (this.props.onSelectItem)
                this.props.onSelectItem(newSelected, extra)
        })
    };

    modifyChildren = (child, index) => {
        const {childrenClassName, selectedClassName, extraReturn} = this.props;
        const {selected} = this.state;

        let extraClasses = index === selected
            ? `${childrenClassName} ${selectedClassName}`
            : childrenClassName;

        let key = `selectableListKey-${index}`;
        const className = classNames(child.props.className, extraClasses);

        const extra = extraReturn
            ? child.props[extraReturn]
            : {};

        const props = Object.assign({}, child.props, {
            className,
            key,
            onClick: (e) => {
                this.onSelectItem(key, extra)
            }
        },)

        return React.cloneElement(child, props);
    };

    render() {
        const {listWrapper} = this.props;
        return listWrapper({
            className: this.props.className,
            children: this.props.children.map(this.modifyChildren)
        });
    }
}

export default SelectableList;

import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import emitter from './events';


class ListItem extends Component {
    static defaultProps = { checked: false, };
    constructor(props) { super(props); }
    render() { return (<li>  <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange} />     <span>{this.props.value}</span>   </li>); }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = { list: this.props.list.map(entry => ({ text: entry.text, checked: entry.checked || false, })), };

        // const newCart = _.cloneDeep(this.state);
    }
    onItemChange(entry) {
        const { list } = this.state;
        this.setState({ list: list.map(prevEntry => ({ text: prevEntry.text, checked: prevEntry.text === entry.text ? !prevEntry.checked : prevEntry.checked, })) });
        emitter.emit('ItemChange', entry);
    }
    render() { return (<div>  <ul>    {this.state.list.map((entry, index) => (<ListItem key={`list-${index}`} value={entry.text} checked={entry.checked} onChange={this.onItemChange.bind(this, entry)} />))}  </ul>   </div>); }
}

export default List;

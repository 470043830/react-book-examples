import React, { Component } from 'react';
import MyContainer from './simplecom-container';

class SimpleCom extends Component {
    render() {
        console.log('SimpleCom this.props: ', this.props);
        return <input name="name" {...this.props.name111} />;
    }
}

export default MyContainer(SimpleCom);

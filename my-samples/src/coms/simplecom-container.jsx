import React, { Component } from 'react';

const MyContainer = (WrappedComponent) => {
    class MyContainerIndex extends Component {
        constructor(props) {
            super(props); this.state = { name: '注入的名字', };
            this.onNameChange = this.onNameChange.bind(this);
        }
        onNameChange(event) {
            console.log('onNameChange: ', event.target.value);
            this.setState({ name: event.target.value, });
        }
        render() {
            const newProps = { name111: { value: this.state.name, onChange: this.onNameChange, dasdasd: 1111111111 }, };

            console.log('this.props: ', this.props);
            console.log('newProps: ', newProps);
            return <WrappedComponent {...this.props} {...newProps} />;
        }
    }
    return MyContainerIndex;
};

export default MyContainer;

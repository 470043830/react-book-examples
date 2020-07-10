import React, { Component } from 'react';

class InputText extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this); this.handleTextareaChange = this.handleTextareaChange.bind(this);
        this.state = { inputValue: '', textareaValue: '', };
    }

    handleInputChange(e) {
        // this.setState({ inputValue: e.target.value, });
        this.setState({ inputValue: e.target.value.substring(0, 140).toUpperCase(), });
    }

    handleTextareaChange(e) {
        this.setState({ textareaValue: e.target.value, });
    }

    render() {
        const { inputValue, textareaValue } = this.state;

        console.log('InputText render...', inputValue, textareaValue);
        return (
            <div>
                <p>单行输入框：<input className='test-input-001' type="text" value={inputValue} onChange={this.handleInputChange} /></p>
                <p>多行输入框：<textarea value={textareaValue} onChange={this.handleTextareaChange} /></p>
                <p>单行输入框：<input type="text" /></p>
            </div>
        );
    }
}

export default InputText;

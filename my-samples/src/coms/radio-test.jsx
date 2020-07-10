import React, { Component } from 'react';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { radioValue: '', };
    }

    handleChange(e) {
        this.setState({ radioValue: e.target.value, });
    }

    render() {
        const { radioValue } = this.state;
        return (
            <div>
                <p>gender:</p>
                <label>
                    male:
                    <input type="radio" value="male" checked={radioValue === 'male'} onChange={(e) => this.handleChange(e)} />
                </label>
                <label>
                    female:
                    <input type="radio" value="female" checked={radioValue === 'female'} onChange={(e) => this.handleChange(e)} />
                </label>
            </div>);
    }
}


export default Index;

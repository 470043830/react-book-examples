import React, { Component } from 'react';
class Index extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        // this.state = { area: ['beijing', 'shanghai'], };
        this.state = { area: '', };
    }
    handleChange(e) {
        const { options } = e.target;

        console.log('options: ', options);
        this.setState({ area: e.target.value, });

        // 注意，这里返回的 options 是一个对象，并非数组
        // const area = Object.keys(options).filter(i => options[i].selected === true).map(i => options[i].value);
        // console.log('area: ', area);
        // this.setState({ area, });
    }
    render() {
        const { area } = this.state;
        return (
            <select className='test-select-001' multiple={false} value={area} onChange={this.handleChange}>
                <option value="beijing">北京</option>
                <option value="shanghai">上海</option>
                <option value="hangzhou">杭州</option>
            </select>);
    }
}

export default Index;

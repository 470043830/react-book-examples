import React, { Component } from 'react';


class App extends Component {
    clicka = () =>{

    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>欢迎来到菜鸟教程</h2>
                </div>
                <p className="App-intro" onClick={this.clicka}>
                    你可以在 <code>src/App.js</code> 文件中修改。
                </p>
            </div>
        );
    }
}

export default App;

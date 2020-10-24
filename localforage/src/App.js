import React from 'react';
import localforage from 'localforage';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    localforageExample() {
        localforage.setItem('somekey', 'some value').then(function (value) {
            // 当值被存储后，可执行其他操作
            console.log('localforage setItem: ', value);
        }).catch(function (err) {
            // 当出错时，此处代码运行
            console.log('localforage setItem: ', err);
        });

        // 不同于 localStorage，你可以存储非字符串类型
        localforage.setItem('my array', [1, 2, 'three', { v1: '777' }]).then(function (value) {
            // 如下输出 `1`
            console.log(value[0]);
        }).catch(function (err) {
            // 当出错时，此处代码运行
            console.log(err);
        });

        localforage.getItem('somekey').then(function (value) {
            // 当离线仓库中的值被载入时，此处代码运行
            console.log('localforage getItem: ', value);
        }).catch(function (err) {
            // 当出错时，此处代码运行
            console.log('localforage getItem: ', err);
        });

        // 回调版本：
        localforage.getItem('my array', function (err, value) {
            // 当离线仓库中的值被载入时，此处代码运行
            console.log('localforage getItem: ', value, value instanceof Array);
        });
    }

    onbtn1 = () => {
        console.log('onbtn1...');
        this.localforageExample();
    }

    onbtn2 = () => {
        console.log('onbtn2...')
    }

    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Edit <code>src/App.js</code> and save to reload.</p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Learn React</a>
                    <button className="button111" onClick={this.onbtn1}>button1</button>
                    <button className="button111" onClick={this.onbtn2}>button2</button>
                </header>
            </div>
        );
    }
}

export default App;

import React from 'react';

import './iphone8plus.css';


export default class Iphone8 extends React.Component {
    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        const style = {
            'overflow': 'none',
            '-webkit-overflow-scrolling': 'touch'
        };
        const array = [];
        for (let index = 0; index < 200; index++) {
            array.push(index)
        }
        return (
            <sbody className="jw dom dom-jw index index0">
                <main>
                    <div className="sideground">
                        <div className="marvel-device iphone8plus silver">
                            <div className="top-bar"></div>
                            <div className="sleep"></div>
                            <div className="volume"></div>
                            <div className="camera"></div>
                            <div className="sensor"></div>
                            <div className="speaker"></div>
                            <div className="screen" style={style}>
                                <iframe src="https://m.baidu.com"></iframe>
                                {/* {
                                    array.map(item => <div>{item}_11111111111111</div>)
                                } */}
                            </div>
                            <div className="home"></div>
                            <div className="bottom-bar"></div>
                        </div>
                    </div>
                </main>

            </sbody>


        );
    }
}

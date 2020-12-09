import React from "react";
import { Router, hashHistory } from "react-router";
import { routes, AsyncLoader } from "./src/route";
import './app.less';

const routeArr = [...routes];


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConsole: false
        };
    }

    hashchange = (e) => {
        console.log("", e, e.oldURL, e.newURL);

        this.setTtile(e.newURL);
        //跳转到主页不弹窗提示
        if (e.newURL.endsWith('/#/')) {
            return;
        }
        if (e.newURL.indexOf('home') == -1) {
            alert('go ' + e.newURL);
        }
    }

    setTtile(url) {
        if (url.endsWith('/#/')) {
            document.title = '首页';
        } else {
            document.title = url.substr(url.indexOf('/#/') + 2);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.hashchange);
    }

    componentDidMount() {
        this.setTtile(window.location.href);

        // 监听路由变化
        window.addEventListener("hashchange", this.hashchange, false);

        if (window.location.search.indexOf('vconsole=open') != -1){
            this.setState({ isConsole: true });
        }
    }

    render() {
        const { isConsole } = this.state;
        return (
            <>
                <Router history={hashHistory}>{routeArr}</Router>
            </>
        );
    }
}

export default App;

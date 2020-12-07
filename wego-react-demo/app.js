import React from "react";
import { Router, hashHistory } from "react-router";
import { routes } from "./src/route";
import './app.less';

const routeArr = [...routes];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    hashchange(e) {
        console.log("", e);
        // alert(`goto ${e.newURL}`);
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.hashchange);
    }

    componentDidMount() {
        // 监听路由变化
        window.addEventListener("hashchange", this.hashchange, false);
    }

    render() {
        return (
            <>
                <Router history={hashHistory}>{routeArr}</Router>
            </>
        );
    }
}

export default App;

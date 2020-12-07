/* eslint-disable import/prefer-default-export */

import React from "react";
import { Route } from "react-router";
import Loadable from "react-loadable";

function PageLoading() {
    return <div>PageLoading</div>;
}

function AsyncLoader(props) {
    const obj = {
        loading: PageLoading,
        // delay: 200,
        timeout: 10000,
        ...props
    };
    return Loadable(obj);
}

const Album = AsyncLoader({
    loader: () => import("./routes/album")
});
const Album2 = AsyncLoader({
    loader: () => import("./routes/album2")
});

export const routes = [
    <Route path="/" component={Album} />,
    <Route path="/album1" component={Album} />,
    <Route path="/album2" component={Album2} />
].map((i, index) => React.cloneElement(i, { key: index }));

console.log("---路由总数：", routes.length);

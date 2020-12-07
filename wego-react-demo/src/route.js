/* eslint-disable import/prefer-default-export */

import React from "react";
import { Route } from "react-router";
import Loadable from "react-loadable";


function PageLoading() {
    return <div>AsyncLoader...</div>;
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
import Album3 from './routes/album3';
// const Album3 = AsyncLoader({
//     loader: () => import("./routes/album3")
// });

export const routes = [
    <Route path="/" component={Album} />,
    <Route path="/home" component={Album} />,
    <Route path="/album2" component={Album2} />,
    <Route path="/album3" component={Album3} />
].map((i, index) => React.cloneElement(i, { key: index }));

console.log("---路由总数：", routes.length);

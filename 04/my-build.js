
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var bodyParser = require('body-parser');
const urlModule = require('url');
const fs = require("fs");


var compiler = webpack(config);
compiler.watch({
    // watchOptions 示例
    aggregateTimeout: 300,
    poll: undefined
}, (err, stats) => {
    // 在这里打印 watch/build 结果...
    if (err || stats.hasErrors()) {
        console.log(stats);
    } else {
        console.log("构建成功！");
    }
});
// webpack(config, (err, stats) => {
//     if (err || stats.hasErrors()) {
//         console.log(stats);
//         console.log("构建过程出错！");
//     } else {
//         console.log("构建成功！");
//     }
// });


var app = express();

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log('req:', req.url);
    res.sendFile(path.join(__dirname, 'index2.html'));
});

const commentList = [
    { "name": "cam", "content": "It's good idea!", "publishTime": "2015-05-01" },
    { "name": "arcthur", "content": "Not bad.", "publishTime": "2015-05-01" }
];

app.get('/api/response.json', function (req, res) {
    res.send({ 'commentList': commentList });
});

app.post('/api/submit.json', function (req, res) {
    if (req.body.value) {
        commentList.push({
            name: 'arcthur',
            content: decodeURI(req.body.value),
            publishTime: (new Date()).toISOString().split('T')[0],
        });

        res.send({
            "ok": true,
        });
    } else {
        res.send({
            "ok": false,
        });
    }
});

//...静态资源
app.use('/', function (req, res) {
    // const filename = req.url.split('/').pop();
    const filePath = path.join(__dirname, req.url);
    console.log('获取静态资源, req:', req.url, filePath);

    if (filePath && fs.existsSync(filePath)) {
        res.sendFile(filePath);
        return;
    } else {
        console.log(filePath + ' is not exist!');
    }
    // res.sendFile(path.join(__dirname, '/build/bundle.js'));
});

app.listen(8787, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:8787');
});


const fs = require("fs");
const path = require('path');
const shell = require('shelljs');

const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);
const readDir = (entry, handler) => {
    const dirInfo = fs.readdirSync(entry);
    dirInfo.forEach(item => {
        const location = path.join(entry, item);
        const info = fs.statSync(location);
        if (info.isDirectory()) {
            console.log(`dir: ${location}`, 'out-' + location);
            createDirIfNotExists('out-' + location);
            readDir(location, handler);
        } else {
            console.log(`file: ${location}`);
            if (handler && /\.jsx?$/.test(location)){
                let ret = handler(location);
                // console.log(ret && ret.code);
                if(ret){
                    let outfile = 'out-' + location;
                    fs.writeFileSync('out-' + location, ret.code);
                }
            }
        }
    });
};


const parserFunc = () => require("@babel/parser").parse("var a = (b) => b;", {
    // parse in strict mode and allow module declarations
    sourceType: "module",

    plugins: [
        // enable jsx and flow syntax
        "jsx",
        "flow"
    ]
});


// const transformFunc = (filename) => require("@babel/core").transformFileSync(filename, {
//     plugins: ["transform-class-properties", "@babel/transform-arrow-functions", "@babel/transform-react-jsx"]
// });

const transformFunc = (filename) => require("@babel/core").transformFileSync(filename, {
    plugins: ["transform-class-properties", "@babel/transform-react-jsx"]
});








// console.log(ret1)
console.log('\n----------------------start--------------------------\n')
// console.log(transformFunc('src/app.js').code);
shell.rm('-rf', 'out-src');
//readDir(__dirname);
createDirIfNotExists('out-src');
readDir('src', transformFunc);
console.log('\n---------------------end---------------------------\n')

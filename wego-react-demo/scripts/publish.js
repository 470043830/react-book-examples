const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { checkVersion, writeFile } = require('../utils/webpack.utils.js');
const prompts = require('prompts');
const pkgConfig = require('../package.json');
const ora = require('ora');
const ttyTable = require('tty-table');
const request = require('request');
const proVersion = pkgConfig.version;

const pkgVersion = process.env.npm_config_pkgVersion;

const localNpmRegistry = 'http://129.204.178.85:8080/';

function checkCurrentVersion() {
    // const pkgPath = path.resolve(__dirname, '../package.json');
    // const pkgContent = fs.readFileSync(pkgPath, 'utf-8');
    // const newPkgContent = pkgContent.replace('"version": "' + proVersion + '"', '"version": "' + pkgVersion + '"');

    // writeFile(path.resolve(__dirname, '../package.json'), newPkgContent);
    shell.exec(`npm unpublish wsxc_album@${proVersion} --force && gulp && npm publish`);
}

checkCurrentVersion();

const questions = [
    {
        type: 'select',
        name: 'versionType',
        message: '选择发布版本类型',
        choices: [
            { title: 'patch', value: 'patch' },
            { title: 'prepatch', value: 'prepatch' },
            { title: 'minor', value: 'minor' },
            { title: 'preminor', value: 'preminor' },
            { title: 'major', value: 'major' },
            { title: 'premajor', value: 'premajor' },
            { title: 'prerelease', value: 'prerelease' },
        ],
    },
];

(async () => {
    // const response = await prompts(questions);
    // const { versionType } = response;
    // shell.exec('npm version ' + versionType);
})();

// checkVersion('wsxc_album', function(res) {
//     prompts.start();

//     prompts.get({
//         name: 'version',
//         description: '输入版本号',
//         type: 'string',
//         pattern: /^\d+\.\d+\.\d+$/,
//         message: '请输入正确的版本号',
//         default: res,
//         required: true
//     }, function (err, result) {
//         if (!err) {
//             const pkgPath = path.resolve(__dirname, '../package.json');
//             const pkgContent = fs.readFileSync(pkgPath, 'utf-8');

//             const newPkgContent = pkgContent.replace('"version": "' + proVersion + '"', '"version": "' + result.version + '"');

//             writeFile(path.resolve(__dirname, '../package.json'), newPkgContent);
//         }
//     });
// })
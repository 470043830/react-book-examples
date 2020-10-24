import React from 'react';
import html2canvas from 'html2canvas';
// import $ from 'jquery';
import axios from 'axios';
import './App.css';


var _uptoken = 'copy uptoken to here';
var _app = null;


function makeRandomName() {
    return `jtest20200908/1/2/${Date.now()}_${parseInt(Math.random() * 1000000000000000, 0)}`;
}

async function getUptoken() {
    const host = ''; //'https://www.micbosscloud.com';
    const res = await axios.get(host + '/service/get_qiuniu_token.jsp');
    return res.data.uptoken;
};

function getFormData(blob, token, specificPath) {
    let fileName = '';

    if (specificPath) {
        fileName = specificPath + blob.name;
    } else {
        fileName = makeRandomName();
    }
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('key', `${fileName}`);
    formData.append('name', `${fileName}`);
    formData.append('token', token);
    return formData;
}

async function onBlob(blob, retry, specificPath) {
    console.log('onBlob, retry: ', blob, retry);
    let req = {
        method: 'post',
        url: 'https://upload.qiniup.com/',
        data: getFormData(blob, _uptoken, specificPath),
        contentType: false,
        processData: false,
        mimeType: 'multipart/form-data',
    };
    let response = await axios(req).catch(e => e.response);
    console.log('response: ', response);
    if (response) {
        console.log('data: ', response.data);
        if (response.status === 200) {
            console.log('post ok, url: ', 'https://xcimg.szwego.com/' + response.data.key);
            _app.setState({
                postok: 'https://xcimg.szwego.com/' + response.data.key
            });
        } else if (response.status === 401 && !retry) {
            _uptoken = await getUptoken();
            console.log('token: ', _uptoken);
            onBlob(blob, true, specificPath);
        }
    }
    // $.ajax({
    //     type: 'POST',
    //     url: 'https://upload.qiniup.com/',
    //     data: formData,
    //     contentType: false,
    //     processData: false,
    //     mimeType: 'multipart/form-data',
    //     success: data => {
    //         console.log('success ', data);
    //     },
    //     error: msg => {
    //         console.log('error ', msg);
    //     },
    // });
}


async function onButtonClick(params) {
    console.log('onButtonClick...');
    if (!_uptoken) {
        _uptoken = await getUptoken();
    }
    console.log("_uptoken: ", _uptoken);

    let element = document.getElementById('canvas-template-001');
    let option = {
        backgroundColor: 'white', //null,
        // dpi: window.devicePixelRatio * 2, // 对应屏幕的dpi，适配高清屏，解决canvas模糊问题
        // scale: 2, // 缩放
        allowTaint: true, // 是否使用图片跨域
        useCORS: true, // 是否使用图片跨域
        // y: window.scrollY // 根据滚动条来截取--主要用于截取某一个区域
    };
    html2canvas(element, option).then(function (canvas) {
        document.body.appendChild(canvas);
        // let url = canvas.toDataURL("image/png");
        // console.log('url...', url);
        canvas.toBlob(onBlob, "image/jpeg", 0.95);
    });
}

async function onGetButtonClick(params) {
    const res = await axios.post('https://www.micbosscloud.com/service/get_qiuniu_token.jsp');
    console.log('onGetButtonClick ', res);
    ////   "proxy": "https://www.micbosscloud.com",
}

function onImgLoad(e) {
    console.log('onImgLoad...', e.currentTarget);
}

function canvasTemplate() {
    let imgs = [
        `https://xcimg.szwego.com/o_1ee9l1klbhg512rr1upe123jdsq2o.jpg?imageMogr2/auto-orient/thumbnail/!320x320r/quality/100/format/jpg`,
        `https://xcimg.szwego.com/o_1ee9l1klbeo3fginsl16h1euk2n.jpg?imageMogr2/auto-orient/thumbnail/!320x320r/quality/100/format/jpg`,
        `https://xcimg.szwego.com/o_1eh6bqla31q831nf18h01ucm1hr4i.jpg?imageMogr2/auto-orient/thumbnail/!310x310r/quality/100/format/jpg`,
        `https://xcimg.szwego.com/o_1eh6btu979tf1e8kf7849316uin.jpg?imageMogr2/auto-orient/thumbnail/!310x310r/quality/100/format/jpg`
    ];
    return (
        <div>

            <div className="place-bar"></div>
            <div className="place-bar"></div>
            <div id="canvas-template-001">
                <div className="dasdasdas">111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>
                {
                    imgs.map((item, index) => {
                        return <div key={item} className="img-text-item">
                            <img src={item} width='200' height='200' alt='img' onLoad={onImgLoad} />
                            <div>text-{index}</div>
                        </div>;
                    })
                }

            </div>

            <div className="place-bar"></div>
            <button onClick={onButtonClick}>post buttton</button>
            <button onClick={onGetButtonClick}>get buttton</button>
            <div className="place-bar"></div>


        </div>

    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choosedName: '',
            showCanvas: true,
            prefix: '20200907/demo01/',
            postok: '',
            inputToken: _uptoken,
        };
        this.fileInputEl = React.createRef();
        _app = this;
    }

    componentDidMount() {
        console.log('this.props: ', this.props, window.location.href);
        if (window.location.href.indexOf('canvas') !== -1){
            this.setState({
                showCanvas: true
            })
        }
    }

    onUploadClick = () => {
        onBlob(this._curBlobFile, false, this.state.prefix);
    };

    handleFile = (e) => {
        const files = [...e.target.files];
        console.log('handleFile: ', files);
        this._curBlobFile = files[0];
        this.setState({
            choosedName: this._curBlobFile.name
        });
    };

    handleChange = (e) =>  {
        if (e.target.value){
            this.setState({ prefix: e.target.value });
        }
    }

    onInputToken = (e) => {
        if (e.target.value) {
            let str = e.target.value.replace(/\\\u/g, "%u");
            // console.log('str: ', str, unescape(str))
            _uptoken = unescape(str); //eval("'" + e.target.value + "'");
            console.log('onInputToken, _uptoken:', _uptoken);
            this.setState({
                inputToken: _uptoken
            });
        }


        // var iframe = document.getElementsByTagName("iframe")[0];
        // var win = iframe.contentWindow;  // 通过contentWindow获取ifame子页面的window窗体对象。(不允许跨域名访问)
        // console.log(win.document);
    }

    render() {
        const { choosedName, showCanvas, postok, inputToken } = this.state;

        return (
            <div className="App">
                <h1>上传文件到七牛</h1>

                <div className="place-bar"></div>
                <input type="file" id="avatar" name="avatar" hidden
                    ref={this.fileInputEl}
                    onChange={this.handleFile}
                />
                <div className="flex space-around">
                    <input type="text" name="prefix" placeholder='input prefix' onChange={this.handleChange}/>
                    <button onClick={() => {
                        this.fileInputEl.current.click();		//当点击a标签的时候触发事件
                    }}
                    >{choosedName ? choosedName : `choose file`}</button>
                    <button onClick={this.onUploadClick}>upload file</button>
                </div>


                {showCanvas && canvasTemplate()}
                <div className="place-bar"></div>
                <div className="place-bar">复制下面的uptoken</div>
                <a href={postok}>{postok}</a>
                <input className='input-width' type="text" value={inputToken} name="inputToken" placeholder='input token' onChange={this.onInputToken} />
                <iframe width="85%" src="https://www.micbosscloud.com/service/get_qiuniu_token.jsp"></iframe>

            </div>
        );
    }
}


export default App;

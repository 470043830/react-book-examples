/* eslint-disable react/button-has-type */
import React from "react";
import ReactDOM from 'react-dom';
import { Button, WingBlank, WhiteSpace, NavBar, Icon, Card, NoticeBar, Toast, Flex, ActionSheet } from 'wego-ui-mobile';
// import { Badge } from 'wego-ui-mobile/lib/weui';
import image111 from '@images/111.jpg';
import logo_normal from '@images/logo_normal.svg';
import './index.less';

export default class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height: document.documentElement.clientHeight,
        };
        this.dataList = [
            { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
            { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
            { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
            { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
            { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
        ].map(obj => ({
            icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
            title: obj.title,
        }));
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize); // 监听窗口大小改变
        document.title = '首页';

        const dom = ReactDOM.findDOMNode(this);
        console.log('dom: ', dom.id, dom.className, dom.clientWidth, dom.clientHeight);

        var para = document.createElement("p");
        var node = document.createTextNode("This is new.");
        para.appendChild(node);
        para.style.cssText = 'background:white;color:green;height:20px;text-align:center;';
        dom.appendChild(para);
        para.addEventListener("click", function () { alert("Hello World!!"); });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = e => {
        // console.log('浏览器窗口大小改变事件', e.target.innerWidth);
        const { height } = this.state;
        const curHeight = document.documentElement.clientHeight;

        if (height !== curHeight) {
            this.setState({
                height: curHeight
            });
        }
    };

    gotoPage2() {
        window.location.hash = "/album2";
        // import('jquery').then(m => { console.log('$: ', m); });

        // Promise.all([import('vconsole'), import('jquery')]).then(libs => {
        //     var v = libs[0];
        //     var $ = libs[1];
        //     window._vconsole = new v.default();
        // });
        // Promise.all([import('vconsole')]).then(libs => {
        //     var v = libs[0];
        //     window._vconsole = new v.default();
        // });

    }

    gotoPage3() {
        window.location.hash = "/album3";
    }

    showShareActionSheet = () => {
        ActionSheet.showShareActionSheetWithOptions({
            options: this.dataList,
            // title: 'title',
            message: 'I am description, description, description',
        }, (buttonIndex) => {
            this.setState({ clicked1: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
            // also support Promise
            return new Promise((resolve) => {
                // Toast.info('closed after 100ms');
                setTimeout(resolve, 100);
            });
        });
    };

    render() {
        const { height } = this.state;
        return (
            <div id='album000' className='page-000' style={{ minHeight: height }}>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { window.history.back(); }}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" onClick={this.showShareActionSheet} />,
                    ]}
                >导航栏</NavBar>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
                </NoticeBar>
                <WingBlank>
                    <WhiteSpace size="xl" />
                    <Card onClick={e => { Toast.success('card clicked', 1, null, true); }}>
                        <Card.Header
                            title="This is title"
                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra={<span>this is extra</span>}
                        />
                        <Card.Body>
                            <div>This is content of `Card`</div>
                            <div>The file will have its original line endings in your working directory</div>
                        </Card.Body>
                        <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                    </Card>

                    {
                        [].map(e => {
                            return <>
                                <WhiteSpace size="xl" />
                                <Button type='primary' onClick={this.gotoPage2}>
                                    to 2</Button>
                            </>;
                        })
                    }

                    <WhiteSpace size="xl" />
                    <Button type='primary' onClick={this.gotoPage2}>to 2</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.gotoPage3}>to 3</Button>
                    {/* <Badge>222</Badge> */}

                    <WhiteSpace />
                    <Flex>
                        <img src={logo_normal} alt="" className="image-test" />
                        <img src={image111} alt="" className="image-test" />
                    </Flex>
                </WingBlank>
            </div>
        );
    }
}

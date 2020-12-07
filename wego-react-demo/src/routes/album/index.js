/* eslint-disable react/button-has-type */
import React from "react";
import { Button, WingBlank, WhiteSpace, NavBar, Icon, Card, NoticeBar } from 'wego-ui-mobile';
import './index.less';

export default class Album extends React.Component {
    gotoPage2() {
        window.location.hash = "/album2";
    }
    gotoPage3() {
        window.location.hash = "/album3";
    }

    render() {
        const style ={
            minHeight: document.documentElement.clientHeight + 'px'
        }
        return (
            <div className='page-000' style={style}>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {window.history.back();}}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >Album111</NavBar>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
                </NoticeBar>
                <WingBlank>
                    <WhiteSpace size="xl" />
                    <Card>
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
                            </>
                        })
                    }

                    <WhiteSpace size="xl" />
                    <Button type='primary' onClick={this.gotoPage2}>to 2</Button>
                    <WhiteSpace size="xl" />
                    <Button type='primary' onClick={this.gotoPage3}>to 3</Button>
                </WingBlank>
            </div>
        );
    }
}

/* eslint-disable react/button-has-type */
import React from "react";
import { Button, WingBlank, WhiteSpace, NavBar, Icon, Card } from 'wego-ui-mobile';
import './index.less';

export default class Album extends React.Component {
    gotoPage2() {
        window.location.hash = "/album2";
    }

    render() {
        const style ={
            minHeight: document.documentElement.clientHeight + 'px'
        }
        return (
            <div className='page-1' style={style}>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
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
                            <div>This is content of `Card`</div>
                            <div>This is content of `Card`</div>
                            <div>This is content of `Card`</div>
                            <div>This is content of `Card`</div>
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
                    <Button type='primary' onClick={this.gotoPage2}>
                        to 2
                    </Button>

                </WingBlank>
            </div>
        );
    }
}

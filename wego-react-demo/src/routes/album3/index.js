/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */

import React from 'react';
import { NavBar, Icon, List, Result } from 'wego-ui-mobile';

const Item = List.Item;
const myImg = src => <img src={src} className="spe111 am-icon am-icon-md" alt="" />;

export default class Index extends React.Component {


    render(){
        const style = {
            minHeight: document.documentElement.clientHeight + 'px'
        }
        return <div className='page-000' style={style}>
            <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => { window.history.back(); }}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
            >Album---3</NavBar>
            <List renderHeader={() => 'Basic Style'} className="my-list">
                <Item extra={'extra content'}>Title333</Item>
            </List>
            <Result
                img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
                title="等待处理"
                message="已提交申请，等待银行处理"
            />
        </div>
    }
}

/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */

import React from 'react';
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { NavBar, Icon, List, Result } from 'wego-ui-mobile';
import './index.scss';

const Item = List.Item;

@observer
export default class Index extends React.Component {

    @observable newTodoTitle = "...";

    constructor(props) {
        super(props);
        this.state = {
            height: document.documentElement.clientHeight,
            data: [],
        };
    }

    render() {
        const { height } = this.state;
        return <div className='page-000' style={{ minHeight: height }}>
            <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => { window.history.back(); }}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
            >Album---2</NavBar>
            <List renderHeader={() => 'Basic Style'} className="my-list">
                <Item extra={'extra content'}>Title</Item>
            </List>
            <Result
                img={<Icon type="check-circle" className="spe111" style={{ fill: '#49C167' }} />}
                title="验证成功"
                message="所提交内容已成功完成验证"
            />
            <div className="test-scss">多大点事</div>
            <input
                type="text"
                value={this.newTodoTitle}
                onChange={e => this.newTodoTitle = e.target.value}
            />
            <div className="hexagon"></div>
        </div>;
    }
}

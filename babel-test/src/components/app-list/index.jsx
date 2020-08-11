import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Button } from '@tarojs/components';
import WgComponent from '../../common/component';
import WgSplitLine from '../split-line';
import WgAppListItem from './item';


export default class WgAppList extends WgComponent {
    constructor(props) {
        super(props);
        this.state = {
            isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
        };
    }

    onClick(event) {
        if (!this.props.disabled) {
            this.props.onClick(event);
        }
    }
    render() {
        const { customStyle, title, list } = this.props;
        return <View className='wg-app-list' style={customStyle} >
            <View className='wg-app-list__title'>{title}</View>
            <WgSplitLine />
            {
                list.map((item) => <WgAppListItem key={item.id} {...item}></WgAppListItem>)
            }
            {this.props.children}
        </View>;
    }
}
WgAppList.defaultProps = {
    disabled: false,
    list: [],
    customStyle: {},
    onClick: () => { },
};
WgAppList.propTypes = {
    disabled: PropTypes.bool,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onClick: PropTypes.func,
};

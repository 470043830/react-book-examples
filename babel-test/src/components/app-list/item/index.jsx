import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Image } from '@tarojs/components';
import WgComponent from '../../../common/component';
import WgTagBtn from '../../tag-btn';
import WgSplitLine from '../../split-line';

export default class WgAppListItem extends WgComponent {
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
        const { title, desc, divide, btn, badge } = this.props;
        const rootClassName = 'wg-app-list__item';
        const divideLine = {
            width: '100%', //Taro.pxTransform(606),
        };
        let badgeStyle = {
            border: '1px solid #fe5e0c',
            color: '#f64b3e',
        };
        if (badge && badge.text == 'NEW') {
            badgeStyle = {
                border: '1px solid #49C167',
                color: '#49C167',
            };
        }

        return <View className={rootClassName} >
            <View className={rootClassName + '__img'}></View>
            <View className={rootClassName + '__title'}>
                {title}
                {badge && <View className={rootClassName + '__badge'} style={badgeStyle}>
                    <View className={rootClassName + '__badge__text'}>{badge.text}</View>
                </View>}
            </View>
            <View className={rootClassName + '__desc'}>
                {desc}
            </View>
            <WgTagBtn {...btn}>{btn.text}</WgTagBtn>
            <View className={rootClassName + '__line'}>
                {divide && <WgSplitLine customStyle={divideLine} />}
            </View>
        </View>;
    }
}
WgAppListItem.defaultProps = {
    disabled: false,
    title: '',
    desc: 'desc',
    btn: { text: '开启', disabled: false, onClick: () => { console.log('click'); } },
    customStyle: {},
    onClick: () => { },
};
WgAppListItem.propTypes = {
    disabled: PropTypes.bool,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onClick: PropTypes.func,
};

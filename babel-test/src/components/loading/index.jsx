import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import WgComponent from '../../common/component';


export default class WgLoading extends WgComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { size } = this.props;
        const loadingSize = typeof size === 'string' ? size : String(size);
        const sizeStyle = {
            width: size ? `${parseInt(loadingSize)}px` : '',
            height: size ? `${parseInt(loadingSize)}px` : '',
        };
        return (
            <View className='wg-loading-animation' style={sizeStyle} ></View>
        );
    }
}


WgLoading.defaultProps = {
    border: 1,
    size: 30,
};

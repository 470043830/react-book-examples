import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import WgComponent from '../../../common/component';

export default class WgModalHeader extends WgComponent {
    render() {
        return <View className='wg-modal__header'>{this.props.children}</View>;
    }
}

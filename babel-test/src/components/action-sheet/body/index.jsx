import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { View } from '@tarojs/components';
import WgComponent from '../../../common/component';

export default class WgActionSheetBody extends WgComponent {
    render() {
        const rootClass = classNames('wg-action-sheet__body', this.props.className);
        return <View className={rootClass}>{this.props.children}</View>;
    }
}

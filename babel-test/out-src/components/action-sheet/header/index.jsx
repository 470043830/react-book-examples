import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { View } from '@tarojs/components';
import WgComponent from '../../../common/component';
export default class WgActionSheetHeader extends WgComponent {
  render() {
    const rootClass = classNames('wg-action-sheet__header', this.props.className);
    return /*#__PURE__*/React.createElement(View, {
      className: rootClass
    }, this.props.children);
  }

}
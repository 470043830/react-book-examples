import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { View } from '@tarojs/components';
import WgComponent from '../../../common/component';
export default class WgModalContent extends WgComponent {
  render() {
    // const rootClass = classNames('wg-modal__content', this.props.className);
    return /*#__PURE__*/React.createElement(View, {
      className: "wg-modal__content"
    }, this.props.children);
  }

}
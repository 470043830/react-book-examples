import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import WgComponent from '../../common/component';
export default class WgSplitLine extends WgComponent {
  render() {
    const {
      customStyle,
      className
    } = this.props;
    const {
      pixelRatio
    } = Taro.getSystemInfoSync();
    const style = {
      height: 1 / pixelRatio + 'px',
      backgroundColor: '#eeeeee'
    };
    return /*#__PURE__*/React.createElement(View, {
      className: className,
      style: this.mergeStyle(customStyle, style)
    });
  }

}
WgSplitLine.defaultProps = {
  customStyle: {}
};
WgSplitLine.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
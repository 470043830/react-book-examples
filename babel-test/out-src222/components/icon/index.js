import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Text } from '@tarojs/components';
import WgComponent from '../../common/component';
export default class WgIcon extends WgComponent {
  handleClick() {
    this.props.onClick && this.props.onClick(arguments);
  }

  render() {
    const {
      customStyle,
      className,
      prefixClass,
      value,
      size,
      color
    } = this.props;
    const rootStyle = {
      fontSize: `${Taro.pxTransform(parseInt(String(size)) * 2, 750)}`,
      color
    };
    const iconName = value ? `${prefixClass}-${value}` : '';
    return /*#__PURE__*/React.createElement(Text, {
      className: classNames(prefixClass, iconName, className),
      style: this.mergeStyle(rootStyle, customStyle),
      onClick: this.handleClick.bind(this)
    });
  }

}
WgIcon.defaultProps = {
  customStyle: '',
  className: '',
  prefixClass: 'wg-icon',
  value: '',
  color: '',
  size: 24,
  onClick: () => {}
};
WgIcon.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  prefixClass: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func
};
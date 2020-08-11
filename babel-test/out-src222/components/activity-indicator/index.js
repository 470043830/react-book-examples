import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Text, View } from '@tarojs/components';
import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import WgComponent from '../../common/component';
import WgLoading from '../loading/index';
export default class WgActivityIndicator extends WgComponent {
  render() {
    const {
      color,
      size,
      mode,
      content,
      isOpened
    } = this.props;
    const rootClass = classNames('wg-activity-indicator', {
      'wg-activity-indicator--center': mode === 'center',
      'wg-activity-indicator--isopened': isOpened
    }, this.props.className);
    return /*#__PURE__*/React.createElement(View, {
      className: rootClass
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-activity-indicator__body"
    }, /*#__PURE__*/React.createElement(WgLoading, {
      size: size,
      color: color,
      border: "1.5"
    })), content && /*#__PURE__*/React.createElement(Text, {
      className: "wg-activity-indicator__content"
    }, content));
  }

}
WgActivityIndicator.defaultProps = {
  size: 37,
  mode: 'normal',
  color: '#49C167',
  content: '',
  className: '',
  isOpened: true
};
WgActivityIndicator.propTypes = {
  size: PropTypes.number,
  mode: PropTypes.string,
  color: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  isOpened: PropTypes.bool
};
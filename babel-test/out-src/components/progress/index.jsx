import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import WgComponent from '../../common/component';
export default class WgProgress extends WgComponent {
  render() {
    const {
      color
    } = this.props;
    let {
      percent
    } = this.props;
    const {
      strokeWidth,
      status,
      curTime,
      maxTime
    } = this.props;

    if (typeof percent !== 'number') {
      percent = 0;
    }

    if (percent < 0) {
      percent = 0;
    } else if (percent > 100) {
      percent = 100;
    }

    const rootClass = classNames('wg-progress', {
      [`wg-progress--${status}`]: !!status
    }, this.props.className);
    const progressStyle = {
      width: percent && `${+percent}%`,
      height: strokeWidth && `${+strokeWidth}px`,
      backgroundColor: color
    };
    return /*#__PURE__*/React.createElement(View, {
      className: rootClass
    }, curTime && /*#__PURE__*/React.createElement(View, {
      className: "wg-progress__content wg-progress__content-left"
    }, curTime), /*#__PURE__*/React.createElement(View, {
      className: "wg-progress__outer"
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-progress__outer-inner"
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-progress__outer-inner-background",
      style: progressStyle
    }))), maxTime && /*#__PURE__*/React.createElement(View, {
      className: "wg-progress__content wg-progress__content-right"
    }, maxTime));
  }

}
WgProgress.propTypes = {
  color: PropTypes.string,
  status: PropTypes.string,
  percent: PropTypes.number,
  strokeWidth: PropTypes.number,
  isHidePercent: PropTypes.bool
};
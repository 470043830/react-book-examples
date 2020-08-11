function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Button } from '@tarojs/components';
import WgComponent from '../../common/component';
import WgSplitLine from '../split-line';
import WgAppListItem from './item';
export default class WgAppList extends WgComponent {
  constructor(props) {
    super(props);
    this.state = {
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP
    };
  }

  onClick(event) {
    if (!this.props.disabled) {
      this.props.onClick(event);
    }
  }

  render() {
    const {
      customStyle,
      title,
      list
    } = this.props;
    return /*#__PURE__*/React.createElement(View, {
      className: "wg-app-list",
      style: customStyle
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-app-list__title"
    }, title), /*#__PURE__*/React.createElement(WgSplitLine, null), list.map(item => /*#__PURE__*/React.createElement(WgAppListItem, _extends({
      key: item.id
    }, item))), this.props.children);
  }

}
WgAppList.defaultProps = {
  disabled: false,
  list: [],
  customStyle: {},
  onClick: () => {}
};
WgAppList.propTypes = {
  disabled: PropTypes.bool,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClick: PropTypes.func
};
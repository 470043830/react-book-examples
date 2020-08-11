import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Image } from '@tarojs/components';
import WgComponent from '../../../../common/component';
export default class WgActionSheetItem extends WgComponent {
  constructor() {
    super(...arguments);

    this.handleClick = args => {
      if (typeof this.props.onClick === 'function') {
        this.props.onClick(args);
      }
    };
  }

  render() {
    const {
      danger,
      iconUrl,
      description
    } = this.props;
    const rootClass = classNames('wg-action-sheet__item', this.props.className);
    const dangerClass = classNames(danger ? 'danger' : '');
    return /*#__PURE__*/React.createElement(View, {
      className: rootClass,
      onClick: this.handleClick
    }, /*#__PURE__*/React.createElement(View, {
      className: classNames('wg-action-sheet__item-text', dangerClass)
    }, iconUrl && /*#__PURE__*/React.createElement(Image, {
      src: iconUrl,
      className: "wg-action-sheet__item-img"
    }), /*#__PURE__*/React.createElement(View, null, this.props.children)), description && /*#__PURE__*/React.createElement(View, {
      className: "wg-action-sheet__item-description"
    }, description));
  }

}
WgActionSheetItem.defaultProps = {
  danger: false,
  //是否警告
  iconUrl: null,
  //图标
  description: null,
  //说明文案
  onClick: () => {}
};
WgActionSheetItem.propTypes = {
  danger: PropTypes.bool,
  iconUrl: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func
};
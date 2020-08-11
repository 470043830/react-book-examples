import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Block, Text } from '@tarojs/components';
import WgComponent from '../../common/component';
import { delayGetClientRect } from '../../common/utils';
export default class WgBubble extends WgComponent {
  async getClientRect() {
    return await delayGetClientRect({
      self: this,
      delayTime: 25,
      selectorStr: '.wg-bubble-layer'
    });
  }

  render() {
    const {
      customStyle,
      items,
      arrowStyle,
      isOpened,
      isArrowUp
    } = this.props;
    const arrowClass = {
      'wg-bubble-layer__arrowb': true,
      'wg-bubble-layer__arrowb-bottom': !isArrowUp,
      'wg-bubble-layer__arrowb-up': isArrowUp
    };
    return isOpened ? /*#__PURE__*/React.createElement(View, {
      className: "wg-bubble-layer",
      style: customStyle
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-bubble-layer__wrapper"
    }, items.map((item, index) => {
      return /*#__PURE__*/React.createElement(Block, {
        key: item.text
      }, /*#__PURE__*/React.createElement(Text, {
        className: "wg-bubble-layer__text",
        onClick: item.onClick
      }, item.text), index < items.length - 1 && /*#__PURE__*/React.createElement(View, {
        className: "wg-bubble-layer__vline"
      }));
    }), /*#__PURE__*/React.createElement(View, {
      className: classNames('', arrowClass),
      style: arrowStyle
    }))) : null;
  }

}
WgBubble.defaultProps = {
  isOpened: false,
  isArrowUp: false,
  items: [],
  customStyle: {}
};
WgBubble.propTypes = {
  isOpened: PropTypes.bool,
  isArrowUp: PropTypes.bool,
  items: PropTypes.array,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
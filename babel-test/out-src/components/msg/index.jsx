import Taro from '@tarojs/taro';
import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Icon } from '@tarojs/components';
import WgButton from '../button';
import WgComponent from '../../common/component';
export default class WgMsg extends WgComponent {
  onClick(event) {
    if (!this.props.disabled) {
      this.props.onClick && this.props.onClick({
        name: this.props.name,
        active: this.props.active
      }, event);
    }
  }

  render() {
    const {
      icon,
      iconType,
      title,
      btns
    } = this.props;
    const buttonStyle = `width:${Taro.pxTransform(696)};`;
    return /*#__PURE__*/React.createElement(View, {
      className: "wg-msg"
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-msg__header"
    }, icon && /*#__PURE__*/React.createElement(Image, {
      src: icon,
      className: "wg-msg__header-icon"
    }), iconType && /*#__PURE__*/React.createElement(Icon, {
      size: "70",
      type: iconType
    })), /*#__PURE__*/React.createElement(View, {
      className: "wg-msg__title"
    }, title), /*#__PURE__*/React.createElement(View, {
      className: "wg-msg__desc"
    }, this.props.children), /*#__PURE__*/React.createElement(View, {
      className: "wg-msg__buttons"
    }, btns && btns.map(item => /*#__PURE__*/React.createElement(View, {
      key: item.id,
      className: "wg-msg__buttons-item"
    }, /*#__PURE__*/React.createElement(WgButton, {
      size: item.size,
      type: item.type,
      openType: item.openType,
      onClick: item.onClick,
      customStyle: buttonStyle
    }, item.btnText)))));
  }

}
WgMsg.defaultProps = {
  icon: '',
  title: '',
  btns: [],
  iconType: ''
};
WgMsg.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  btns: PropTypes.object,
  iconType: PropTypes.string
};
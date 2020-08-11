import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import { View, Image } from '@tarojs/components';
import WgComponent from '../../common/component';
import iconChecked from '../../ui-images/checked.svg';
import iconUnChecked from '../../ui-images/unchecked.png';
import iconDisabled from '../../ui-images/dis_check.svg';
export default class WgCheckIcon extends WgComponent {
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
      customStyle,
      status
    } = this.props;
    const icons = {
      checked: iconChecked,
      unchecked: iconUnChecked,
      disabled: iconDisabled
    };
    return /*#__PURE__*/React.createElement(View, {
      className: "wg-check-icon",
      style: customStyle
    }, /*#__PURE__*/React.createElement(Image, {
      className: "wg-check-icon__image",
      src: icons[status]
    }), /*#__PURE__*/React.createElement(View, {
      className: "wg-check-icon__box",
      onClick: this.onClick.bind(this)
    }));
  }

}
WgCheckIcon.defaultProps = {
  status: 'unchecked',
  customStyle: {},
  onClick: () => {}
};
WgCheckIcon.propTypes = {
  status: PropTypes.string,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClick: PropTypes.func
};
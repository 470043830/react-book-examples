import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import WgComponent from '../../common/component';
const SIZE_CLASS = {
  normal: 'normal',
  small: 'small',
  large: 'large'
};
const TYPE_CLASS = {
  primary: 'primary',
  secondary: 'secondary',
  dot: 'dot',
  hollow: 'hollow'
};
export default class WgTag extends WgComponent {
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
      size = 'normal',
      type = '',
      circle = false,
      disabled = false,
      active = false,
      customStyle
    } = this.props;
    const rootClassName = ['wg-tag'];
    const classObject = {
      [`wg-tag--${SIZE_CLASS[size]}`]: SIZE_CLASS[size],
      [`wg-tag--${type}`]: TYPE_CLASS[type],
      'wg-tag--disabled': disabled,
      'wg-tag--active': active,
      'wg-tag--circle': circle
    };
    return /*#__PURE__*/React.createElement(View, {
      className: classNames(rootClassName, classObject, this.props.className),
      style: customStyle,
      onClick: this.onClick.bind(this)
    }, this.props.children);
  }

}
WgTag.defaultProps = {
  size: 'normal',
  type: '',
  name: '',
  circle: false,
  active: false,
  disabled: false,
  customStyle: {},
  onClick: () => {}
};
WgTag.propTypes = {
  size: PropTypes.oneOf(['normal', 'small', 'large']),
  type: PropTypes.oneOf(['', 'primary', 'secondary', 'dot', 'hollow']),
  name: PropTypes.string,
  circle: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClick: PropTypes.func
};
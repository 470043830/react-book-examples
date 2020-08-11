import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Switch, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import WgComponent from '../../common/component';
export default class WgSwitch extends WgComponent {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      const {
        value,
        checked
      } = event.detail;
      const state = typeof value === 'undefined' ? checked : value;
      this.props.onChange && this.props.onChange(state);
    };
  }

  render() {
    const {
      customStyle,
      className,
      disabled,
      border,
      title,
      checked,
      color
    } = this.props;
    const rootCls = classNames('wg-switch', {
      'wg-switch--without-border': !border
    }, className);
    const containerCls = classNames('wg-switch__container', {
      'wg-switch--disabled': disabled
    });
    return /*#__PURE__*/React.createElement(View, {
      className: rootCls,
      style: customStyle
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-switch__title"
    }, title), /*#__PURE__*/React.createElement(View, {
      className: containerCls
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-switch__mask"
    }), /*#__PURE__*/React.createElement(Switch, {
      className: "wg-switch__switch",
      checked: checked,
      color: color,
      onChange: this.handleChange
    })));
  }

}
WgSwitch.defaultProps = {
  customStyle: '',
  className: '',
  title: '',
  color: '#49C167',
  border: true,
  disabled: false,
  checked: false,
  onChange: () => {}
};
WgSwitch.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  title: PropTypes.string,
  color: PropTypes.string,
  checked: PropTypes.bool,
  border: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};
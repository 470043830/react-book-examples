import Taro from '@tarojs/taro';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import WgComponent from '../../common/component';
export default class WgFixedBar extends WgComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      top,
      customStyle
    } = this.props;
    const rootClassName = ['wg-fixed-bar'];
    const classObject = {
      ['wg-fixed-bar__top']: top,
      ['wg-fixed-bar__bottom']: !top
    };
    return /*#__PURE__*/React.createElement(View, {
      className: classNames(rootClassName, classObject),
      style: customStyle
    }, this.props.children);
  }

}
WgFixedBar.defaultProps = {
  top: false,
  customStyle: {}
};
WgFixedBar.propTypes = {
  top: PropTypes.bool,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Text, View, Image } from '@tarojs/components';
import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import WgComponent from '../../common/component';
export default class WgCheckbox extends WgComponent {
  handleClick(idx) {
    const {
      selectedList,
      options
    } = this.props;
    const option = options[idx];
    const {
      disabled,
      value
    } = option;
    if (disabled) return;
    const selectedSet = new Set(selectedList);

    if (!selectedSet.has(value)) {
      selectedSet.add(value);
    } else {
      selectedSet.delete(value);
    }

    this.props.onChange([...selectedSet]);
  }

  render() {
    const {
      customStyle,
      className,
      options,
      selectedList,
      size
    } = this.props;
    const rootCls = classNames('wg-checkbox', className);
    const sizeClass = classNames('wg-checkbox__icon-cnt', {
      'wg-checkbox__icon-cnt-small': size === 'small'
    }, {
      'wg-checkbox__icon-cnt-mini': size === 'mini'
    });
    return /*#__PURE__*/React.createElement(View, {
      className: rootCls,
      style: customStyle
    }, options.map((option, idx) => {
      const {
        value,
        disabled,
        label,
        desc
      } = option;
      const optionCls = classNames('wg-checkbox__option', {
        'wg-checkbox__option--disabled': disabled,
        'wg-checkbox__option--selected': selectedList.includes(value)
      });
      return /*#__PURE__*/React.createElement(View, {
        className: optionCls,
        key: value,
        onClick: this.handleClick.bind(this, idx)
      }, /*#__PURE__*/React.createElement(View, {
        className: "wg-checkbox__option-wrap"
      }, /*#__PURE__*/React.createElement(View, {
        className: "wg-checkbox__option-cnt"
      }, /*#__PURE__*/React.createElement(View, {
        className: sizeClass
      }, /*#__PURE__*/React.createElement(Text, {
        className: "wg-icon wg-icon-choice"
      })), /*#__PURE__*/React.createElement(View, {
        className: "wg-checkbox__title"
      }, label)), desc && /*#__PURE__*/React.createElement(View, {
        className: "wg-checkbox__desc"
      }, desc)));
    }));
  }

}
WgCheckbox.defaultProps = {
  customStyle: '',
  className: '',
  options: [],
  selectedList: [],
  size: '',

  //复选框尺寸大小
  onChange() {}

};
WgCheckbox.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  options: PropTypes.array,
  selectedList: PropTypes.array,
  size: PropTypes.oneOf(['small', 'mini', '']),
  onChange: PropTypes.func
};
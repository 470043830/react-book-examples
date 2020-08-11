/* eslint-disable react/sort-comp */

/* eslint-disable react/no-unused-state */

/* eslint-disable react/jsx-indent-props */

/* eslint-disable taro/this-props-function */
import Taro from '@tarojs/taro';
import React from 'react';
import { View, Textarea, ScrollView } from '@tarojs/components';
import classNames from 'classnames';
export default class WgTextareaCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isIos: false,
      isFocused: false,
      tempInputValue: ''
    };
  }

  UNSAFE_componentWillMount() {
    this.equipmentType();
  }

  equipmentType() {
    let phone = Taro.getSystemInfoSync(); //调用方法获取机型

    if (phone.platform == 'ios') {
      this.setState({
        isIos: true
      });
    } else if (phone.platform == 'android') {
      this.setState({
        isIos: false
      });
    }
  }

  onInputBlur(e) {
    // console.log('onBlur111:', e);
    this.setState({
      isFocused: false
    });
  }

  onViewClick(e) {
    // console.log('onViewClick:', e);
    this.setState({
      isFocused: true
    });
  }

  onTextareaInput(value) {
    // console.log('onViewConTextareaInputlick:', value);
    this.props.onInput(value);
    this.setState({
      tempInputValue: value
    });
  }

  render() {
    const {
      lable,
      placeholder,
      disabled,
      maxlength,
      onInput,
      textareaVal
    } = this.props;
    const {
      isFocused,
      tempInputValue
    } = this.state;
    let style = !lable ? {
      width: Taro.pxTransform(686)
    } : {};
    let length = String(textareaVal || '').length;
    return /*#__PURE__*/React.createElement(View, {
      className: "wg-pl-32 wg-pr-32 wg-relative "
    }, /*#__PURE__*/React.createElement(View, {
      className: classNames(lable ? 'wg-textarea-after' : '', 'wg-textarea-component', 'wg-align-items-start', 'wg-pt-32')
    }, lable && /*#__PURE__*/React.createElement(View, {
      View: true,
      className: classNames('wg-textarea-label', 'wg-ft-34', disabled && 'wg-text-color')
    }, lable), isFocused && /*#__PURE__*/React.createElement(Textarea, {
      style: style,
      className: classNames('wg-textarea', 'wg-ft-34', disabled && 'wg-text-color', this.state.isIos && 'wg-is-ios'),
      placeholderClass: "wg-placeholder-class",
      onInput: res => {
        this.onTextareaInput(res.detail.value);
      },
      value: textareaVal,
      placeholder: placeholder,
      maxlength: maxlength,
      disabled: disabled,
      focus: isFocused,
      onBlur: e => this.onInputBlur(e)
    }), !isFocused && /*#__PURE__*/React.createElement(ScrollView, {
      scrollY: true,
      onClick: e => this.onViewClick(e),
      className: classNames('wg-textarea', 'wg-ft-34', 'wg-textarea-break', disabled && 'wg-text-color')
    }, !tempInputValue && textareaVal && /*#__PURE__*/React.createElement(View, null, textareaVal), !tempInputValue && !textareaVal && placeholder && /*#__PURE__*/React.createElement(View, {
      className: "wg-placeholder-class"
    }, placeholder), tempInputValue && /*#__PURE__*/React.createElement(View, null, tempInputValue))), lable && /*#__PURE__*/React.createElement(View, {
      className: "wg-textarea-calculation wg-pt-16 wg-pb-16"
    }, `${length || 0}/${maxlength}`));
  }

}
WgTextareaCell.defaultProps = {
  lable: null,
  placeholder: '请输入',
  textareaVal: '',
  maxlength: 100,
  disabled: false,
  onInput: () => {}
};
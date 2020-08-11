/* eslint-disable react/no-unused-state */

/* eslint-disable no-empty */

/* eslint-disable react/sort-comp */

/* eslint-disable react/jsx-indent-props */
import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image, Input, Button } from '@tarojs/components';
import classNames from 'classnames';
import WgIcon from '../icon';
/**图片引入 */

import rightIcon from '../../ui-images/right-icon.png';
export default class WgInputCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.inputVal,
      time: 60,
      btnDisable: false,
      btnVal: '发送验证码'
    };
  }

  componentWillUnmount() {
    this.clearInputTimer();
  }

  queryVal(e) {
    let val = e.detail.value;
    let {
      inputType
    } = this.props;

    if (inputType === 'phone' || inputType === 'idcard') {
      val = val.replace(/\s*/g, '');
      var result = [];

      for (var i = 0; i < val.length; i++) {
        if (inputType === 'phone') {
          if (i == 3 || i == 7 || i == 11 || i == 15 || i == 19) {
            result.push(' ' + val.charAt(i));
          } else {
            result.push(val.charAt(i));
          }
        }

        if (inputType === 'idcard') {
          if (i == 4 || i == 8 || i == 12 || i == 16) {
            result.push(' ' + val.charAt(i));
          } else {
            result.push(val.charAt(i));
          }
        }
      }

      val = result.join('');
    }

    this.setState({
      value: val
    }, () => {
      this.clearInputTimer();
      this._onInputTimer = setTimeout(() => {
        this.props.onInput(val);
      }, 100);
    });
  }

  clearInputTimer() {
    if (this._onInputTimer) {
      clearTimeout(this._onInputTimer);
      this._onInputTimer = null;
    }
  }

  clearData() {
    this.clearInputTimer();
    this.setState({
      value: ''
    }, () => {
      this.props.onInput('');
    });
  }

  render() {
    let {
      lable,
      placeholder,
      explanation,
      inputType,
      style,
      onClick,
      isIocn,
      disabled,
      maxLength,
      imgUrl,
      isSendCode,
      isError,
      isClose
    } = this.props;
    let {
      btnVal,
      value,
      btnDisable,
      time
    } = this.state;
    let _type = inputType;

    if (inputType === 'phone') {
      maxLength = Number(maxLength) + 4;
      _type = 'text';
    } else if (inputType === 'idcard') {
      maxLength = 23;
    }

    let timeChange, rightDom;
    let ti = time; //关键在于用ti取代time进行计算和判断，因为time在render里不断刷新，但在方法中不会进行刷新

    const clock = () => {
      if (ti > 0) {
        //当ti>0时执行更新方法
        ti = ti - 1;
        this.setState({
          time: ti,
          btnVal: ti + 's'
        });
      } else {
        //当ti=0时执行终止循环方法
        clearInterval(timeChange);
        this.setState({
          btnDisable: false,
          time: 60,
          btnVal: '发送验证码'
        });
      }
    };

    const sendCode = () => {
      onClick();
      this.setState({
        btnDisable: true,
        btnVal: '60s'
      }); //每隔一秒执行一次clock方法

      timeChange = setInterval(clock, 1000);
    };

    let codeStyle = btnDisable ? {
      backgroundColor: '#F2F6F8',
      color: '#ABB6BF'
    } : {};
    let widthStyle = {
      width: '100%',
      flex: 1
    };
    let inputStyle = {
      color: isError ? 'red' : '',
      width: '100%',
      flex: 1
    };

    if (!isError) {
      if (isIocn) {
        rightDom = /*#__PURE__*/React.createElement(Image, {
          className: "wg-from-icon",
          src: rightIcon,
          onClick: !disabled && onClick
        });
      }

      if (imgUrl) {
        rightDom = /*#__PURE__*/React.createElement(Image, {
          className: "wg-form-img",
          src: imgUrl,
          onClick: !disabled && onClick
        });
      }

      if (isSendCode) {
        rightDom = /*#__PURE__*/React.createElement(Button, {
          className: "wg-sed-code wg-ft-30",
          style: codeStyle,
          onClick: sendCode,
          disabled: disabled || btnDisable
        }, btnVal);
      }

      if (isClose && value) {
        rightDom = /*#__PURE__*/React.createElement(WgIcon, {
          value: "delete_2",
          size: "16",
          color: "rgba(9, 17, 28, 0.3)",
          onClick: !disabled && this.clearData.bind(this)
        });
      }
    } else {
      rightDom = /*#__PURE__*/React.createElement(WgIcon, {
        value: "notice",
        color: "red"
      });
    }

    return /*#__PURE__*/React.createElement(View, {
      className: "wg-form wg-space-between wg-pl-32 wg-pr-32 wg-relative"
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-space-between wg-form-left",
      style: widthStyle
    }, lable && /*#__PURE__*/React.createElement(View, {
      className: classNames('wg-form-label', 'wg-ft-34', disabled && 'wg-text-color')
    }, lable), /*#__PURE__*/React.createElement(Input, {
      className: classNames('wg-pr-20', 'wg-form-input', 'wg-ft-34', 'wg-justify-start', disabled && 'wg-text-color'),
      placeholderClass: "wg-placeholder-class",
      type: _type,
      maxLength: maxLength,
      value: value,
      placeholder: placeholder,
      disabled: disabled,
      onInput: this.queryVal.bind(this),
      style: inputStyle
    })), !isError && explanation && /*#__PURE__*/React.createElement(View, {
      className: classNames('wg-form-explanation', 'wg-ft-30', disabled && 'wg-text-color'),
      onClick: isIocn && !disabled && onClick,
      style: style
    }, explanation), rightDom);
  }

}
WgInputCell.defaultProps = {
  /**标签名 */
  lable: '',

  /**input的提示信息*/
  placeholder: '请输入',

  /**input的type */
  inputType: 'text',

  /**input框最大的输入长度 */
  maxLength: 100,

  /**input显示的文本 */
  inputVal: null,

  /**是否禁用input */
  disabled: false,

  /**获取输入的文本 */
  onInput: () => {},

  /**文本说明 */
  explanation: null,

  /**文本说明的style */
  style: {
    color: '#98999A'
  },

  /**校验格式不对的时候 */
  isError: false,

  /**小箭头 */
  isIocn: false,

  /**传进来的图片 */
  imgUrl: null,

  /**是否显示发送验证码按钮 */
  isSendCode: false,

  /**清空的icon */
  isClose: false,

  /**点击右侧icon或者文本 或者 btn*/
  onClick: () => {}
};
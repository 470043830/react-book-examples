import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image, Text, Button } from '@tarojs/components';
import WgBadge from '../badge';
import rightIcon from '../../ui-images/right-icon.png';
export default class WgMultiCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      userImgUrl,
      userName,
      promptState,
      promptNumber,
      promptStateValue,
      onRowActive,
      productObj,
      onContact,
      onGetUserInfo,
      onGetPhoneNumber,
      onLaunchapp,
      hoverClass,
      openType,
      vipUrl,
      type,
      operatingTime,
      operatingName,
      onBtnActive,
      btnValue,
      promptStateValueStyle
    } = this.props;
    let dom = (productObj.firstParamsKey || productObj.lastParamsKey) && /*#__PURE__*/React.createElement(View, {
      className: "wg-align-items"
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-mr-32 wg-line-height-40 wg-align-items"
    }, /*#__PURE__*/React.createElement(Text, {
      className: "wg-name-color wg-ft-28 wg-mr-8"
    }, productObj.firstParamsKey), /*#__PURE__*/React.createElement(Text, {
      className: "wg-number-color wg-ft-28 wg-ft-w600"
    }, productObj.firstParamsValue)), /*#__PURE__*/React.createElement(View, {
      className: "wg-line-height-40 wg-align-items"
    }, /*#__PURE__*/React.createElement(Text, {
      className: "wg-name-color wg-ft-28 wg-mr-8"
    }, productObj.lastParamsKey), /*#__PURE__*/React.createElement(Text, {
      className: "wg-goods-color wg-ft-28 wg-ft-w600"
    }, productObj.lastParamsValue)));
    return /*#__PURE__*/React.createElement(Button, {
      className: "wg-user-list wg-space-between",
      hoverClass: hoverClass,
      openType: openType,
      onClick: onRowActive,
      onContact: onContact.bind(this),
      onGetUserInfo: onGetUserInfo.bind(this),
      onGetPhoneNumber: onGetPhoneNumber.bind(this),
      onLaunchapp: onLaunchapp.bind(this)
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-justify-start"
    }, userImgUrl && /*#__PURE__*/React.createElement(Image, {
      src: userImgUrl,
      lazyload: true,
      mode: "aspectFill",
      className: "wg-user-img wg-mr-24"
    }), /*#__PURE__*/React.createElement(View, {
      className: !productObj.firstParamsKey && !productObj.lastParamsKey && 'wg-justify-start'
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-justify-start wg-relative wg-big-box"
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-user-name wg-overflow wg-ft-34"
    }, userName), vipUrl && /*#__PURE__*/React.createElement(Image, {
      src: vipUrl,
      lazyload: true,
      className: "wg-vip wg-absolute"
    })), /*#__PURE__*/React.createElement(View, {
      style: "width:100%;height:2px;"
    }), dom)), type === 'default' && /*#__PURE__*/React.createElement(View, {
      className: "wg-align-items line-height-normal"
    }, promptState && (promptNumber ? /*#__PURE__*/React.createElement(View, {
      className: "wg-mr-4 wg-relative"
    }, /*#__PURE__*/React.createElement(WgBadge, {
      value: promptNumber,
      maxValue: 99,
      corner: true,
      customStyle: "position:relative;transform:translate(0, 0)"
    })) : /*#__PURE__*/React.createElement(View, {
      className: "wg-mr-4"
    }, /*#__PURE__*/React.createElement(WgBadge, {
      dot: true
    }))), promptStateValue && /*#__PURE__*/React.createElement(View, {
      className: "wg-prompt-value wg-mr-4 wg-ft-28",
      style: promptStateValueStyle
    }, promptStateValue), /*#__PURE__*/React.createElement(Image, {
      className: "wg-right-icon wg-ml-18",
      src: rightIcon
    })), type === 'operatingInfo' && /*#__PURE__*/React.createElement(View, {
      className: "wg-direction-column-center wg-cell-mr-16"
    }, /*#__PURE__*/React.createElement(View, {
      className: "wg-explanation wg-ft-28"
    }, operatingName), /*#__PURE__*/React.createElement(View, {
      className: "wg-timer wg-ft-24"
    }, operatingTime)), type === 'btn' && /*#__PURE__*/React.createElement(Button, {
      className: "wg-btn wg-cell-mr-16 wg-ft-30",
      "hover-class": "none",
      onClick: onBtnActive
    }, btnValue));
  }

}
WgMultiCell.defaultProps = {
  /**img的url */
  userImgUrl: null,

  /**用户name */
  userName: null,

  /**是否显示小红点 */
  promptState: null,

  /** 小红点里面的未完成数目 */
  promptNumber: null,

  /** 状态 */
  promptStateValue: null,

  /**点击某一行 */
  onRowActive: () => {},
  productObj: {
    firstParamsKey: null,
    firstParamsValue: null,
    lastParamsKey: null,
    lastParamsValue: null
  },

  /**打开客服 */
  onContact: () => {},

  /**获取用户信息 */
  onGetUserInfo: () => {},

  /**获取手机号码 */
  onGetPhoneNumber: () => {},

  /**打开app */
  onLaunchapp: () => {},

  /**hoverClass */
  hoverClass: 'wg-btn-default',

  /**按钮开能力 */
  openType: null,

  /**vip的icon图标 */
  vipUrl: null,
  type: 'default',
  operatingName: null,
  operatingTime: null,
  btnValue: null,
  onBtnActive: () => {},
  promptStateValueStyle: {}
}; // WgMultiCell.propTypes = {
//     userImgUrl: PropTypes.string,
//     userName: PropTypes.string,
//     promptNumber: PropTypes.number,
//     promptStateValue: PropTypes.string,
//     onRowActive: PropTypes.func,
//     onOverhead: PropTypes.func,
//     onDelete: PropTypes.func,
// };
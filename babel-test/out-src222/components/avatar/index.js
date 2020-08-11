import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Image, OpenData, Text, View } from '@tarojs/components';
import WgComponent from '../../common/component';
const SIZE_CLASS = {
  large: 'large',
  normal: 'normal',
  small: 'small'
};
export default class WgAvatar extends WgComponent {
  constructor(props) {
    super(props);
    this.state = {
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP
    };
  }

  render() {
    const {
      size,
      circle,
      image,
      text,
      openData,
      customStyle
    } = this.props;
    const rootClassName = ['wg-avatar'];
    const iconSize = SIZE_CLASS[size || 'normal'];
    const classObject = {
      [`wg-avatar--${iconSize}`]: iconSize,
      'wg-avatar--circle': circle
    };
    const imgClass = {
      'wg-avatar__img': true,
      'wg-avatar__img-circle': circle
    };
    let letter = '';
    if (text) letter = text[0];
    let elem;

    if (openData && openData.type === 'userAvatarUrl' && this.state.isWEAPP) {
      elem = /*#__PURE__*/React.createElement(OpenData, {
        type: openData.type
      });
    } else if (image) {
      elem = /*#__PURE__*/React.createElement(Image, {
        lazyLoad: true,
        className: classNames(imgClass),
        src: image,
        mode: "aspectFill"
      });
    } else {
      elem = /*#__PURE__*/React.createElement(Text, {
        className: "wg-avatar__text"
      }, letter);
    }

    return /*#__PURE__*/React.createElement(View, {
      className: classNames(rootClassName, classObject, this.props.className),
      style: customStyle
    }, elem);
  }

}
WgAvatar.defaultProps = {
  size: 'normal',
  circle: false,
  text: '',
  image: '',
  openData: undefined,
  customStyle: {},
  className: ''
};
WgAvatar.propTypes = {
  size: PropTypes.oneOf(['large', 'normal', 'small']),
  circle: PropTypes.bool,
  text: PropTypes.string,
  image: PropTypes.string,
  openData: PropTypes.object,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};
import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Button } from '@tarojs/components';
import WgComponent from '../../common/component';
export default class WgTestCtrl extends WgComponent {
  constructor(props) {
    super(props);
    this.state = {
      s1: 'sss1',
      s2: 'sss2'
    };
    setTimeout(() => {
      this.setState({
        s1: 'ssssssss1',
        s2: 'ssssssss2'
      });
    }, 1000);
  }

  customUpdate(nextProps, nextState) {
    if (!this.props.isOpened && !nextProps.isOpened) {
      return false;
    }

    return this.shallowEqualUpdate(nextProps, nextState);
  }

  render() {
    const {
      p1,
      p2
    } = this.props;
    const {
      s1,
      s2
    } = this.state;
    console.log('WgTestCtrl render...............');
    return /*#__PURE__*/React.createElement(View, null, p1, ",", p2, ",", s1, ",", s2);
  }

}
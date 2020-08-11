import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'; // import './index.scss';

export default class WgCells extends React.PureComponent {
  render() {
    const {
      cellsStyle
    } = this.props;
    return /*#__PURE__*/React.createElement(View, {
      className: "cells",
      style: cellsStyle
    }, this.props.children);
  }

}
WgCells.options = {
  addGlobalClass: true
};
WgCells.defaultProps = {
  cellsStyle: {}
};
import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components'; // import './index.scss';

class WgCell extends React.PureComponent {
  render() {
    const {
      cellStyle,
      noStyle,
      noLine
    } = this.props;
    return /*#__PURE__*/React.createElement(View, {
      className: noStyle ? '' : 'cell' + (noLine ? 'cell-no-line' : ''),
      style: cellStyle
    }, this.props.children);
  }

}

WgCell.options = {
  addGlobalClass: true
};
WgCell.defaultProps = {
  noStyle: false,
  noLine: false,
  cellStyle: {}
};
export default WgCell;
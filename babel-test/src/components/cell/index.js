import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

// import './index.scss';

class WgCell extends React.PureComponent {

    render() {
        const { cellStyle, noStyle, noLine } = this.props;
        return <View
            className={
                noStyle ? '' : 'cell' + (noLine ? 'cell-no-line' : '')}
            style={cellStyle}
        >
            {this.props.children}
        </View>;
    }
}

WgCell.options = {
    addGlobalClass: true,
};

WgCell.defaultProps = {
    noStyle: false,
    noLine: false,
    cellStyle: {},
}

export default WgCell;

import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import WgComponent from '../../../common/component';

export default class WgActionSheetFooter extends WgComponent {
    constructor() {
        super(...arguments);
        this.handleClick = (...args) => {
            if (typeof this.props.onClick === 'function') {
                this.props.onClick(...args);
            }
        };
    }



    render() {
        const rootClass = classNames('wg-action-sheet__footer', this.props.className);
        return <View onClick={this.handleClick} className={rootClass}>
            {this.props.children}
        </View>;
    }
}
WgActionSheetFooter.defaultProps = {
    onClick: () => { },
};
WgActionSheetFooter.propTypes = {
    onClick: PropTypes.func,
};

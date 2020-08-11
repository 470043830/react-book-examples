import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Block } from '@tarojs/components';
import WgComponent from '../../common/component';

export default class WgBadge extends WgComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    formatValue(value, maxValue) {
        if (value === '' || value === null || value === undefined) return '';
        const numValue = +value;
        if (Number.isNaN(numValue)) {
            return value;
        }
        // return numValue > maxValue ? `${maxValue}+` : numValue;
        return numValue > maxValue ? '···' : numValue;
    }
    render() {
        const { dot, value, maxValue, corner, customStyle } = this.props;
        const val = this.formatValue(value, maxValue);
        const dotClass = {
            ['wg-badge__dot']: true,
            ['wg-badge-corner']: corner,
        };
        const numClass = {
            ['wg-badge__num']: true,
            ['wg-badge-corner']: corner,
            ['wg-badge__num-more']: val == '···' || val >= 10,
        };

        return (
            <Block>
                {dot ? <View className={classNames(dotClass, this.props.className)} style={customStyle}></View> : val !== '' && <View className={classNames(numClass, this.props.className)} style={customStyle}>{val}</View>}
            </Block>);
        // return (
        //     <View className={classNames(rootClassName, this.props.className)} style={outStyle}>
        //         {this.props.children}
        //         {dot ? <View className='wg-badge__dot'></View> : val !== '' && <View className={classNames(classObject)} style={customStyle}>{val}</View>}
        //     </View>);
    }
}
WgBadge.defaultProps = {
    dot: false,
    corner: false,
    value: '',
    maxValue: 99,
    customStyle: {},
    className: '',
};
WgBadge.propTypes = {
    dot: PropTypes.bool,
    corner: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxValue: PropTypes.number,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

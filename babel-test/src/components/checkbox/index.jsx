import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Text, View, Image } from '@tarojs/components';
import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import WgComponent from '../../common/component';

export default class WgCheckbox extends WgComponent {

    handleClick(idx) {
        const { selectedList, options } = this.props;
        const option = options[idx];
        const { disabled, value } = option;
        if (disabled) return;

        const selectedSet = new Set(selectedList);
        if (!selectedSet.has(value)) {
            selectedSet.add(value);
        } else {
            selectedSet.delete(value);
        }
        this.props.onChange([...selectedSet]);
    }

    render() {
        const { customStyle, className, options, selectedList, size } = this.props;

        const rootCls = classNames('wg-checkbox', className);
        const sizeClass = classNames('wg-checkbox__icon-cnt',
            { 'wg-checkbox__icon-cnt-small': size === 'small' },
            { 'wg-checkbox__icon-cnt-mini': size === 'mini' },
        );

        return (
            <View className={rootCls} style={customStyle}>
                {options.map((option, idx) => {
                    const { value, disabled, label, desc } = option;
                    const optionCls = classNames('wg-checkbox__option', {
                        'wg-checkbox__option--disabled': disabled,
                        'wg-checkbox__option--selected': selectedList.includes(value),
                    });
                    return (
                        <View
                            className={optionCls}
                            key={value}
                            onClick={this.handleClick.bind(this, idx)}
                        >
                            {/* 基础用法 start  滔哥 */}
                            <View className='wg-checkbox__option-wrap'>
                                <View className='wg-checkbox__option-cnt'>
                                    <View className={sizeClass}>
                                        <Text className='wg-icon wg-icon-choice'></Text>
                                    </View>
                                    <View className='wg-checkbox__title'>{label}</View>
                                </View>
                                {desc && <View className='wg-checkbox__desc'>{desc}</View>}
                            </View>
                            {/* 基础用法 end  滔哥 */}
                        </View>
                    );


                })}
            </View>
        );
    }
}

WgCheckbox.defaultProps = {
    customStyle: '',
    className: '',
    options: [],
    selectedList: [],
    size: '', //复选框尺寸大小
    onChange() { },
};

WgCheckbox.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    options: PropTypes.array,
    selectedList: PropTypes.array,
    size: PropTypes.oneOf(['small', 'mini', '']),
    onChange: PropTypes.func,
};

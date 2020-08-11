import Taro from '@tarojs/taro';
import React from 'react';

import classNames from 'classnames';
import _toString from 'lodash/toString';
import PropTypes from 'prop-types';
import { Input, Text, View } from '@tarojs/components';

import WgComponent from '../../common/component';

// TODO: Check all types
// 实现两数相加并保留小数点后最短尾数
function addNum(num1, num2) {
    let sq1, sq2;
    try {
        sq1 = _toString(num1).split('.')[1].length;
    } catch (e) {
        sq1 = 0;
    }
    try {
        sq2 = _toString(num2).split('.')[1].length;
    } catch (e) {
        sq2 = 0;
    }
    const m = Math.pow(10, Math.max(sq1, sq2));
    return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
}
// 格式化数字，处理01变成1,并且不处理1. 这种情况
function parseValue(num) {
    if (num === '') return '0';
    const numStr = _toString(num);
    if (numStr.indexOf('0') === 0 && numStr.indexOf('.') === -1) {
        // 处理01变成1,并且不处理1.
        return _toString(parseFloat(num));
    }
    return _toString(num);
}

export default class WgInputNumber extends WgComponent {
    constructor() {
        super(...arguments);

        this.handleValue = (value) => {
            // TODO: Fix dirty hack
            const { max, min } = this.props;
            let resultValue = value === '' ? min : value;
            // 此处不能使用 Math.max，会是字符串变数字，并丢失 .
            if (resultValue > max) {
                resultValue = max;
                this.handleError({
                    type: 'OVER',
                    errorValue: resultValue,
                });
            }
            if (resultValue < min) {
                resultValue = min;
                this.handleError({
                    type: 'LOW',
                    errorValue: resultValue,
                });
            }
            if (resultValue && !Number(resultValue)) {
                resultValue = parseFloat(String(resultValue)) || min;
                this.handleError({
                    type: 'OVER',
                    errorValue: resultValue,
                });
            }
            resultValue = parseValue(String(resultValue));
            return resultValue;
        };
        this.handleInput = (e) => {
            const { value } = e.target;
            const { disabled } = this.props;
            if (disabled) return;
            const newValue = this.handleValue(value);
            this.props.onChange(Number(newValue), e);
            return newValue;
        };
        this.handleBlur = (event) => this.props.onBlur && this.props.onBlur(event);
        this.handleError = (errorValue) => {
            if (!this.props.onErrorInput) {
                return;
            }
            this.props.onErrorInput(errorValue);
        };
    }
    handleClick(clickType, e) {
        // TODO: Fix dirty hack
        const { disabled, value, min, max, step } = this.props;
        const lowThanMin = clickType === 'minus' && value <= min;
        const overThanMax = clickType === 'plus' && value >= max;
        if (lowThanMin || overThanMax || disabled) {
            const deltaValue = clickType === 'minus' ? -step : step;
            const errorValue = addNum(Number(value), deltaValue);
            if (disabled) {
                this.handleError({
                    type: 'DISABLED',
                    errorValue,
                });
            } else {
                this.handleError({
                    type: lowThanMin ? 'LOW' : 'OVER',
                    errorValue,
                });
            }
            return;
        }
        const deltaValue = clickType === 'minus' ? -step : step;
        let newValue = addNum(Number(value), deltaValue);
        newValue = Number(this.handleValue(newValue));
        this.props.onChange(newValue, e);
    }
    render() {
        const { customStyle, className, width, disabled, value, type, min, max, size, disabledInput, bold } = this.props;
        const inputStyle = {
            width: width ? `${Taro.pxTransform(width)}` : '',
        };
        const inputValue = Number(this.handleValue(value));
        const rootCls = classNames('wg-input-number', {
            'wg-input-number--lg': size === 'large',
        }, {
            'wg-input-number--disabled--input':disabled, //禁用状态
        }, {
            'wg-input-number--bold':bold, //强调数量
        }, className);
        const minusBtnCls = classNames('wg-input-number__btn', {
            'wg-input-number--disabled--btn': inputValue <= min || disabled,
        });
        const plusBtnCls = classNames('wg-input-number__btn', {
            'wg-input-number--disabled--btn': inputValue >= max || disabled,
        });
        return <View className={rootCls} style={customStyle}>
            <View className={minusBtnCls} onClick={this.handleClick.bind(this, 'minus')}>
                <Text className='wg-icon wg-icon-subtract wg-input-number__btn-subtract'></Text>
            </View>
            <Input className='wg-input-number__input' style={inputStyle} type={type} value={String(inputValue)} disabled={disabledInput || disabled} onInput={this.handleInput} onBlur={this.handleBlur} />
            <View className={plusBtnCls} onClick={this.handleClick.bind(this, 'plus')}>
                <Text className='wg-icon wg-icon-add wg-input-number__btn-add'></Text>
            </View>
        </View>;
    }

}
WgInputNumber.defaultProps = {
    customStyle: '',
    className: '',
    disabled: false,
    disabledInput: false,
    value: 1,
    type: 'number',
    width: 0,
    min: 0,
    max: 1000000,
    step: 1,
    size: 'normal',
    bold:false, //是否加粗
    onChange: () => { },
    onBlur: () => { },
};
WgInputNumber.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(['number', 'digit']),
    disabled: PropTypes.bool,
    width: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    size: PropTypes.oneOf(['normal', 'large']),
    disabledInput: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onErrorInput: PropTypes.func,
};
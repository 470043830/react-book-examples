import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View, Button } from '@tarojs/components';
import WgComponent from '../../common/component';


export default class WgTagBtn extends WgComponent {
    constructor(props) {
        super(props);
        this.state = {
            isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
        };
    }

    onClick(event) {
        if (!this.props.disabled) {
            this.props.onClick(event);
        }
    }
    render() {
        const { customStyle, disabled } = this.props;
        const { isWEAPP } = this.state;
        const rootClassName = ['wg-tag-btn'];
        const classObject = {
            'wg-tag-btn--disabled': disabled,
        };
        const button = <Button className='wg-button__btn'></Button>;
        return <View className={classNames(rootClassName, classObject)} style={customStyle} onClick={this.onClick.bind(this)}>
            {this.props.children}
            {isWEAPP && !disabled && button}
        </View>;
    }
}
WgTagBtn.defaultProps = {
    disabled: false,
    customStyle: {},
    onClick: () => { },
};
WgTagBtn.propTypes = {
    disabled: PropTypes.bool,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onClick: PropTypes.func,
};

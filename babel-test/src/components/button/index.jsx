import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button, View } from '@tarojs/components';
import WgLoading from '../loading/index';
import WgComponent from '../../common/component';

const SIZE_CLASS = {
    normal: 'normal',
    small: 'small',
};
const TYPE_CLASS = {
    primary: 'primary',
    secondary: 'secondary',
};
export default class WgButton extends WgComponent {
    constructor(props) {
        super(props);
        this.state = {
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
            isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
        };
    }
    onClick(event) {
        if (!this.props.disabled) {
            this.props.onClick(event);
        }
    }
    onLongPress(event) {
        if (!this.props.disabled) {
            this.props.onLongPress(event);
        }
    }
    onGetUserInfo(event) {
        this.props.onGetUserInfo(event);
    }
    onContact(event) {
        this.props.onContact(event);
    }
    onGetPhoneNumber(event) {
        this.props.onGetPhoneNumber(event);
    }
    onError(event) {
        this.props.onError(event);
    }
    onOpenSetting(event) {
        this.props.onOpenSetting(event);
    }
    onSumit(event) {
        if (this.state.isWEAPP || this.state.isWEB) {
            this.$scope.triggerEvent('submit', event.detail, {
                bubbles: true,
                composed: true,
            });
        }
    }
    onReset(event) {
        if (this.state.isWEAPP || this.state.isWEB) {
            this.$scope.triggerEvent('reset', event.detail, {
                bubbles: true,
                composed: true,
            });
        }
    }
    render() {
        const { size = 'normal', type = '', circle, full, loading, disabled, customStyle, formType, openType, lang, sessionFrom, sendMessageTitle, sendMessagePath, sendMessageImg, showMessageCard, appParameter } = this.props;
        const { isWEAPP, isWEB } = this.state;
        const rootClassName = ['wg-button'];
        const classObject = {
            [`wg-button--${SIZE_CLASS[size]}`]: SIZE_CLASS[size],
            'wg-button--disabled': disabled,
            [`wg-button--${type}`]: TYPE_CLASS[type],
            'wg-button--circle': circle,
            'wg-button--full': full,
        };
        const loadingColor = type === 'primary' ? '#fff' : '#49C167';
        const loadingSize = '25'; //size === 'small' ? '15' : 0;
        let loadingComponent = null;
        if (loading) {
            loadingComponent = <View className='wg-button__icon'>
                <WgLoading color={loadingColor} size={loadingSize} />
            </View>;
            rootClassName.push('wg-button--icon');
        }
        const webButton = <Button className='wg-button__btn' lang={lang} formType={formType === 'submit' || formType === 'reset' ? formType : undefined}></Button>;
        const button = <Button className='wg-button__btn' formType={formType} openType={openType} lang={lang} sessionFrom={sessionFrom} sendMessageTitle={sendMessageTitle} sendMessagePath={sendMessagePath} sendMessageImg={sendMessageImg} showMessageCard={showMessageCard} appParameter={appParameter} onGetUserInfo={this.onGetUserInfo.bind(this)} onGetPhoneNumber={this.onGetPhoneNumber.bind(this)} onOpenSetting={this.onOpenSetting.bind(this)} onError={this.onError.bind(this)} onContact={this.onContact.bind(this)}></Button>;
        return <View className={classNames(rootClassName, classObject, this.props.className)} style={customStyle} onClick={this.onClick.bind(this)} onLongPress={this.onLongPress.bind(this)}>
            {isWEB && !disabled && webButton}
            {/* 暂时屏蔽微信小程序上的Form Wrapper {isWEAPP && !disabled && <Form onSubmit={this.onSumit.bind(this)} onReset={this.onReset.bind(this)}>
                {button}
            </Form>} */}
            {isWEAPP && !disabled && button}
            {loadingComponent}
            <View className='wg-button__text'>{this.props.children}</View>
        </View>;
    }
}
WgButton.defaultProps = {
    size: 'normal',
    type: undefined,
    circle: false,
    full: false,
    loading: false,
    disabled: false,
    customStyle: {},
    onClick: () => { },
    onLongPress: () => { },
    // Button props
    formType: undefined,
    openType: undefined,
    lang: 'en',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    appParameter: '',
    onGetUserInfo: () => { },
    onContact: () => { },
    onGetPhoneNumber: () => { },
    onError: () => { },
    onOpenSetting: () => { },
};
WgButton.propTypes = {
    size: PropTypes.oneOf(['normal', 'small']),
    type: PropTypes.oneOf(['primary', 'secondary', '']),
    circle: PropTypes.bool,
    full: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onLongPress: PropTypes.func,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    formType: PropTypes.oneOf(['submit', 'reset', '']),
    openType: PropTypes.oneOf(['contact', 'share', 'getUserInfo', 'getPhoneNumber', 'launchApp', 'openSetting', 'feedback', 'getRealnameAuthInfo', 'getAuthorize', 'contactShare', '']),
    lang: PropTypes.string,
    sessionFrom: PropTypes.string,
    sendMessageTitle: PropTypes.string,
    sendMessagePath: PropTypes.string,
    sendMessageImg: PropTypes.string,
    showMessageCard: PropTypes.bool,
    appParameter: PropTypes.string,
    onGetUserInfo: PropTypes.func,
    onContact: PropTypes.func,
    onGetPhoneNumber: PropTypes.func,
    onError: PropTypes.func,
    onOpenSetting: PropTypes.func,
};
